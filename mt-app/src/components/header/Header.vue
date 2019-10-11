<template>
  <div class="header">
    <!-- 顶部通栏 开始 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>

      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input type="text" class="search-bar" placeholder="搜索店内商品" />
      </form>

      <div class="more-wrapper">
        <a href class="spelling-bt">拼单</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
    </div>
    <!-- 顶部通栏 结束 -->

    <!-- 主题内容 开始 -->

    <!-- 主题内容 结束 -->
    <div class="content-wrapper">
      <div class="icon" :style="head_bg">
        <!--<img :src="poiInfo.pic_url" />-->
      </div>
      <div class="name">
        <h3>{{poiInfo.name}}</h3>
      </div>
      <div class="collect">
        <img src="./img/star.png" />
        <span>收藏</span>
      </div>
    </div>
    <!-- 公告内容 开始 -->

    <!-- 公告内容 结束 -->
    <div class="bulletin-wrapper">
      <img v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" class="icon" />
      <span class="text" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
      <div class="detail" v-if="poiInfo.discounts2" @click="showBulletin">
        {{poiInfo.discounts2.length}}个活动
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!-- 背景内容 开始 -->
    <div class="bg-wrapper" :style="head_pic_url"></div>
    <!-- 背景内容 开始 -->

    <!-- 公告详情 开始 -->
    <transition name="bulletin-detail">
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper">
          <!-- 相关内容容器 -->
          <div class="main-wrapper" :style="detail_bg">
            <div class="icon" :style="head_bg"></div>
            <h3 class="name">{{poiInfo.name}}</h3>
            <!-- 星级评价 -->
            <div class="score">
              <app-star :score="poiInfo.wm_poi_score"></app-star>
              <span>{{poiInfo.wm_poi_score}}</span>
            </div>
            <p class="tip">
              {{poiInfo.min_price_tip}}
              <i>|</i>
              {{poiInfo.shipping_fee_tip}}
              <i>|</i>
              {{poiInfo.delivery_time_tip}}
            </p>

            <p class="time">配送时间:{{poiInfo.shipping_time}}</p>

            <div class="discounts" v-if="poiInfo.discounts2">
              <p>
                <img :src="poiInfo.discounts2[0].icon_url" />
                <span>{{poiInfo.discounts2[0].info}}</span>
              </p>
            </div>
          </div>
          <!-- 关闭内容容器 -->
          <div class="close-wrapper">
            <span class="icon-close" @click="closeBulletin"></span>
          </div>
        </div>
      </div>
    </transition>

    <!-- 公告详情 结束 -->
    <!-- 星级评价 -->

    <!-- 关闭内容容器 -->

    <!-- 公告详情 结束 -->
  </div>
</template>

<script>
import Star from "../star/Star";
export default {
  data() {
    return {
      isShow: false
    };
  },
  components: {
    "app-star": Star
  },
  props: {
    // 获取从App.vue中传递的数据
    poiInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    head_pic_url() {
      return "background-image:url(" + this.poiInfo.head_pic_url + ");";
    },
    head_bg() {
      return "background-image:url(" + this.poiInfo.pic_url + ");";
    },
    detail_bg() {
      return "background-image:url(" + this.poiInfo.poi_back_pic_url + ");";
    }
  },
  methods: {
    showBulletin() {
      this.isShow = true;
    },
    closeBulletin() {
      this.isShow = false;
    }
  }
};
</script>

<style lang='less' scoped>
/* 引入标签样式 */
@import url("../../common/css/icon.css");

@color_1: white;
@color_2: #bababc;

.header {
  height: 130px;
  padding-top: 20px;
}

