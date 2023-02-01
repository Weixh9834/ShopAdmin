<template>
    <el-container>
        <el-header>
            <f-header></f-header>
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <f-menu></f-menu>
            </el-aside>
            <el-main>
                <f-tagslist></f-tagslist>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
import FHeader from './componebts/FHeader.vue';
import FMenu from './componebts/FMenu.vue';
import FTagslist from './componebts/FTagslist.vue';
</script>