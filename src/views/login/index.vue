<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <div class="langselect-container">
          <langSelect effect="light" />
        </div>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        >
        </el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          :type="passwordType"
          placeholder="password"
          name="password"
          v-model="loginForm.password"
        ></el-input>
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          ></svg-icon>
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleLogin"
          :loading="loading"
          >{{ $t('login.loginBtn') }}</el-button
        >
      </el-form-item>
      <div class="tips" v-html="$t('login.desc')"></div>
    </el-form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import router from '@/router';
import LangSelect from '@/components/LangSelect';
import { validatePassword } from './rules';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
// 表单数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
});

// 验证规则
const i18n = useI18n();
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
});

// 处理密码文本显示
const passwordType = ref('password');

// 显示隐藏密码
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text';
  } else {
    passwordType.value = 'password';
  }
};

const loading = ref(false);
const store = useStore();
const loginFormRef = ref(null);
// 登录
const handleLogin = () => {
  // 进行表单校验
  loginFormRef.value.validate(async valid => {
    if (!valid) return;
    // 触发登录
    loading.value = true;
    try {
      const { token } = await store.dispatch('user/login', loginForm.value);
      // console.log('res in login component: ', res);
      if (token) {
        loading.value = false;
        router.push('/');
      }
      // TODO 进行登录后处理
    } catch (error) {
      loading.value = false;
      console.log('error: ', error);
    }
  });
};
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .langselect-container {
      position: absolute;
      top: 6px;
      right: 0;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
      background-color: #fff;

      ::v-deep(.svg-icon) {
        width: 26px;
        height: 26px;
      }
    }

    ::v-deep(.lang-select) {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
