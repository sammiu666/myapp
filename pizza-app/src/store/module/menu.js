const state = {
  //设置菜单属性
  menuItems:{}
}

const getters = {
  //获取属性的状态
  getMenuItems: state => state.menuItems
}

const mutations = {
  //更改属性状态
  setMenuItems(state,data) {
    state.menuItems = data;
  },
  //将需要删除的菜单项从menuItems中删除
  removeMenuItem(state,data) {
    state.menuItems.forEach((item,index) => {
      if(item == data) {
        state.menuItems.splice(index,1)
      }
    })
  },
  //将新添加的pizza Push到menuItems中
  pushToMenuItems(state,data) {
    state.menuItems.push(data)
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}