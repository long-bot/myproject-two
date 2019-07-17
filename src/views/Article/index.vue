<template>
  <div class="article-container">
    <el-card>
      <!-- 卡片的头部 -->
      <div slot="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/'}">活动管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 卡片的内容 -->
      <div>
        <el-form label-width="80px">
          <el-form-item label="状态：">
            <el-radio-group v-model="reqParams.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道：">
            <my-channel v-model="reqParams.channer_id"></my-channel>
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              @change="changeDate"
              type="daterange"
              align="right"
              v-model="dateValues"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label>
            <el-button type="primary" @click="search">筛选</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b> 条结果：
      </div>
      <el-table :data="articles">
        <el-table-column label="封面" prop>
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:100px">
              <div slot="error">
                <img src="../../assets/images/error.gif" alt width:100 height:100 />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button circle type="primary" icon="el-icon-edit" @click="edit(scope.row.id)"></el-button>
            <el-button circle type="danger" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev,pager,next"
        :total="1000"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="page"
        style="text-align:center"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channer_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        per_page: 20,
        page: 1
      },

      // 时间
      dateValues: [],
      // 文章列表数据
      articles: [],
      // 文章总数量
      total: null
    }
  },
  created () {
    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    // 编辑按钮
    edit (id) {
      this.$router.push('/publish')
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确定的时候发送请求
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 当前页数
    page (newPage) {
      console.log(789)
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 筛选按钮
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    // 时间  当确认时间的时候触发  参数为当前选择的时间
    changeDate (time) {
      this.reqParams.begin_pubdate = time[0]
      this.reqParams.end_pubdate = time[1]
    },

    // 获取文章列表
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  .el-card {
    margin-bottom: 30px;
  }
}
</style>
