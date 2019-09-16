<template>
<!-- theme为自己定义的一个指令，并且添加了一个参数column -->
  <div v-theme:column="'narrow'" id="show-blogs">
    <h1>博客总览</h1>
    <input type="search" v-model="search" placeholder="搜索">
    <div  v-for="blog in filterBlogs" class="single-blog">
      <!-- 将路由参数绑定 -->
      <router-link v-bind:to="'/blog/' + blog.id">
      <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
      </router-link>
      <article>{{blog.content | snippet}}</article>
    </div>
  </div>
</template>

<script>
export default {
  name: "show-blogs",
  data() {
    return {
      blogs: [],
      search: ''
    };
  },
  created() {
    //通过axios得到数据库中的数据
      this.$axios.get('/posts.json')
      .then(blog =>{
        return blog.data;
      })
      .then(data => {
        let blogsArray = [];
        for(let key in data) {
          // 给每个blog设置一个id,方便匹配
          data[key].id = key;
          blogsArray.push(data[key]);
        }
        this.blogs = blogsArray;
      });
  },
  computed: {
    // 通过过滤器来根据search框中的内容来匹配相应的blog内容,
    // 返回的是一个已经过滤的数组
    filterBlogs: function() {
      return this.blogs.filter(blog => {
        return blog.title.match(this.search);
      })
    }
  },
  // 局部注册过滤器以及钩子函数
  filters: { 
    toUppercase(value) {
      return value.toUpperCase()
    },
    snippet(value) {
      return value.slice(0,100) + "...";
    }
  },
  directives: {
    rainbow: { 
      bind(el,binding,vnode) {
        el.style.color = "#" + Math.random().toString(16).slice(2,8);
      }
    },
    theme: {
      bind(el,binding,vnode) {
        if(binding.value === 'wide') { 
          el.style.maxWidth = "1260px";
        } else if(binding.value === 'narrow') {
          el.style.maxWidth = '560px';
        }

        if(binding.arg === 'column') {
          el.style.background = '#6677cc';
          el.style.padding = '20px';
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
}

.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #aaa;
}

#show-blogs a {
  color: #444;
  text-decoration: none;
}

input[type="search"] {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>