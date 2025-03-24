<template>
  <div>
    <el-page-header icon="null" title="系統管理中心">
      <template #content>
        <span class="text-large font-600 mr-3"> 個人中心 </span>
      </template>
    </el-page-header>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8"
        ><el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ store.state.userInfo.username }}</h3>
          <h3>{{ store.state.userInfo.role === 1 ? "管理員" : "小作者" }}</h3>
        </el-card></el-col
      >
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>個人資訊</span>
            </div>
          </template>
          <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="用戶名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性別" prop="gender">
              <el-select
                v-model="userForm.gender"
                class="m-2"
                placeholder="Select"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="個人介紹" prop="introduction">
              <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>

            <el-form-item label="頭像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleChange"
              >
                <img v-if="userForm.avatar" :src="uploadAvatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
          <el-button type="primary" @click="submitForm()">送出</el-button>
        </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed, reactive } from "vue";
import { Plus } from '@element-plus/icons-vue';
import axios from "axios";
import { ElMessage } from "element-plus";

const store = useStore();
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? 'http://localhost:3000' + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);

const uploadAvatar = computed(()=>userForm.avatar.includes('blob')?userForm.avatar:"http://localhost:3000" + userForm.avatar)

const { username, gender, introduction, avatar } = store.state.userInfo;
const userFormRef = ref();
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file:null
});

const userFormRules = reactive({
  username: [{ required: true, message: "請輸入姓名", trigger: "blur" }],
  gender: [{ required: true, message: "請選擇性別", trigger: "blur" }],
  introduction: [
    { required: true, message: "請輸入個人資訊", trigger: "blur" },
  ],
  avatar: [{ required: true, message: "請上傳頭像", trigger: "blur" }],
});

const options = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

//每次選完圖片的回調
const handleChange = (file)=>{
  userForm.avatar = URL.createObjectURL(file.raw)
  userForm.file = file.raw
}

//送出資料
const submitForm = ()=>{
  userFormRef.value.validate((valid)=>{
    if(valid){
      const params = new FormData()
      for(let i in userForm){
        params.append(i,userForm[i])
      }
      console.log(params)
      axios.post("/adminapi/user/upload",params,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }).then(res=>{
        console.log("後端收到了",res.data)

        if(res.data.ActionType === "OK"){
          store.commit("changeUserInfo",res.data.data)
          ElMessage.success("更新成功")
        }
      })
    }
  })
}



</script>

<style scoped lang="scss">
.el-row {
  margin-top: 20px;
  .box-card {
    text-align: center;
  }
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar{
  width: 178px;
  height: 178px;
}
</style>
