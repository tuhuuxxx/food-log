<template>
<div class="root">
    <el-row>
        <el-col :span="12" class="header">
           <p> Skymapdev</p>
        </el-col>
    </el-row>
    <el-form :model="form" label-width="100px">
        <el-form-item label="Username" prop="email">
            <el-input placeholder="Enter Username">
            </el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
            <el-input placeholder="Enter Password">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">OK</el-button>
        </el-form-item>
    </el-form>
    <p class="support">Bạn chưa có tài khoản Skymapdev? Đăng kí<a src="#" style="color:blue"> tại đây</a></p>
    <p class="support">Bạn quên mật khẩu? Click vào<a src="#" style="color:blue;"> tại đây</a></p>
</div>
</template>

<script>
  export default {
    name: 'logInFootLog',

    data () {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    }
  }
</script>
<style>
.root{
    margin: auto;
    width:400px;
    border:2px solid deepskyblue;
    border-radius: 5px;
    text-align: left;
}
.header{
    background-color:deepskyblue;
    border:0.2px solid lightgreen;
    border-radius: 3px;
    color:white;
    height:50px;
    margin-bottom: 20px;
    text-align: center;
    vertical-align: middle
}
.el-input{
    width:80%;
}
.logIn{
    background-color:#1D8CE0;
    color:white;
   
}
.support{
    font-size: 12px;
    margin-left:25px;
}
</style>
