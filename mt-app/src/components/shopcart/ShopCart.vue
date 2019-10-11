<template>
  <div class="shopcart">
    <div class="shopcart-wrapper">
      <!-- 底部左侧 -->
      <div class="content-left">
        <!-- 点击logo时切换购物车显示状态 -->
        <div class="logo-wrapper" :class="{'highlight':totalQuantity > 0}" @click="toggleList">
          <span class="icon-shopping_cart logo" :class="{'highlight':totalQuantity > 0}"></span>
          <i class="num" v-show="totalQuantity">{{totalQuantity}}</i>
        </div>
        <div class="desc-wrapper">
          <p class="total-price" v-show="totalPrice">￥{{totalPrice}}</p>
          <p class="tip" :class="{'highlight':totalQuantity > 0}">另需{{poiInfo.shipping_fee_tip}}</p>
        </div>
      </div>
      <!-- 底部右侧 -->
      <div class="content-right" :class="{'highlight':totalQuantity > 0}">{{payStr}}</div>

      <!-- 购物车展示  -->

      <div class="shopcart-list" v-show="listShow" :class="{'show':listShow}">
        <div class="list-top" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</div>
        <div class="list-header">
          <h3 class="title">1号口袋</h3>
          <div class="empty" @click="clearAll">
            <img src="./img/ash_bin.png" />
            <span>清空购物车</span>
          </div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food-item" v-for="(food,index) in selectFoods" :key="index">
              <div class="desc-wrapper">
                <div class="desc-left">
                  <p class="name">{{food.name}}</p>
                  <p class="unit" v-show="!food.description">{{food.unit}}</p>
                  <p class="description" v-show="!food.unit">{{food.description}}</p>
                </div>
                <div class="desc-right">￥{{food.min_price}}</div>
              </div>
              <div class="cartcontrol-wrapper">
                <!-- 向父组件传递food值 -->
                <app-cart-control :food="food"></app-cart-control>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-bottom"></div>
      </div>
    </div>
    <!-- 弹出购物车展示时设置蒙版 -->
    <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
  </div>
</template>

<script>
// 为组件添加滚动事件
import BScrool from "better-scroll";
import CartControl from "../cartcontrol/CartControl";
export default {
  data() {
    return {
      // 购物车伸展状态
      fold: true
    };
  },
  props: {
    poiInfo: {
      type: Object,
      default: {}
    },
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    "app-cart-control": CartControl
  },
  computed: {
    // 计算商品总数
    totalQuantity() {
      let num = 0;
      this.selectFoods.forEach(food => {
        num += food.quantity;
      });
      return num;
    },
    // 计算商品总价
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.quantity * food.min_price;
      });
      return total;
    },
    payStr() {
      if (this.totalQuantity > 0) {
        return "去结算";
      } else {
        return this.poiInfo.min_price_tip;
      }
    },
    listShow() {
      if (!this.totalQuantity) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;

      if (show) {
        this.$nextTick(() => {
          if (!this.shopScroll) {
            // 设置滚动
            this.shopScroll = new BScrool(this.$refs.listContent, {
              click: true
            });
          } else {
            // DOM结构发生变化时重新计算
            this.shopScroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    // 切换购物车伸展状态
    toggleList() {
      if (!this.totalQuantity) {
        return;
      }
      this.fold = !this.fold;
    },
    clearAll() {
      this.selectFoods.forEach(food => {
        food.quantity = 0;
      });
    },
    hideMask() {
      this.fold = true;
    }
  }
};
</script>

<style lang='less'>
/* 图标css */
@import url(../../common/css/icon.css);
@color_1: #bab9b9;
@color_2: #c4c4c4;
@color_3: white;
@color_4: #2d2b2a;
@color_5: #646158;
@color_6: #b4b4b4;

.shopcart-wrapper {
  width: 100%;
  height: 51px;
  background: #514f4f;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 99;

  .content-left {
    .logo-wrapper.highlight {
      background: #ffd161;
    }

    // 图标被点击时高亮样式
    .logo-wrapper {
      .logo.highlight {
        color: @color_4;
      }
    }
  }
}

.content-left {
  // 左侧宽度自适应
  flex: 1;

  .logo-wrapper {
    width: 50px;
    height: 50px;
    background: #666666;
    border-radius: 50%;
    position: relative;
    top: -14px;
    left: 10px;
    text-align: center;
    float: left;

    .logo {
      font-size: 28px;
      color: @color_2;
      // logo垂直居中
      line-height: 50px;
    }

    .num {
      width: 15px;
      height: 15px;
      line-height: 15px;
      border-radius: 50%;
      font-size: 9px;
      color: @color_3;
      background: red;
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .desc-wrapper {
    float: left;
    margin-left: 13px;

    .tip {
      font-size: 12px;
      color: @color_1;
      line-height: 50px;
    }

    // 高亮时改变行高
    .tip.highlight {
      line-height: 12px;
    }

    .total-price {
      font-size: 18px;
      line-height: 33px;
      color: @color_3;
    }
  }
}

// 右侧宽度固定
.content-right {
  flex: 0 0 110px;
  font-size: 15px;
  color: @color_1;
  line-height: 51px;
  text-align: center;
  font-weight: bold;
}

.content-right.highlight {
  background: #ffd161;
  color: @color_4;
}

.shopcart-list {
  position: absolute;
  left: 0;
  top: 0;
  // 使购物车图标在上面显示
  z-index: -1;
  width: 100%;

  .list-top {
    height: 30px;
    text-align: center;
    font-size: 11px;
    background: #f3e6c6;
    line-height: 30px;
    color: @color_5;
  }

  .list-header {
    height: 30px;
    background: #f4f4f4;

    .title {
      float: left;
      border-left: 4px solid #53c123;
      padding-left: 6px;
      line-height: 30px;
      font-size: 12px;
    }

    .empty {
      float: right;
      line-height: 30px;
      margin-right: 10px;
      font-size: 0;

      img {
        height: 14px;
        margin-right: 9px;
        vertical-align: middle;
      }

      span {
        font-size: 12px;
        vertical-align: middle;
      }
    }
  }

  .list-content {
    max-height: 360px;
    overflow: hidden;
    background: white;

    .food-item {
      height: 38px;
      padding: 12px 12px 10px 12px;
      border-bottom: 1px solid #f4f4f4;

      .desc-wrapper {
        float: left;
        width: 240px;

        .desc-left {
          float: left;
          width: 170px;

          .name {
            font-size: 16px;
            margin-bottom: 8px;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            height: 16px;
          }

          .unit {
            font-size: 12px;
            color: @color_6;
          }

          .description {
            font-size: 12px;
            color: @color_6;
            overflow: hidden;
            height: 12px;
          }
        }

        .desc-right {
          float: right;
          width: 70px;
          text-align: right;
        }
      }

      .cartcontrol-wrapper {
        float: right;
        margin-top: 6px;
      }
    }
  }
}

.shopcart-list.show {
  // 向上移动自身高度
  transform: translateY(-100%);
}

// 蒙版样式
.shopcart {
  .shopcart-mask {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    background: rgba(7, 17, 27, 0.6);
  }
}
</style>