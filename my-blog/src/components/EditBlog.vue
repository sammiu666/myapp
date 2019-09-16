<template>
    <div id="edit-blog">
        <h2>编辑博客</h2>
        <form v-if="!submmited">
            <label for="">博客标题</label>
            <input type="text" v-model="blog.title" required />
            <label for="">博客内容</label>
            <textarea v-model="blog.content"></textarea>

        <div id="checkboxes">
            <label >Vue.js</label>
            <input type="checkbox" value="Vue.js" v-model="blog.categories">
            <label >React.js</label>
            <input type="checkbox" value="React.js" v-model="blog.categories">
            <label >Node.js</label>
            <input type="checkbox" value="Node.js" v-model="blog.categories">
            <label >Angular4</label>
            <input type="checkbox" value="Angular4.js" v-model="blog.categories">
        </div>
        <label >作者:</label>
        <select v-model="blog.author">
            <option v-for="author in authors" v-bind:key="author">
                {{author}}
            </option>
        </select>
        <button v-on:click.prevent="update">编辑博客</button>
        </form>
        <!-- 如果提交成功 -->
        <div v-if="submmited">
            <h3>您的博客修改成功！</h3>
        </div>
        <div id="preview">
            <h3>博客总览</h3>
            <p>博客标题: {{blog.title}}</p>
            <p>博客内容:</p>
            <p>{{blog.content}}</p>
            <p>博客分类:</p>
            <ul>
                <li v-for="category in blog.categories" v-bind:key="category">
                    {{category}}
                </li>
            </ul>
            <p>作者:{{blog.author}}</p>
     
        </div>
    </div>
</template>

<script>
    export default {
        name: 'add-blog',
        data() {
            return {
                id:this.$route.params.id,
                blog: {},
                authors: ['sammiu','Lucy','Tom'],
                submmited: false
            }
        },
        methods: {
            // 通过put方法将数据传输到firebase数据库上，回调函数输出相应的数据。
            update() {
                this.$axios.put('/posts/' + this.id + '.json',this.blog)
                .then(data => {
                    console.log(data);
                    this.submmited = true;
                })
            },
            fetchData() {
                // console.log(this.id);
                this.$axios.get('/posts/' + this.id + '.json')
                          .then(response => {
                              this.blog = response.data;
                          })
            }
        },
        created() {
            this.fetchData();
        }
    }
</script>

<style lang="css" scoped>
#add-blog *{
    box-sizing: border-box;
}

#add-blog {
    margin: 20px auto;
    max-width: 600px;
    padding: 20px;
}

label {
    display: block;
    margin: 20px 0 10px;
}

input[type="text"],textarea.select {
    display: block;
    width: 100%;
    padding: 8px; 
}

textarea {
    height: 150px;
    width: 200px;
}

#checkboxes label {
    display: inline-block;
    margin-top: 0;
}

#checkboxes input {
    display: inline-block;
    margin-left: 10px;
}

button {
    display: block;
    margin: 20px 0;
    background: lightgreen;
    color: #fff;
    border: 0;
    padding: 10px;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer; 
}
#preview {
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}

h3 {
    margin-top: 10px;
}
li {
    list-style: none;
}

</style>