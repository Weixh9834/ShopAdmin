<template>
    <div class="f-menu" :style="{width:$store.state.asideWidth}">
        <el-menu :default-active="defaultActive" unique-opened :collapse="isCollapse" :collapse-transition="false" default-active="2" class="border-0" @select="handleSelect">
           <template v-for="(item,index) in asideMenus" :key="index">
               <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
                    <el-icon>
                        <component :is="item2.icon"></component>
                    </el-icon>
                    <span>{{item2.name}}</span>
                </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{item.name}}</span>
                </el-menu-item>
           </template>
        </el-menu>
    </div>
</template>
<script setup>
import {useRouter,useRoute} from 'vue-router'
import { ref,computed } from 'vue'
import {useStore} from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()
const defaultActive = ref(route.path)
//是否折叠
const isCollapse = computed(()=>!(store.state.asideWidth ==='250px'))

const asideMenus = computed(()=>store.state.menus)
const handleSelect = (e)=>{
    router.push(e)
}
</script>
<style>
  .f-menu {
      width:250px;
      top:64px;
      bottom: 0;
      left: 0;
      overflow: auto;
      @apply shadow-md fixed bg-light-50;
  }
</style>