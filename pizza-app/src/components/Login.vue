<template>
  <div class="row">
    <div class="col-md-12 col-lg-12">
      <div class="card">
        <div class="card-body">
          <img class="mx-auto d-block" src="../assets/icon.png" alt />
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="email" class="form-control" v-model="email" />
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
            <button type="submit" class="btn btn-block btn-success">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      this.axios.get("/users.json").then(response => {
        const data = response.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          users.push(user);
        }
        //   查找输入的邮箱密码是否与数据库匹配
        let result = users.filter(user => {
          return user.email === this.email && user.password === this.password;
        });
        console.log(result);
        //   若匹配
        if (result != null && result.length > 0) {
          this.$store.dispatch("setUser", result[0].email);
          this.$router.push({ name: "home" });
        } else {
          alert("账号密码不匹配!");
          this.$store.dispatch("setUser", null);
        }
      });
    }
  },
  //   在渲染该组件的对应路由被confirm前调用
  // 不能获取组件实例 this
  // 因为当守卫执行前，组件实例还没被创建
  beforeRouteEnter(to, from, next) {
    //   通过vm来访问组件实例
    next(vm => vm.$store.dispatch("setUser", null));
  }
};
</script>