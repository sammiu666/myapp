<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="cart-decrease icon-remove_circle_outline"
        v-show="food.quantity"
        @click.stop.prevent="decreaseCart"
      ></div>
    </transition>
    <div class="cart-count" v-show="food.quantity">{{food.quantity}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="increaseCart">
      <i class="bg"></i>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  // 接收从Good.vue以及ProductDetail.vue中传来的food属性
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    decreaseCart() {
      this.food.quantity--;
    },
    increaseCart() {
      // 判断是否已经有此项商品
      // 若没有，quantity置1
      if (!this.food.quantity) {
        Vue.set(this.food, "quantity", 1);
      } else {
        // 否则自增
        this.food.quantity++;
      }
    }
  }
};
</script>

<style lang='less' >
@color_1: #b4b4b4;
@color_2: #ffd161;

.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    width: 26px;
    height: 26px;
    font-size: 26px;
    color: @color_1;
  }
  .cart-add {
    .bg {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: black;
      position: absolute;
      left: 3px;
      top: 3px;
      z-index: -1;
    }
    display: inline-block;
    width: 26px;
    height: 26px;
    font-size: 26px;
    color: @color_2;
    position: relative;
  }
  .cart-count {
    display: inline-block;
    width: 25px;
    text-align: center;
    font-size: 12px;
    line-height: 26px;
    vertical-align: top;
  }
}
.move-enter-active,
.move-leave-active {
  transition: all 0.5s linear;
}
.move-enter,
.move-leave-to {
  transform: translateX(20px) rotate(180deg);
}
</style>