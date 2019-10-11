<template>
  <div id="app">
    <!-- 头部 -->
    <app-header :poiInfo="poiInfo"></app-header>
    <!-- 导航 -->
    <app-nav :commentNum="commentNum"></app-nav>
    <!-- 保持组件状态，避免重复渲染 -->
    <!-- 添加过渡效果 -->
    <keep-alive>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      poiInfo: {},
      commentNum: 0
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      Velocity(
        el,
        { opacity: 1 },
        {
          duration: 1000,
          complete: done
        }
      );
    },
    afterEnter(el) {},
    beforeLeave(el) {
      el.style.opacity = 1;
    },
    leave(el, done) {
      Velocity(
        el,
        { opacity: 0 },
        {
          duration: 1000,
          complete: done
        }
      );
    },
    afterLeave(el) {}
  },
  created() {
    // 请求goods

    axios
      .get("/api/goods")
      .then(res => res.data)
      .then(response => {
        if (response.code === 0) {
          this.poiInfo = response.data.poi_info;
        }
      });

    // 请求ratings
    axios
      .get("/api/ratings")
      .then(res => res.data)
      .then(response => {
        if (response.code === 0) {
          this.commentNum = response.data.comment_num;
        }
      });
  },
  components: {
    "app-header": Header,
    "app-nav": Nav
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
