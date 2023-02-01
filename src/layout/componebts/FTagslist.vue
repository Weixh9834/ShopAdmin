<template>
    <div class="f-tag-list" :style="{ left:$store.state.asideWidth }">

       <el-tabs v-model="activeTab" type="card" class="flex-1" @tab-remove="removeTab" style="min-width:100px;margin-top:10px;"  @tab-change="changeTab">
            <el-tab-pane :closable="item.path != '/'" v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"></el-tab-pane>
        </el-tabs>

        <span class="tag-btn">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>

    </div>
</template>
<script setup>
import { useCookies } from '@vueuse/integrations/useCookies'
import { ref } from 'vue'
import { useRoute,onBeforeRouteUpdate} from 'vue-router'

const route = useRoute()
const cookie = useCookies()
const activeTab = ref(route.path)
const tabList = ref([
    {
        title: '后台首页',
        path:"/"
    },
    {
        title:'商城管理',
        path:"/goods/list"
    }
    
])
function addTabs(tab){
   let tabIndex = tabList.value.findIndex((t)=>t.path ===tab.path )
   if(tabIndex === -1){
       tabList.value.push(tab)
   }
   cookie.set("TABLIST",tabList.value)
}
onBeforeRouteUpdate((to,from)=>{
    activeTab.value = to.path
    addTabs({
        title:to.meta.title,
        path:to.path
    })
})
// 初始化标签导航列表
function initTabList(){
  let tab = cookie.get("TABLIST")
  if(tab){
      tabList.value = tab
  }
}
initTabList()


const removeTab = (targetName) => {
    
}
</script>
<style scoped>
.f-tag-list{
    @apply fixed bg-gray-100 flex items-center px-2;
    top: 64px;
    right: 0;
    height: 44px;
    z-index: 100;
}
.tag-btn{
    @apply bg-white rounded ml-auto flex items-center justify-center px-2;
    height: 32px;
}
:deep(.el-tabs__header){
    @apply mb-0;
}
:deep(.el-tabs__nav){
    border: 0!important;
}
:deep(.el-tabs__item){
    border: 0!important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}
:deep(.el-tabs__nav-next),:deep(.el-tabs__nav-prev){
    line-height: 32px;
    height: 32px;
}
:deep(.is-disabled){
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>