/* 顶部通栏样式 */
.top-wrapper {
  width: 100%;
  height: 31px;
  display: flex;
  line-height: 31px;

  .back-wrapper {
    text-align: center;
    width: 50px;
    height: 31px;
    line-height: 31px;

    span {
      display: inline-block;
      color: @color_1;
    }
  }

  .search-wrapper {
    flex: 1;
    box-sizing: border-box;

    .search-icon {
      width: 28px;
      height: 31px;
      position: absolute;
      background: url(./img/search.png) no-repeat center;
      background-size: 13px 13px;
    }

    .search-bar {
      width: 100%;
      height: 31px;
      border: 0;
      box-sizing: border-box;
      background: #cdcdcc;
      border-radius: 25px;
      padding-left: 28px;
      outline: none;
    }
  }

  .more-wrapper {
    width: 65px;
    height: 24px;
    padding: 7px 15px 0 24px;
    line-height: 24px;

    .spelling-bt {
      width: 30px;
      height: 17px;
      color: @color_1;
      line-height: 17px;
      border: 1px solid white;
      text-align: center;
      float: left;
      text-decoration: none;
      font-size: 10px;
    }

    .more-bt {
      float: right;
      width: 20px;
      height: 24px;
      margin-left: 13px;
      margin-top: 6px;

      .s-radius {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        border: 1px solid white;
        display: block;
        float: left;
        margin-right: 1px;
      }
    }
  }
}

/* 背景图片样式 */
.bg-wrapper {
  width: 100%;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  background-size: 100% 135%;
  background-position: center -12px;
}

/* 主题内容样式 */
.content-wrapper {
  padding: 17px 10px 11px;
  height: 50px;

  .icon {
    width: 50px;
    height: 50px;
    background-size: 135% 100%;
    background-position: center;
    border-radius: 5px;
    float: left;
  }

  .name {
    float: left;
    padding: 18px 0 0 12px;

    h3 {
      font-size: 16px;
      font-weight: bold;
      color: @color_1;
    }
  }

  .collect {
    width: 25px;
    height: 37px;
    float: right;
    text-align: center;
    padding-top: 6px;

    img {
      width: 20px;
      height: 20px;
    }

    span {
      margin-top: 7px;
      color: @color_1;
      font-size: 11px;
    }
  }
}

/* 公告内容样式 */
.bulletin-wrapper {
  height: 16px;
  padding: 0 10px;

  .icon {
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 6px;
  }

  .text {
    font-size: 11px;
    color: @color_1;
    float: left;
    line-height: 16px;
  }

  .detail {
    color: @color_1;
    float: right;
    font-size: 11px;
    line-height: 16px;

    span {
      font-size: 16px;
      line-height: 16px;
      float: right;
    }
  }
}

/* 公告详情样式 */
.bulletin-detail {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(98, 98, 98, 0.8);
  z-index: 999;

  .detail-wrapper {
    width: 100%;
    height: 100%;
    padding: 43px 20px 125px;
    box-sizing: border-box;

    .main-wrapper {
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      border-radius: 10px;
      text-align: center;

      .icon {
        width: 60px;
        height: 60px;
        background-size: 135% 100%;
        background-position: center;
        border-radius: 5px;
        display: inline-block;
        margin-top: 40px;
      }

      .name {
        font-size: 15px;
        color: @color_1;
        margin: 13px;
      }

      .score {
        height: 10px;
        margin-top: 6px;
        text-align: center;
        font-size: 0;

        .star {
          display: inline-block;
          margin-right: 7px;
        }

        span {
          display: inline-block;
          font-size: 10px;
          color: @color_1;
        }
      }

      .tip {
        font-size: 11px;
        color: @color_2;
        margin-top: 8px;

        i {
          margin: 0 7px;
        }
      }

      .time {
        font-size: 11px;
        color: @color_2;
        margin-top: 13px;
      }

      .discounts {
        margin-top: 20px;
        padding: 0 20px;

        p {
          padding-top: 20px;
          border-top: 1px solid #bababc;
        }

        img {
          width: 16px;
          height: 16px;
          vertical-align: middle;
        }

        span {
          font-size: 11px;
          line-height: 16px;
          color: @color_1;
        }
      }
    }

    .close-wrapper {
      padding-top: 20px;
      height: 40px;
      text-align: center;

      span {
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        font-size: 14px;
        color: @color_1;
        display: inline-block;
        background: rgba(118, 118, 118, 0.7);
        border: 1px solid rgba(140, 140, 140, 0.9);
      }
    }
  }
}

/* 过渡效果 */
.bulletin-detail-enter-active,
.bulletin-detail-leave-active {
  transition: 2s all;
}

.bulletin-detail-enter,
.bulletin-detail-leave-to {
  opacity: 0;
}

.bulletin-detail-enter-to,
.bulletin-detail-leave {
  opacity: 1;
}
</style>