<template>
  <div class="ratings" ref="ratingView">
    <div class="rating-wrapper">
      <div class="overview">
        <div class="overview-left">
          <div class="comment-score">
            <p class="score">{{ratings.comment_score}}</p>
            <p class="text">商家评分</p>
          </div>
          <div class="other-score">
            <div class="quality-score item">
              <span class="text">口味</span>
              <!-- 向star组件传递quantity _score属性 -->
              <Star :score="ratings.quality_score" class="star"></Star>
              <span class="score"></span>
            </div>
            <div class="pack-score item">
              <span class="text">包装</span>
              <!-- 向star组件传递pack_score属性 -->
              <Star :score="ratings.pack_score" class="star"></Star>
              <span class="score"></span>
            </div>
          </div>
        </div>
        <div class="overview-right">
          <div class="delivery-score">
            <p class="score">{{ratings.delivery_score}}</p>
            <p class="text">配送评分</p>
          </div>
        </div>
      </div>
      <app-split></app-split>
      <div class="content">
        <div class="rating-select" v-if="ratings.tab">
          <span
            class="item"
            :class="{'active':selectType == 2}"
            @click="selectTypeFn(2)"
          >{{ratings.tab[0].comment_score_title}}</span>
          <span
            class="item"
            :class="{'active':selectType==1}"
            @click="selectTypeFn(1)"
          >{{ratings.tab[1].comment_score_title}}</span>
          <span class="item" :class="{'active':selectType==0}" @click="selectTypeFn(0)">
            <img v-show="selectType != 0" src="./img/icon_sub_tab_dp_normal@2x.png" />
            <img v-show="selectType == 0" src="./img/icon_sub_tab_dp_highlighted@2x.png" />
            {{ratings.tab[2].comment_score_title}}
          </span>
        </div>
        <div class="labels-view">
          <span
            class="item"
            v-for="(item,index) in ratings.labels"
            :key="index"
            :class="{'highlight':item.label_star>0}"
          >{{item.content}}{{item.label_count}}</span>
        </div>

        <ul class="rating-list">
          <li v-for="(comment,index) in selectComments" :key="index" class="comment-item">
            <div class="comment-header">
              <img :src="comment.user_pic_url" v-if="comment.user_pic_url" />
              <img src="./img/anonymity.png" v-if="!comment.user_pic_url" />
            </div>
            <div class="comment-main">
              <div class="user">{{comment.user_name}}</div>
              <div class="time">{{formatDate(comment.comment_time)}}</div>
              <div class="star-wrapper">
                <span class="text">评分</span>
                <Star :score="comment.order_comment_score" class="star"></Star>
              </div>
              <div class="content">{{comment.comment}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Split from "../split/Split";
import Star from "../star/Star";
import BScroll from "better-scroll";

const ALL = 2;
const PICTURE = 1;
const COMMENT = 0;

export default {
  data() {
    return {
      ratings: {},
      selectType: ALL
    };
  },
  components: {
    "app-split": Split,
    Star
  },
  created() {
    axios
      .get("/api/ratings")
      .then(res => res.data)
      .then(response => {
        if (response.code === 0) {
          this.ratings = response.data;
          // DOM更新完成
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.ratingView, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      });
  },
  methods: {
    selectTypeFn(type) {
      this.selectType = type;
    },
    // 格式化时间戳
    formatDate(time) {
      let date = new Date(time * 1000);
      let fmt = "yyyy.MM.dd";
      if (/(y+)/.test(fmt)) {
        // 年
        let year = date.getFullYear().toString();
        fmt = fmt.replace(RegExp.$1, year);
      }
      if (/(M+)/.test(fmt)) {
        // 月
        let mouth = date.getMonth() + 1;
        if (mouth < 10) {
          mouth = "0" + mouth;
        }
        fmt = fmt.replace(RegExp.$1, mouth);
      }
      if (/(d+)/.test(fmt)) {
        // 日
        let mydate = date.getDate();
        if (mydate < 10) {
          mydate = "0" + mydate;
        }
        fmt = fmt.replace(RegExp.$1, mydate);
      }
      return fmt;
    }
  },
  computed: {
    // 选择评价类型，分三种:全部、有图片、点评
    selectComments() {
      if (this.selectType == ALL) {
        return this.ratings.comments;
      } else if (this.selectType == PICTURE) {
        let arr = [];

        this.ratings.comments.forEach(comment => {
          if (comment.comment_pics.length) {
            arr.push(comment);
          }
        });
        return arr;
      } else {
        return this.ratings.comments_dp.comments;
      }
    }
  }
};
</script>

<style lang='less'>
@color_1: #ffb000;
@color_2: #666666;
@color_3: #999999;
@color_4: black;
@color_5: #333333;

.ratings {
  position: absolute;
  left: 0;
  top: 191px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

.rating-wrapper {
  .overview {
    padding: 20px 0 18px 0;
    display: flex;

    .overview-left {
      flex: 1;
      padding-left: 26px;

      .comment-score {
        float: left;
        width: 48px;
        text-align: center;
        margin-right: 26px;

        .score {
          font-size: 23px;
          font-weight: 800;
          color: @color_1;
          margin-bottom: 9px;
        }

        .text {
          font-size: 11px;
          color: @color_2;
        }
      }

      .other-score {
        float: left;
        margin-top: 3px;

        .item {
          height: 11px;

          .text {
            font-size: 11px;
            color: @color_2;
            margin-left: 11px;
            float: left;
            line-height: 20px;
          }
        }

        .star {
          float: left;
          margin-left: 11px;
        }

        .score {
          font-size: 11px;
          color: @color_1;
        }

        .quality-score {
          margin-bottom: 9px;
        }
      }
    }

    .overview-right {
      flex: 0 0 100px;
      text-align: center;
      border-left: 1px solid #9d9d9d;

      .delivery-score {
        .score {
          font-size: 19px;
          font-weight: 500;
          color: @color_3;
          margin-bottom: 10px;
          margin-top: 3px;
        }

        .text {
          font-size: 11px;
          color: @color_3;
        }
      }
    }
  }

  .content {
    padding: 16px;

    .rating-select {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      font-size: 0;
      border: 1px solid #ffb000;
      border-right: 0;
      margin-bottom: 11px;
      border-radius: 3px;

      .item {
        flex: 1;
        display: inline-block;
        height: 33px;
        line-height: 33px;
        font-size: 14px;
        text-align: center;
        border-right: 1px solid #ffb000;
        box-sizing: border-box;
        color: @color_1;

        &:last-child {
          img {
            height: 14px;
            vertical-align: middle;
          }
        }
      }

      .item.active {
        background: #ffb000;
        color: @color_4;
      }
    }

    .labels-view {
      margin-bottom: 14px;

      .item {
        display: inline-block;
        height: 27px;
        line-height: 27px;
        padding: 0 10px;
        font-size: 12px;
        background: #f4f4f4;
        margin-right: 6px;
        margin-bottom: 6px;
        border-radius: 3px;
        color: @color_3;
      }

      .item.highlight {
        color: @color_4;
      }
    }

    .rating-list {
      .comment-item {
        display: flex;
        width: 100%;
        padding: 16px 16px 16px 0;
        border-bottom: 1px solid #f4f4f4;
        box-sizing: border-box;

        .comment-header {
          width: 35px;
          margin-right: 11px;

          /* 设置图片垂直居中 */
          /* display: flex;
          justify-content: center;
          align-items: center; */
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
        }

        .comment-main {
          flex: 1;

          .user {
            width: 50%;
            float: left;
            font-size: 11px;
            color: @color_5;
          }

          .time {
            width: 50%;
            float: right;
            text-align: right;
            font-size: 9px;
            color: @color_2;
          }

          .star-wrapper {
            float: left;
            margin-top: 12px;
            margin-bottom: 15px;
            width: 100%;

            .text {
              color: @color_3;
              font-size: 15px;
              float: left;
            }

            .star {
              float: left;
              margin-left: 7px;
            }
          }
        }
      }
    }
  }
}
</style>