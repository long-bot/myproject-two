<template>
  <div class="login-content">
    <el-card class="login-card">
      <el-form :model="loginForm" :rules="rules" ref="aaa">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width: 60%" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button type="primary" round style="float: right">验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round style="width: 100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkmobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('输入的格式不正确'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入正确的手机号',
            triggle: 'blur'
          },
          {
            validator: checkmobile,
            messaghe: ' 请输入正确的手机号格式',
            triggle: 'blour'
          }
        ],
        code: [
          {
            required: true,
            messgae: '请输入验证码',
            triggle: 'blur'
          },
          { len: 6, messgae: '输入六位', triggle: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      //   console.log(this.$refs.aaa.validate())
      this.$refs.aaa.validate(valid => {
        if (valid) {
          //   如果valid是true的话就代表成功   成功就发送请求
          this.$http.post('authorizations', this.loginForm).then(res => {
            sessionStorage.setItem('token', JSON.stringify(res.data.data))
            console.log(res.data.data)
            this.$router.push('/')
          }).catch(() => {
            console.log(new Error('手机号或验证码输入错误'))
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-content {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg);
  .login-card {
    width: 20%;
    height: 40%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url(../../assets/images/logo_index.png) no-repeat;
    padding-top: 50px;
  }
}
</style>
