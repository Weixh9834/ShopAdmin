<template>
  <div class="f-header">
        <span class="logo">
            <el-icon class="mr-1"><eleme-filled /></el-icon>
            VUE3
        </span>
        <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
           <fold v-if="$store.state.asideWidth === '250px'" />
           <Expand v-else/>
        </el-icon>        
        <el-tooltip
            effect="dark"
            content="刷新"
            placement="bottom"
      >
        <el-icon class="icon-btn" @click="handleRefresh"><refresh /></el-icon>
      </el-tooltip>
        <div class="ml-auto flex items-center">
            
            <el-tooltip
            effect="dark"
            content="全屏"
            placement="bottom"
      >
        <el-icon class="icon-btn" @click="toggle">
           <full-screen v-if="!isFullscreen" />
           <Aim v-else/>
           </el-icon>
      </el-tooltip>
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <show-drawer ref="formDrawerRef" @submit="doSubmit" title="修改密码" destroyOnClose size="37%" confirmText="确认修改">
         <el-form :rules="rules" :model="repwdForm" ref="refForm" label-width="80px" size="small">
               <el-form-item prop="oldpassword" label="旧密码">
                   <el-input v-model="repwdForm.oldpassword" placeholder="请输入旧密码">
                      
                   </el-input>
               </el-form-item>
               <el-form-item prop="password" label="新密码">
                   <el-input type="text" v-model="repwdForm.password" placeholder="请输入新密码">
                     
                   </el-input>
               </el-form-item>
               <el-form-item prop="repassword" label="确认密码">
                   <el-input type="text" v-model="repwdForm.repassword" placeholder="请输入新密码">
                     
                   </el-input>
               </el-form-item>
               <!-- <el-form-item>
                    <el-button @click="doSubmit" type="primary" :loading="loading">确定</el-button>
               </el-form-item> -->
        </el-form>
    </show-drawer>
    
</template>
<script setup>

import { useFullscreen } from '@vueuse/core'
import showDrawer from '~/components/showDrawer.vue'
import {useRepassword,useLogout} from '~/compables/useManager'

const { isFullscreen, toggle } = useFullscreen()
const {
    openRepwdForm,
        doSubmit,
        refForm,
        rules,
        repwdForm,
        formDrawerRef
} =useRepassword()
const {handleLogout} = useLogout()

const handleCommand = (c)=>{
   switch (c){
       case "logout":
           handleLogout()
           break;
        case "rePassword":
            //showDrawer.value = true
            openRepwdForm()
            break;
   }
}
//刷新
const handleRefresh = ()=>location.reload()


</script>
<style>
.f-header{
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
    height:64px;
}
.logo{
    width:250px;
    @apply flex justify-center items-center text-xl font-thin;
}
.icon-btn{
    @apply flex justify-center items-center;
    width:42px;
    height: 64px;
    cursor: pointer;
}
.icon-btn:hover{
    @apply bg-indigo-600;
}
.f-header .dropdown{
  height:646px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>