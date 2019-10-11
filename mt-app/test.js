/**
 * 功能：给定元素查找他的所有兄弟元素，并返回数组
 * @param ele
 * @returns {Array}
 */
function getAllSiblings(ele){
    //定义一个新数组，装所有的兄弟元素，将来返回
    var newArr = [];
    var arr = ele.parentNode.children;
    for(var i=0;i<arr.length;i++){
        //判断：对同级的所有元素节点进行遍历，如果不是传递过来的元素自身，那就是兄弟元素，于是添加到新数组中。
        if(arr[i]!==ele){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}