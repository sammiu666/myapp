<template>
  <transition name="food-detail">
    <div class="food" ref="foodView" v-show="showFoodDetail">
      <div class="food-wrapper">
        <div class="food-content">
          <div class="img-wrapper">
            <img class="food-img" :src="food.picture" />
            <span class="close-bt icon-close" @click="closeView"></span>
            <img class="share-bt" src="./img/share.png" />
            <img class="more-bt" src="./img/more.png" />
          </div>

          <div class="content-wrapper">
            <h3 class="name">{{food.name}}</h3>
            <p class="saled">{{food.month_saled_content}}</p>
            <img
              class="product"
              v-show="food.product_label_picture"
              :src="food.product_label_picture"
            />
            <p class="price">
              <span class="text">￥{{food.min_price}}</span>
              <span class="unit">/{{food.unit}}</span>
            </p>

            <div class="cartcontrol-wrapper">
              <!-- 向购物车组件传递food数据 -->
              <app-cart-control :food="food"></app-cart-control>
            </div>
            <div class="buy" @click="addProduct" v-show="!food.quantity || food.quantity == 0">选规格</div>
          </div>
        </div>
        <app-split></app-split>

        <!-- 外卖评价 -->
        <div class="rating-wrapper">
          <!-- 评价头部 -->
          <div class="rating-title">
            <div class="like-ratio" v-if="food.rating">
              <span class="title">{{food.rating.title}}</span>
              <span class="retio">
                (
                {{food.rating.like_ratio_desc}}
                <i>{{food.rating.like_ratio}}</i>
                )
              </span>
            </div>
            <div class="snd-title" v-if="food.rating">
              <span class="text">{{food.rating.snd_title}}</span>
              <span class="icon icon-keyboard_arrow_right"></span>
            </div>
          </div>
          <ul class="rating-content" v-if="food.rating">
            <li
              v-for="(comment,index) in food.rating.comment_list"
              :key="index"
              class="comment-item"
            >
              <div class="comment-header">
                <img :src="comment.user_icon" v-if="comment.user_icon" />
                <img src="./img/anonymity.png" v-if="!comment.user_icon" />
              </div>
              <div class="comment-main">
                <div class="user">{{comment.user_name}}</div>
                <div class="time">{{comment.comment_time}}</div>
                <div class="content">{{comment.comment_content}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import CartControl from "../cartcontrol/CartControl";
import Split from "../split/Split";
export default {
  // 接收从Good.vue传递过来的所选中的商品
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFoodDetail: false
    };
  },
  methods: {
    showView() {
      this.showFoodDetail = true;
      // DOM更新完成
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodView, {
            click: true
          });
        } else {
          // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
          this.scroll.refresh();
        }
      });
    },
    closeView() {
      this.showFoodDetail = false;
    },
    addProduct() {
      // 为每个商品添加新的属性quantity
      Vue.set(this.selectFood, "quantity", 1);
    }
  },
  components: {
    "app-cart-control": CartControl,
    "app-split": Split
  }
};
</script>

<style  lang='less'>
@color_1: white;
@color_2: #333333;
@color_3: #9d9d9d;
@color_4: #fb4e44;
@color_5: #666666;

/* 添加过渡效果 */
.food-detail-enter-active {
  transition: 1s;
}

.food-detail-leave-active {
  transition: 1s;
}

.food-detail-enter {
  transform: translateX(100%);
}

.food-detail-leave-to {
  transform: translateX(100%);
}
/* 商品详情页面覆盖点餐页面 */
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 51px;
  background: white;
  width: 100%;
  z-index: 90;

  .food-wrapper {
    .food-content {
      .img-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;

        .food-img {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
        }

        .close-bt {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 10px;
          top: 10px;
          text-align: center;
          font-size: 30px;
          color: @color_1;
          background: #7f7f7f;
          border-radius: 50%;
        }

        .share-bt,
        .more-bt {
          width: 30px;
          height: 30px;
          position: absolute;
          top: 10px;
        }

        .share-bt {
          right: 50px;
        }

        .more-bt {
          right: 10px;
        }
      }

      .content-wrapper {
        padding: 0 0 16px 16px;
        position: relative;

        .name {
          font-size: 15px;
          color: @color_2;
          line-height: 30px;
          font-weight: bold;
        }

        .saled {
          font-size: 11px;
          color: @color_3;
          margin-bottom: 6px;
        }

        .product {
          height: 15px;
          margin-bottom: 16px;
        }

        .price {
          font-size: 0;

          .text {
            font-size: 17px;
            color: @color_4;
          }

          .unit {
            font-size: 11px;
            color: @color_3;
          }
        }
      }

      .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 10px;
        padding: 2px;
      }

      .buy {
        width: 64px;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        background: #ffd161;
        border-radius: 30px;
        position: absolute;
        right: 12px;
        bottom: 10px;
      }
    }

    .rating-wrapper {
      padding-left: 16px;

      .rating-title {
        padding: 16px 16px 16px 0;

        .like-ratio {
          float: left;
          font-size: 0;

          .title {
            font-size: 13px;
          }

          .ratio {
            font-size: 11px;

            i {
              color: @color_4;
              font-size: 11px;
            }
          }
        }

        .snd-title {
          float: right;
          font-size: 0;

          .text,
          .icon {
            font-size: 13px;
            color: #9d9d9d;
            display: inline-block;
          }

          .icon {
            margin-left: 12px;
          }
        }
      }

      .comment-item {
        display: flex;
        width: 100%;
        padding: 15px 14px 17px 0;
        border-bottom: 1px solid #f4f4f4;
        box-sizing: border-box;

        .comment-header {
          flex: 0 0 41px;
          margin-right: 10px;

          img {
            width: 41px;
            height: 41px;
            border-radius: 50%;
          }
        }

        .comment-main {
          flex: 1;
          margin-top: 6px;

          .user {
            width: 50%;
            float: left;
            font-size: 12px;
            color: @color_2;
          }

          .time {
            width: 50%;
            float: right;
            text-align: right;
            font-size: 10px;
            color: @color_5;
          }

          .content {
            margin-top: 17px;
            font-size: 13px;
            line-height: 19px;
          }
        }
      }
    }
  }
}
</style>
