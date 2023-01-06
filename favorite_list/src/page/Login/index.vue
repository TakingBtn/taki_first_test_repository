<template>
  <div
    id="bg"
    :class="{
      earlyMorning: isEarlyMorning,
      morning: isMorning,
      midday: isMidday,
      afternoon: isAfternoon,
      evening: isEvening,
      night: isNight,
    }"
  >
    <div class="login_container">
      <div class="login">
        <div class="left-box" :class="{ active: isActive }">
          <!-- 登录表单 -->
          <div class="login-form" v-show="isLogin">
            <h2 class="title">Login</h2>
            <!-- id可有可无 -->
            <p>
              <input
                type="text"
                name="username"
                placeholder="username"
                v-model="loginForm.username"
              />
            </p>
            <p>
              <input
                type="password"
                name="password"
                placeholder="password"
                v-model="loginForm.password"
              />
            </p>
            <div class="buttons">
              <button class="btn btn-primary btn-sm btn-block" @click="login">
                Login
              </button>
            </div>
            <p style="text-align: center">
              <a class="changeFrom" @click="changeFrom">Register</a>
            </p>
          </div>
        </div>
        <div class="right-box" :class="{ active: !isActive }">
          <!-- 注册表单 -->
          <div class="register-form" v-show="!isLogin">
            <h2 class="title">Register</h2>
            <!-- id可有可无 -->
            <p>
              <input
                type="text"
                name="username"
                placeholder="username"
                v-model="registerForm.username"
              />
            </p>
            <p>
              <input
                type="password"
                name="password"
                placeholder="password"
                v-model="registerForm.password"
              />
            </p>
            <p>
              <input
                type="password"
                name="password"
                placeholder="rePassword"
                v-model="registerForm.rePassword"
              />
            </p>
            <div class="buttons">
              <button
                class="btn btn-primary btn-sm btn-block"
                @click="register"
              >
                Register
              </button>
            </div>
            <p style="text-align: center">
              <a class="changeFrom" @click="changeFrom">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 切换表单
      isLogin: true,
      isActive: true,
      loginForm: {},
      registerForm: {},

      // 获取时间
      interval: "",
      hour: "",
      min: "",
      second: "",
      nowTime: "",
      // 根据时间改变背景
      isEarlyMorning: false,
      isMorning: false,
      isMidday: false,
      isAfternoon: false,
      isEvening: false,
      isNight: false,
    };
  },
  methods: {
    // 检测时间
    toCheckTime() {
      let isTime = [
        this.isEarlyMorning,
        this.isMorning,
        this.isMidday,
        this.isAfternoon,
        this.isEvening,
        this.isNight,
      ];
      for (let v of isTime) {
        v = false;
      }
    },
    checkTime() {
      let date = new Date();
      let nowHour = date.getHours();
      console.log("checkTime", nowHour);
      if (nowHour >= 0 && nowHour < 6) {
        this.toCheckTime();
        this.isEarlyMorning = true;
      } else if (nowHour >= 6 && nowHour < 11) {
        this.toCheckTime();
        this.isMorning = true;
      } else if (nowHour >= 11 && nowHour < 13) {
        this.toCheckTime();
        this.isMidday = true;
      } else if (nowHour >= 13 && nowHour < 17) {
        this.toCheckTime();
        this.isAfternoon = true;
      } else if (nowHour >= 17 && nowHour < 19) {
        this.toCheckTime();
        this.isEvening = true;
      } else if (nowHour >= 19 && nowHour < 24) {
        this.toCheckTime();
        this.isNight = true;
      }
    },
    //切换表单
    changeFrom() {
      if (this.isLogin) {
        this.loginForm = {}; //清空请求表单
        this.isActive = false; //切换样式
        this.isLogin = false; //v-show
      } else {
        this.registerForm = {}; //清空请求表单
        this.isActive = true; //切换样式
        this.isLogin = true; //v-show
      }
    },
    //登录操作
    login() {
      let {username,password} = this.loginForm
      //判断 输入是否为空
      if (username.trim() && password.trim()) {
        this.$store
          //向仓库发送请求
          .dispatch("login", {username,password})
          //返回promise 对象
          .then(
            (response) => {
              //请求成功
              console.log("login", response);
              if (response.code == 1) {
                // console.log(response)
                //用户名错误 或 密码错误
                if (response.message != "登录成功") {
                  alert(response.message);
                } else {
                  console.log(this.$route)
                  this.$router.push({ name: "ChatRoom" });
                }
              } else {
                this.$router.push({ name: "Fail" });
              }
            },
            (reject) => {
              //请求失败
              console.log(reject);
              alert(reject.data);
            }
          );
      } else {
        alert("请检验你的用户名和密码");
      }
    },
    //注册操作
    register() {
      //检验用户名 和 密码 完整性
      if (this.registerForm.username.trim() && this.registerForm.password) {
        //检验 两次输入的密码是否 相同
        if (this.registerForm.password == this.registerForm.rePassword) {
          let {username, password} = this.registerForm
          console.log('registerForm',{username,password});
          this.$store
            //向仓库发送请求
            .dispatch("register", {username,password})
            //返回promise对象
            .then(
              (response) => {
                console.log("register", response);
                if (response.code == 1) {
                  if (response.message != "注册成功") {
                    alert(response.message);
                  } else {
                    alert(response.message);
                    //无需跳转 切换表单
                    this.changeFrom();
                  }
                }
              },
              (reject) => {
                //请求失败
                console.log(reject);
                alert(reject.data);
              }
            );
        } else {
          alert("两次输入密码不正确");
        }
      } else {
        alert("请检验你的用户名和密码");
      }
    },
  },
  //生命周期钩子函数
  mounted() {
    // 根据时间调整背景
    this.checkTime();
    this.interval = setInterval(() => {
      this.checkTime();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.earlyMorning {
  background: linear-gradient(#bdc3c7, #2c3e50);
}
.morning {
  background: linear-gradient(#2193b0, #6dd5ed);
}
.midday {
  background: linear-gradient(#2980b9, #6dd5fa, #ffffff);
}
.afternoon {
  background: linear-gradient(#373b44, #4286f4);
}
.evening {
  background: linear-gradient(#f12711, #f5af19);
}
.night {
  background: linear-gradient(#0f2027, #203a43, #2c5364);
}
.login_container {
  /*body有多少内容就给多少高*/
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* background: linear-gradient(0deg,#BA5370,#F4E2D8) no-repeat; */
}
p {
  margin: 8px;
}
.login {
  overflow: hidden;
  width: 800px; /* 如果为响应式布局（手机端）请修改 */
  height: 450px; /* 如果为响应式布局（手机端）请修改 */
  color: white;

  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}
.login > .left-box {
  float: left;
  width: 50%;
  height: 100%;
  border-radius: 15px 0 0 15px;
  transition: all 0.5s;

  display: flex;
  align-items: center;
  justify-content: center;
}
.login > .right-box {
  float: right;
  width: 50%;
  height: 100%;
  border-radius: 0 15px 15px 0;
  transition: all 0.5s;

  display: flex;
  align-items: center;
  justify-content: center;
}
.active {
  background: #adc5cf;
}
.title {
  text-align: center;
}
input {
  font-size: 18px;

  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: #212529 1px solid;
  background: transparent;
  outline: none;
}
button {
  cursor: pointer;
}
.buttons {
  margin: 8px;
  text-align: center;
}
.changeFrom {
  cursor: pointer;
  /* text-decoration: ; */
  color: cadetblue;
}
/*按钮*/
.btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-primary {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.5);
  border-color: #ba5370;
}

.btn-primary:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.3);
  border-color: #ba5370;
}

.btn-sm,
.btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}

.btn-block {
  display: block;
  width: 100%;
}

.btn-block + .btn-block {
  margin-top: 0.5rem;
}
/*按钮*/
</style>