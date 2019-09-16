<template>
  <div class="row">
    <!-- 菜单 -->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>尺寸</th>
            <th>价格</th>
            <th>加入</th>
          </tr>
        </thead>
        <!-- 由于不同尺寸的pizza的name值一样可能导致key值重复，这里采用一种巧妙的方式解决 -->
        <tbody v-for="(item,index) in getMenuItems" :key="index">
          <tr>
            <td>
              <strong>{{item.name}}</strong>
            </td>
          </tr>
          <tr v-for="option in item.options" :key="option.size">
            <td>{{option.size}}</td>
            <td>{{option.price}}</td>
            <td>
              <!--点击添加按钮将商品添加到右侧购物车中 -->
              <button @click="addToBasket(item,option)" class="btn btn-sm btn-outline-success">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 购物车 -->
    <div class="col-sm-12 col-md-4">
      <div v-if="baskets.length > 0">
        <table class="table">
          <thead class="thead-default">
            <tr>
              <th>数量</th>
              <th>品种</th>
              <th>价格</th>
            </tr>
          </thead>
          <tbody v-for="(item,index) in baskets" :key="index">
            <tr>
              <td>
                <button @click="decreaseQuantity(item)" class="btn btn-sm">-</button>
                <span>{{item.quantity}}</span>
                <button @click="increaseQuantity(item)" class="btn btn-sm">+</button>
              </td>
              <td>{{item.name}}{{item.size}}寸</td>
              <td>{{item.price * item.quantity}}</td>
            </tr>
          </tbody>
        </table>
        <p>总价:{{getTotalPrice + 'RMB'}}</p>
        <button @click="sumbitOrder" class="btn btn-success btn-block">提交</button>
      </div>
      <div v-else>{{basketText}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baskets: [], //当前购物车内的商品
      basketText: "购物车内没有任何商品"
      //所有商品信息
    };
  },
  computed: {
    getMenuItems() {
      //在vuex中获取数据
      //通过getters获取数据
      return this.$store.getters.getMenuItems;
    },
    //获取总价
    getTotalPrice() {
      let totalPrice = 0;
      // 获得下标
      for (let index in this.baskets) {
        // 根据下标获取购物车中的单个商品
        let individualItem = this.baskets[index];
        totalPrice += individualItem.quantity * individualItem.price;
      }

      return totalPrice;
    }
  },
  methods: {
    //将商品添加至购物车
    addToBasket(item, option) {
      //basket为待添加的商品信息
      let basket = {
        name: item.name,
        size: option.size,
        price: option.price,
        quantity: 1
      };
      //若当前购物车中已经有商品
      if (this.baskets.length > 0) {
        //将待添加的商品信息与购物车中信息进行匹配，返回result为重复的商品信息，长度为1
        let result = this.baskets.filter(product => {
          return product.name === item.name && product.price === option.price;
        });
        //如果能找到重复商品信息，此商品数量自增
        if (result != null && result.length > 0) {
          result[0].quantity++;
        } else {
          //否则将商品添加至购物车
          this.baskets.push(basket);
        }
      } else {
        //若购物车中没有商品，直接将商品添加至购物车
        this.baskets.push(basket);
      }
    },
    decreaseQuantity(item) {
      item.quantity--;
      //商品数量小于等于0，移除出购物车
      if (item.quantity <= 0) {
        this.removeFormBaskets(item);
      }
    },
    //增加商品数量
    increaseQuantity(item) {
      item.quantity++;
    },

    //将商品从购物车中移除
    removeFormBaskets(item) {
      this.baskets.splice(this.baskets.indexOf(item), 1);
    },
    fetchData() {
      //     通过axios获取菜单信息
      this.axios.get("/menu.json").then(response => {
        // 存储到vuex中
        this.$store.commit("setMenuItems", response.data);
      });
    },
    sumbitOrder() {
          alert('订单已经提交')
          this.baskets = []
    }
  },
  created() {
    this.fetchData();
  }
};
</script>