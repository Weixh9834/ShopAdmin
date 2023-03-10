import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'

//
export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}
//
export function showModel(content = "提示的内容", type = "warning", title = "") {
    return ElMessageBox.confirm(
        content,
        title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        }
    )
}
//显示全屏loading
export function showFullLoading() {
    return nprogress.start()
}
//隐藏全屏loading
export function hideFillLoading() {
    return nprogress.done()
}