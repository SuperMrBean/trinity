<template>
  <div class="container">
    <div class="swiper">
      <client-only>
        <swiper
          ref="carousel"
          class="swiper-wrap"
          :options="swiperOptions"
        >
          <swiper-slide>
            <img src="@/assets/images/pic1.jpg" class="swiper-img" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="@/assets/images/pic1.jpg" class="swiper-img" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="@/assets/images/pic1.jpg" class="swiper-img" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="@/assets/images/pic1.jpg" class="swiper-img" alt="">
          </swiper-slide>
        </swiper>
      </client-only>
      <div class=nav>
        <div class="nav-left">
          <div class="nav-item" @mouseenter="handleShowPop(true)" @mouseleave="handleShowPop(false)">首页</div>
          <div class="nav-item" @mouseenter="handleShowPop(true)" @mouseleave="handleShowPop(false)">关于我们</div>
          <div class="nav-item" @mouseenter="handleShowPop(true)" @mouseleave="handleShowPop(false)">什么让我们与众不同</div>
          <div class="nav-item" @mouseenter="handleShowPop(true)" @mouseleave="handleShowPop(false)">课程</div>
          <div class="nav-item" @mouseenter="handleShowPop(true)" @mouseleave="handleShowPop(false)">员工</div>
        </div>
        <div class="nav-logo"></div>
        <div class="nav-right">
          <div class="nav-item" @mouseenter="handleShowPop(true)" @mouseleave="handleShowPop(false)">社区</div>
          <div class="nav-item" @mouseenter="handleShowPop(true)" @mouseleave="handleShowPop(false)">招生部</div>
          <div class="nav-item" @mouseenter="handleShowPop(true)" @mouseleave="handleShowPop(false)">联系我们</div>
          <div class="nav-item" @mouseenter="handleShowPop(true)" @mouseleave="handleShowPop(false)">新闻</div>
        </div>
      </div>
      <div class="title">
        <span class="title--text">
          Trinity International Kindergarten
        </span>
      </div>
      <transition name="fade">
        <div @mouseenter="handleShowPop(true)" @mouseleave="handleShowPop(false)" class="pop" v-show="isShowPop">
          <div class="pop-main">
            <div class="pop-main-left">
              <div class="pop-main-lfet__item">我们的使命</div>
              <div class="pop-main-lfet__item">校长欢迎词</div>
              <div class="pop-main-lfet__item">文化</div>
              <div class="pop-main-lfet__item">国际教育</div>
              <div class="pop-main-lfet__item">参观学校</div>
              <div class="pop-main-lfet__item">学校时间表</div>
              <div class="pop-main-lfet__item">校历</div>
            </div>
            <div class="pop-main-mid">
              <img src="@/assets/images/banner.jpg" alt="" class="pop-main-mid--img">
            </div>
            <div class="pop-main-right">
              <div class="pop-main-right--title">我们的使命</div>
              <div class="pop-main-right--icon"></div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="bar"></div>
    <div class="principle">
      <div class="principle-line1">我们的使命</div>
      <div class="principle-line2">用圣心培育每一个孩子，让他们成为具有创造性，充满爱心和热情的学习者。</div>
    </div>
    <div class="video">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOptions: {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
        autoplay:true,
        speed:800
      },
      isShowPop:false,
      timeout:null
    }
  },
  methods: {
    handleShowPop(flag){
      if(this.timeout){
        clearTimeout(this.timeout)
      }
      if(flag){
        this.isShowPop = flag
      }else{
        this.timeout = setTimeout(()=>{
          this.isShowPop = flag
        },2000)
      }
    }
  },
  components: {
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.swiper{
  height: auto;
  position: relative;
}
.swiper-wrap{
  width:100%;
  height:542px;
  font-size:0;
}
.swiper-slide {
  text-align: center;
  font-size: 0px;
  font-weight: 700;
  background-color: #eee;
}
.swiper-img{
  width:100%;
  height: 100%;
  object-fit: cover;
}
.nav{
  display: flex;
  justify-content: center;
  position: absolute;
  top:76px;
  left:0;
  z-index:999;
  width:100%;
  height: 38px;
}
.title{
  background:url('~assets/images/title_background.png');
  width: 680px;
  height:60px;
  background-size:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left:50%;
  top:390px;
  transform: translateX(-50%);
  z-index: 999;
}
.title--text{
  font-size:38px;
  font-weight: 800;
  color:#dcbb71;
}
.nav-left{
  width:43%;
  height:38px;
  background:url('~assets/images/nav_left.png') 0 0 no-repeat;
  margin-right:20px;
  display:flex;
  justify-content: space-around;
  padding:0 20px;
  box-sizing: border-box;
}
.nav-right{
  width:43%;
  height:38px;
  background:url('~assets/images/nav_right.png') 100% 0 no-repeat;
  margin-left:20px;
  display:flex;
  justify-content: space-around;
  padding:0 20px;
  box-sizing: border-box;
}
.nav-logo{
  position:absolute;
  width:86px;
  height:106px;
  background:url('~assets/images/logo.png');
  background-size:100%;
  background-repeat: no-repeat;
  top:-60px;
}
.nav-item{
  display: inline-block;
  line-height: 40px;
  color:#dcbb71;
  font-size:15px;
  padding:0 10px;
  box-sizing: border-box;
  cursor: pointer;
}
.nav-item:hover{
  color:#fff;
}
.pop{
  width:100%;
  height:360px;
  background:rgba(20,41,78,0.85);
  position: absolute;
  top:0;
  z-index: 999;
  top:140px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pop-main{
  width:87%;
  height:280px;
  background:#14294e;
  display:flex;
}
.pop-main-left{
  width:30%;
  height:280px;
  text-align: left;
  padding-left:40px;
  padding-top:5px;
  box-sizing: border-box;
}
.pop-main-mid{
  width:40%;
  height:280px;
  box-sizing: border-box;
}
.pop-main-right{
  width:30%;
  height: 280px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.pop-main-lfet__item{
  color:#dcbb71;
  font-size:14px;
  padding:8px 0;
}
.pop-main-mid--img{
  width:100%;
  height:280px;
}
.pop-main-right--title{
  font-size:20px;
  color:#dcbb71;
  font-weight:800;
}
.pop-main-right--icon{
  width:33px;
  height:33px;
  background:url('~assets/images/icon_array_round.png');
  background-size:100%;
  margin-top:10px;
}
.bar{
  width:100%;
  height:70px;
  background:#dcbb71;
}
.principle{
  width:62%;
  height:84px;
  background:#16305f;
  position: absolute;
  transform: translateX(-50%);
  left:50%;
  top:570px;
  box-shadow: 0 0 10px 0px #16305f;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.principle-line1{
  font-size:18px;
  color:#fff;
}
.principle-line2{
  font-size:14px;
  color:#fff;
  margin-top:10px;
}
.video{
  width:100%;
  height:400px;
  background:#fff;
}
</style>
