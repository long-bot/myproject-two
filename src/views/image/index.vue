<template>
  <div
    class="image_container"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <el-radio-group v-model="reqParams.collect" @change="search" size="small">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" @click="dialogVisible = true" style="float:right" size="small">上传素材</el-button>

      <ul class="img_list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
            <span
              class="el-icon-star-on"
              :class="{red:item.is_collected}"
              @click="toggleFav(item)"
            ></span>
            <span class="el-icon-delete-solid" @click="del(item.id)"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        style="text-align:center"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        :total="total"
        @current-change="changePage"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="20%">
      <span>
        <el-upload
          style="text-align:center"
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          name="image"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 12
      },
      // 图片列表
      images: [],
      // 加载数据
      loading: false,
      // 总页数
      total: 0,
      // 对话框
      dialogVisible: false,
      // 上传成功要显示的图片
      imageUrl: null,
      // 请求头携带数据
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(sessionStorage.getItem('token')).token
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 切换收藏
    async toggleFav (item) {
      const { data: { data } } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      // 成功
      this.$message.success('操作成功')
      item.is_collected = data.collect
    },
    // 删除当前图片
    del (id) {
      // 点击删除按钮  弹出对话框
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 当点击确认的时候发送请求
          await this.$http.delete('user/images/' + id)
          // 弹出框删除成功
          this.$message.success('删除成功')
          // 重新获取数据
          this.getImages()
        })
        .catch(() => {
        })
    },
    // 上传图片成功的回调函数
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      // 两秒钟关闭对话框
      window.setTimeout(() => {
        this.dialogVisible = false
        // 更新列表
        this.getImages()
        // 清空上传成功显示的图片
        this.imageUrl = null
      }, 2000)
    },
    // 当reqParams的collect变化时触发  收藏
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 当点击分页 的时候触发
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    //   获取图片数据
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', {
        params: this.reqParams
      })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>

<style scope lang="less">
.image_container {
  .img_list {
    overflow: hidden;
    li {
      outline: none;
      position: relative;
      border: 1px dashed #ddd;
      width: 180px;
      height: 180px;
      margin-right: 50px;
      list-style: none;
      float: left;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
      }
      .fot {
        text-align: center;
        position: absolute;
        width: 100%;
        bottom: 10px;
        background: rgba(0, 0, 0, 0.5);

        span {
          font-size: 30px;
          margin: 0 20px;
          &.red {
            color: red;
          }
        }
      }
    }
  }
}
</style>
