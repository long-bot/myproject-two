<template>
  <el-container class="home-container">
    <el-aside :width="isCollapse?'64px':'200px'" class="home-aside">
      <img src="../../assets/images/logo_admin.png" alt />
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#200340"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:0;"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-submenu index="/">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>首页</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="/article">
          <i class="el-icon-menu"></i>
          <span slot="title">内存管理</span>
        </el-menu-item>
        <el-menu-item index="/image" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-setting"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-setting"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-setting"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="home-header">
        <span class="el-icon-s-fold" @click="open"></span>
        <span>传智播客</span>
        <el-dropdown
          :hide-on-click="false"
          style="float: right"
          class="logo"
          @command="handleCommand"
        >
          <img :src="avatar" alt width="50"/>
          <span class="el-dropdown-link">
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting">个人信息</el-dropdown-item>
            <el-dropdown-item command="loout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      avatar: null,
      name: ''
    }
  },
  methods: {
    open () {
      this.isCollapse = !this.isCollapse
    },
    // 设置个人信息
    setting () {
      // 跳转到设置页面
      this.$router.push('/setting')
    },
    handleCommand (command) {}
  },
  created () {
    const res = JSON.parse(sessionStorage.getItem('token'))
    console.log(res)
    this.avatar = res.photo
    this.name = res.name
  }

}
</script>

<style lang="less">
.home-container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .home-header {
    line-height: 60px;
    border-bottom: 1px solid #000;
    .logo {
      // background: url(../../assets/images/favicon.ico);
      img {
        vertical-align: middle;
      }
    }

    .el-icon-s-fold {
      font-size: 30px;
      vertical-align: middle;
    }
  }
  .home-aside {
    background: #000;
  }
}
</style>
