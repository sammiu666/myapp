const state = {
  currenUser:null,
  isLogin:false 
}

const getters = {
  //获取属性的状态
  getCurrenUser: state => state.currenUser,
  getIsLogin: state => state.isLogin
}

const mutations = {
   //更改用户的状态信息
   userStatus(state,user) {
    //如果登录成功
    if(user) {
      state.currenUser = user 
      state.isLogin = true
    } else {
      state.currenUser = null
      state.isLogin = false
    }
  }
}

const actions = {
  //应用mutations
  setUser({commit},user) {
    commit('userStatus',user)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}