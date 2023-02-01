import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, reactive } from 'vue'
import { toast, showModel } from '~/compables/util'
import { logout, updatepassword } from '~/api/manager'

//修改密码
export function useRepassword() {
    const router = useRouter()
    const store = useStore()

    const formDrawerRef = ref(null)
    const repwdForm = reactive({
        oldpassword: '',
        password: '',
        repassword: ''
    })
    const rules = {
        oldpassword: [{
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }],
        repassword: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }],
    }
    const refForm = ref(null)
    const doSubmit = () => {
        refForm.value.validate(valid => {
            if (!valid) {
                return false
            }
            //表单验证通过
            //loading.value = true
            formDrawerRef.value.showLoading()
            updatepassword(repwdForm).then(res => {
                toast("修改密码成功！")
                    //退出登录
                store.dispatch("clearUser")
                    //重新登录
                router.push("/login")
            }).finally(() => {
                //loading.value = false
                formDrawerRef.value.hideLoading()
            })

        })
    }
    const openRepwdForm = () => formDrawerRef.value.open()

    return {
        openRepwdForm,
        doSubmit,
        refForm,
        rules,
        repwdForm,
        formDrawerRef
    }
}

//退出登录
export function useLogout() {
    const router = useRouter()
    const store = useStore()

    function handleLogout() {
        showModel("是否确定退出登录").then(res => {
                logout().finally(() => {
                    store.dispatch("clearUser")
                        //提示退出成功
                    toast("退出登录成功！")
                        //跳转到登录页
                    router.push("/login")

                })
            })
            .catch(err => {
                console.log("取消退出登录")
            })
    }
    return {
        handleLogout
    }
}