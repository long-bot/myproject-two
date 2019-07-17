<template>
  <el-select :value="value" placeholder="请选择" @change="send" >
    <el-option v-for="item in channerOptions" :key="item.id" :value="item.id" :label="item.name"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // 频道列表
      channerOptions: [{ name: 'java', id: 1 }]
    }
  },
  created () {
    // 获取频道列表数据
    this.getChannelOptions()
  },
  methods: {
    send (value) {
      this.$emit('input', value)
    },
    // 获取频道列表数据
    async getChannelOptions () {
      const res = await this.$http.get('channels')
      this.channerOptions = res.data.data.channels
    }
  }
}
</script>

<style>
</style>
