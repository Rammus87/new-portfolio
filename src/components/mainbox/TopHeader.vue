<template>
    <el-header>
        <div class="left">
            <el-icon @click="handleCollapsed"><Menu /></el-icon>
            <span>自媒體交流中心</span>
        </div>
        <div class="right">
            <span>歡迎回來 admin</span>
            <el-dropdown>
    <span class="el-dropdown-link">
        <el-icon :size="30" color="white"><User /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleCenter">個人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
        </div>
        </el-header>
</template>


<script setup>
    import { useStore}  from 'vuex'
    import { Menu, User } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router'

    const store = useStore()
    const router = useRouter()

    const handleCollapsed = ()=>{
        store.commit('changeCollapsed')
    }

    const handleCenter = () =>{
        router.push('/center')
    }

    const handleLogout = () =>{
        localStorage.removeItem('token') //清除token
        router.push('/login')
    }

</script>

<style lang="scss" scoped>
    span{
        margin-left: 10px;
    }

    .el-header{
        background-color: #2d3a4b;
        color: white;
        width: 100%;
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .left, .right{
        display: flex;
    }

    .left{
        i{
            margin: auto;
            cursor: pointer;
        }
    }

    .right{
        .el-dropdown{
            margin: auto;
        }
    }
</style>