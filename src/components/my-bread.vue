<template>
  <div class="bread-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/'}">
        <slot></slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'my-bread',
  data () {
    return {
      aaa: 'aaa'
    }
  }
}
</script>

<style>
</style>
