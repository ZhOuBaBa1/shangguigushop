<template>
  <div class="floorBanner">
    <div class="swiper-container" ref="cur">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(carousel, index) in list"
          :key="carousel.id"
        >
          <img :src="carousel.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    //监听BannersList的数据变化
    list: {
      immediate: true,
      handler(newValue, oldValue) {
        //nextTick(): 在下次DOM更新循环结束之后，执行延迟回调，在 修改数据之后 立即使用这个方法，获取更新后的DOM
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true,
            //分页器
            pagination: {
              el: '.swiper-pagination',
              //点击小球的时候切换图片
              clickable: true,
            },
            //前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped></style>
