// 星级评价组件
<template>
  <div class="star">
    <!-- 根据 -->
    <span class="star-item" v-for ="(item,index) in countStar" :key="index" :class="item"></span>
  </div>
</template>

<script>
// 星星长度
const LENGTH = 5

// 星星状态
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    // 计算星级
    countStar() {
      let result = []

      let score = Math.floor(this.score * 2)/2

      // 半星
      let hasDecimal = score % 1 !==0

      // 全星
      let integer = Math.floor(score)

      // 遍历全星
      for(let i=0;i< integer; i++) {
        result.push(CLS_ON)
      }

      // 处理半星
      if(hasDecimal) {
        result.push(CLS_HALF)
      }

      while(result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }

  }
}
</script>

<style>
	.star-item{
		display: inline-block;
		width: 10px;
		height: 10px;
		margin-right: 3px;
		background-repeat: no-repeat;
		background-size: 10px 10px;
	}
	.star-item:last-child{
		margin-right: 0;
  }
  /* 根据不同的星级添加不同的背景图片 */
  .on {
    background-image: url('./img/star24_on@2x.png')
  }

  .half{
    background-image: url('./img/star24_half@2x.png')
  }

  .off {
    background-image: url('./img/star24_off@2x.png')
  }

</style>