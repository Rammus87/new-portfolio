<template>
    <el-aside width="$store.state.isCollapse?'64px':'200px'">
        <el-menu :collapse="$store.state.isCollapse"
        :router="true"
        :default-active="route.fullPath">
            <el-menu-item index="/index">
                <el-icon><HomeFilled /></el-icon>
                <span>首頁</span>
            </el-menu-item>
            <el-menu-item index="/center">
                <el-icon><Avatar /></el-icon>
                <span>個人中心</span>
            </el-menu-item>
            <el-sub-menu index="/user-manage">
                <template #title>
                    <el-icon><UserFilled /></el-icon>
                    <span>用戶管理</span>
                </template>
                <el-menu-item index="/user-manage/useradd">添加用戶</el-menu-item>
                <el-menu-item index="/user-manage/userlist">用戶資訊</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/news-manage">
                <template #title>
                    <el-icon><MessageBox /></el-icon>
                    <span>新聞管理</span>
                </template>
                <el-menu-item index="/news-manage/newsadd">添加新聞</el-menu-item>
                <el-menu-item index="/news-manage/newslist">新聞資訊</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon><Reading /></el-icon>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="/product-manage/productadd">添加商品</el-menu-item>
                <el-menu-item index="/product-manage/productlist">商品資訊</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>

</template>

<script setup>
    import {HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer} from '@element-plus/icons-vue'
    import {useRoute} from 'vue-router'

    const route = useRoute()
</script>

<style lang="scss" scoped>
.el-aside {
    height: 100vh;
    
    .el-menu {
        height:  100vh;
    }
}
</style>