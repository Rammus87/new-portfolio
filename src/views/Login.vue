<template>
  <div>
    <vue-particles id="tsparticles" :options="options" />
    <div class="formContainer">
      <h3>川川的網站 暫時還沒有主意</h3>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        label-width="80px"
        class="loginform"
      >
        <el-form-item label="帳號" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登入</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from 'element-plus'

const loginForm = reactive({
  username: "",
  password: "",
});

const router = useRouter();
const loginFormRef = ref();

const loginRules = reactive({
  username: [
    {
      required: true,
      message: "請輸入帳號",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "請輸入密碼",
      trigger: "blur",
    },
  ],
});

const submitForm = () => {
  //1.驗證
  //2.提交
  //3.給token
  loginFormRef.value.validate((vaild) => {
    if (vaild) {
      // console.log(loginForm);
      // localStorage.setItem("token", "rammus");
      axios.post("/adminapi/user/login",loginForm).then(res=>{
        console.log("帳戶數據",res.data)
        if(res.data.ActionType==="ok"){
          router.push("/index")
        }else{
          ElMessage.error('帳號密碼錯誤')
        }
      })
      router.push("/index");
    }
  });
};

//設定particles
const options = {
  background: {
    color: {
      value: "#2d3a4b",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgb($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 30px;
  }

  .loginform {
    margin-top: 20px;
  }
}

::v-deep .el-form-item__label {
  color: white;
}
</style>
