<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <add-new-pizza></add-new-pizza>
    </div>
    <div class="col-sm-12 col-md-4">
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table">
        <thead class="table table-default">
          <tr>
            <th>品种</th>
            <th>删除</th>
          </tr>
        </thead>
        <!-- 现有菜单展示 -->
        <tbody v-for="item in getMenuItems" :key="item.id">
          <tr>
            <td>{{item.name}}</td>
            <td>
              <button @click="deletePizza(item)" class="btn btn-danger btn-sm">&times;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import NewPizza from "../components/NewPizza";
import axios from "axios";
export default {
  data() {
    return {
      name: "Sam"
    };
  },
  //组件内守卫
  //   beforeRouteEnter: (to, from, next)=> {
  //       next(vm => {
  //             alert('Hello ' + vm.name)
  //       })
  //   }
  // beforeRouteLeave(to, from, next) {
  //   if (confirm("确定离开吗") == true) {
  //     next();
  //   } else {
  //     next(false);
  //   }
  // },
  components: {
    "add-new-pizza": NewPizza
  },
  created() {
    this.axios
      .get("/menu.json")
      .then(response => response.data)
      .then(data => {
        let menuArray = [];
        for (let key in data) {
          // 给不同的pizza设置id，这个id为数据库中自动生成的id
          data[key].id = key;
          menuArray.push(data[key]);
        }
        //数据同步
        this.$store.commit("setMenuItems", menuArray);
      });
  },
  computed: {
    getMenuItems: {
      //在vuex中获取数据
      get() {
        //通过getters获取数据
        return this.$store.getters.getMenuItems;
      },
      set() {}
    }
  },
  methods: {
    deletePizza(item) {
      this.axios.delete("/menu/" + item.id + "/.json").then(data => {
        this.$store.commit("removeMenuItem", item);
      });
    }
  }
};
</script>