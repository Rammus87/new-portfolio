<template>
  <div>
    <el-page-header icon="null" title="用戶管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加用戶 </span>
      </template>
    </el-page-header>
    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="userFormRules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用戶名" prop="username">
        <el-input v-model="userForm.username" /> </el-form-item
    >
    <el-form-item label="密碼" prop="password">
        <el-input v-model="userForm.password" type="password" /> </el-form-item
    >
    <el-form-item label="角色" prop="gender">
              <el-select
                v-model="userForm.role"
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
              <Upload :avatar="userForm.avatar" @rammuschange="handleChange" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">送出 </el-button>
            </el-form-item>
  </el-form>
    
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Upload from "@/components/upload/Upload.vue";
const userFormRef = ref();
const userForm = reactive({
  username: "",
  password: "",
  role: 2, //小弟
  introduction: "",
  avatar: "",
  file: null,
});

const userFormRules = reactive({
  username: [{ required: true, message: "請輸入姓名", trigger: "blur" }],
  password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
  role: [{ required: true, message: "請選擇權限", trigger: "blur" }],
  introduction: [
    { required: true, message: "請輸入個人資訊", trigger: "blur" },
  ],
  avatar: [{ required: true, message: "請上傳頭像", trigger: "blur" }],
});

const options = [{
  label:"管理員",
  value:1
},{
  label:"小弟",
  value:2
}]

const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};

const submitForm = ()=>{
  userFormRef.value.validate((valid)=>{
    if(valid){
      //提交到後端
      console.log(userForm)
    }
  })
}

</script>

<style lang="scss" scoped>
  .demo-ruleForm{
    margin-top: 50px;
  }
</style>
