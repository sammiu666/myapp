<template>
  <div class="goods">
    <!-- 分类列表 -->
    <!-- 注册ref特性 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!-- 专场 -->
        <!-- 动态绑定class -->
        <li @click="selectMenu(0)" class="menu-item" :class="{'current':currentIndex === 0}">
          <p class="text">
            <img class="icon" :src="container.tag_icon" v-if="container.tag_icon" />
            {{container.tag_name}}
          </p>
        </li>
        <!-- 其他项 -->
        <li
          @click="selectMenu(index + 1)"
          class="menu-item"
          :class="{'current':currentIndex === index + 1}"
          v-for="(item,index) in goods"
          :key="index"
        >
          <p class="text">
            <!-- 获取菜单分类的icon -->
            <img class="icon" :src="item.icon" v-if="item.icon" />
            {{item.name}}
          </p>
          <!-- 计算某个菜单下商品总数 -->
          <i class="quantity" v-show="calculateQuantity(item.spus)">{{calculateQuantity(item.spus)}}</i>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <!-- 注册ref特性 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场 -->
        <li class="container-list food-list-hook">
          <div v-for="(item,index) in container.operation_source_list" :key="index">
            <img :src="item.pic_url" />
          </div>
        </li>
        <!-- 具体分类 -->
        <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
          <h3 class="title">{{item.name }}</h3>

          <!-- 具体的商品信息 -->
          <ul>
            <li
              v-for="(food,index) in item.spus"
              @click="showDetail(food)"
              :key="index"
              class="food-item"
            >
              <!-- 商品图标 -->
              <!-- 绑定style 在methos中实现 -->
              <div class="icon" :style="head_bg(food.picture)"></div>
              <!-- 商品详情 -->
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <!-- 商品标签 -->
                <img :src="food.product_label_picture" class="product-label" />
                <p class="price">
                  <span class="text">${{food.min_price}}</span>
                  <span class="unit">/{{food.unit }}</span>
                </p>
              </div>
              <div class="cartcontrol-wrapper">
                <!-- 将食物信息传递到子组件 -->
                <app-cart-control :food="food"></app-cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <!-- 向购物车组件传递当前已选中所有商品信息 -->
    <app-shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"></app-shopcart>

    <!-- 商品详情 -->
    <!-- 给子组件绑定ref特性 -->
    <app-product-detail :food="selectFood" ref="foodView"></app-product-detail>
  </div>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";
