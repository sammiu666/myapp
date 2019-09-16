<template>
  <div class="row">
    <div id="home" class="col-sm-12 text-center">
      <div class="background">
        <h1>欢迎大家品尝pizza</h1>
        <h2>这里有你喜欢的各种pizza</h2>
        <button @click="gotoMenu" class="btn btn-success">Let's go order</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    gotoMenu() {
      //跳转到上一次浏览的页面
      this.$router.go(-1);

      //指定跳转的地址
      // this.$router.replace('/menu')

      //指定跳转到路由名字下
      // this.$router.replace({name: 'menu'})

      //通过push跳转
      // this.$router.push('/menu')
    }
  }
};
</script>
<style  scoped>
#home {
  background: url("../assets/pizza.jpg");
  background-size: 100%;
  height: 85vh;
  padding: 10%;
  margin: 10px;
}

h1,
h2 {
  margin: 6%;
}

.background {
  background: #eee;
  opacity: 0.8;
  max-width: 70vw;
  margin: 0 auto;
  padding: 20px 0;
}
</style>