import ShopCart from "../shopcart/ShopCart";
import CartControl from "../cartcontrol/CartControl";
import ProductDetail from "../productDetail/ProductDetail";
export default {
  data() {
    return {
      container: {},
      goods: [],
      poiInfo: {},
      listHeight: [],
      // menu-wrapper element
      menuScroll: {},
      // foods-wrapper element
      foodScroll: {},
      // 右侧商品项的实时坐标
      scrollY: 0,
      selectFood: {}
    };
  },
  created() {
    axios
      .get("/api/goods")
      .then(res => res.data)
      .then(response => {
        if (response.code === 0) {
          // 获取对应的数据
          this.container = response.data.container_operation_source;
          this.goods = response.data.food_spu_tags;
          this.poiInfo = response.data.poi_info;
          // DOM已经更新
          this.$nextTick(() => {
            // 获取完数据后执行滚动
            this.initScroll();

            // 计算分区的区间高度
            this.calculateHeight();
            // 监听滚动的位置
            // 根据滚动位置确认下标，与左侧对应
            // 通过下标实现点击左侧，右侧滚动到对应位置
          });
        }
      });
  },
  methods: {
    head_bg(imgUrl) {
      return "background-image:url(" + imgUrl + ");";
    },
    // 初始化滚动事件
    initScroll() {
      // 通过$refs拿到DOM元素
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3,
        click: true
      });
      // foodScroll添加监听事件
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    // 计算每个li的页面高度
    calculateHeight() {
      let foodList = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      // 首个菜单高度为0
      this.listHeight.push(height);

      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    // 根据左侧菜单项，右侧商品项滚动到相应位置
    selectMenu(index) {
      let foodList = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let element = foodList[index];
      // 滚动到对应元素的位置
      this.foodScroll.scrollToElement(element, 250);
    },
    // 计算某个菜单项下商品总数
    calculateQuantity(spus) {
      let count = 0;
      spus.forEach(food => {
        if (food.quantity > 0) {
          count += food.quantity;
        }
      });
      return count;
    },
    showDetail(food) {
      this.selectFood = food;

      this.$refs.foodView.showView();
    }
  },
  computed: {
    // 计算当前右侧商品所处位置区间
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        // 获取商品区间范围
        let h1 = this.listHeight[i];
        let h2 = this.listHeight[i + 1];

        // 是否在上述区间内
        // 处理h2越界问题
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
          // 返回找到的下标
          return i;
        }
      }
      // 找不到下标
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(myfoods => {
        myfoods.spus.forEach(food => {
          if (food.quantity > 0) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  components: {
    "app-shopcart": ShopCart,
    "app-cart-control": CartControl,
    "app-product-detail": ProductDetail
  }
};
</script>

<style lang='less'>
@color_1: #333333;
@color_2: #bfbfbf;
@color_3: #fb4e44;
@color_4: white;

.goods {
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  overflow: hidden;
  width: 100%;
}
/* 菜单样式 */
.menu-wrapper {
  flex: 0 0 85px;
  background: #f4f4f4;
  .menu-item {
    position: relative;
    padding: 16px 23px 15px 10px;
    border: 1px solid #e4e4e4;
    .text {
      font-size: 13px;
      color: @color_1;
      line-height: 17px;
      vertical-align: middle;
      /* 文本超出用省略号表示 */
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .icon {
      width: 15px;
      height: 15px;
      vertical-align: middle;
    }
    &:first-child.current {
      margin-top: 1px;
    }
    .quantity {
      position: absolute;
      right: 5px;
      top: 5px;
      background: red;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      font-size: 7px;
      line-height: 13px;
      color: @color_4;
      text-align: center;
    }
  }
  //当前选中
  .menu-item.current {
    background: white;
    font-weight: bold;
    margin-top: -1px;
  }
}
/* 专场样式 */
.foods-wrapper {
  flex: 1;
  .container-list {
    padding: 11px;
    padding-bottom: 0;
    border-bottom: 1px solid #e4e4e4;
    position: relative;
    img {
      width: 100%;
      margin-bottom: 11px;
      border-radius: 5px;
    }
  }
  /* 具体分类商品布局 */
  .food-list {
    padding: 11px;
    .title {
      height: 13px;
      font-size: 13px;
      background: url("./img/btn_yellow_highlighted@2x.png") no-repeat left
        center;
      background-size: 2px 10px;
      padding-left: 7px;
      margin-bottom: 12px;
    }
    .food-item {
      position: relative;
      display: flex;
      margin-bottom: 25px;
      // 图标宽度固定
      .icon {
        flex: 0 0 63px;
        height: 75px;
        background-position: center;
        background-size: 120% 100%;
        background-repeat: no-repeat;
        margin-right: 11px;
      }
      // 内容宽度自适应
      .content {
        flex: 1;
        .name {
          font-size: 16px;
          line-height: 21px;
          color: @color_1;
          margin-bottom: 10px;
          padding-right: 27px;
        }
        .desc {
          font-size: 10px;
          line-height: 19px;
          color: @color_2;
          margin-bottom: 8px;
          /* 超出部分显示省略号 */
          -webkit-line-clamp: 1;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .extra {
          font-size: 10px;
          color: @color_2;
        }
        .product-label {
          height: 15px;
          margin-bottom: 6px;
        }
        .price {
          font-size: 0;
          .text {
            font-size: 14px;
            color: @color_3;
          }
          .unit {
            font-size: 12px;
            color: @color_2;
          }
        }
      }
      .extra {
        .saled {
          margin-right: 14px;
        }
      }
    }
  }
}
/* 添加商品按钮样式 */
.food-list {
  .food-item {
    .cartcontrol-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>