<template>
  <div class="container">
    <div class="swiper">
      <client-only>
        <swiper
          ref="carousel"
          class="swiper-wrap"
          :options="swiperOptions"
        >
          <swiper-slide v-for="(item,index) in bannerList" :key="index">
            <img :src="`http://www.boatng.cn:7002${item.path}`" class="swiper-img" alt="">
          </swiper-slide>
        </swiper>
      </client-only>
      <div class=nav>
        <div class="nav-left">
          <div v-for="(item,index) in titleListLeft" :key="index" class="nav-item" @mouseenter="handleShowPop(true,item)" @mouseleave="handleShowPop(false,item)" @click="handleClickNav(item)">{{item.name}}</div>
        </div>
        <div class="nav-logo"></div>
        <div class="nav-right">
          <div v-for="(item,index) in titleListRight" :key="index" class="nav-item" @mouseenter="handleShowPop(true,item)" @mouseleave="handleShowPop(false,item)" @click="handleClickNav(item)">{{item.name}}</div>
        </div>
      </div>
      <div class="title">
        <span class="title--text">
          Trinity International Kindergarten
        </span>
      </div>
      <transition name="fade">
        <div @mouseenter="handleStayPop(true)" @mouseleave="handleStayPop(false)" class="pop" v-show="isShowPop">
          <div class="pop-main">
            <div class="pop-main-left">
              <div v-for="(item,index) in popList" :key="index" class="pop-main-lfet__item" @mouseenter="handlePopTitle(item.name)" @click="handleClickNavChildren(item)">{{item.name}}</div>
            </div>
            <div class="pop-main-mid">
              <img src="@/assets/images/banner.jpg" alt="" class="pop-main-mid--img">
            </div>
            <div class="pop-main-right">
              <div class="pop-main-right--title">{{popTitle}}</div>
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
      <div class="video-item">
        <img class="video-item--img" src="@/assets/images/video.jpg" alt="">
        <div class="video-item--title">
          <span class="video-item--title__text">Our Chefs</span>
        </div>
        <div class="video-item__icon"></div>
      </div>
      <div class="video-item">
        <img class="video-item--img" src="@/assets/images/video.jpg" alt="">
        <div class="video-item--title">
          <span class="video-item--title__text">Our Chefs</span>
        </div>
        <div class="video-item__icon"></div>
      </div>
      <div class="video-item">
        <img class="video-item--img" src="@/assets/images/video.jpg" alt="">
        <div class="video-item--title">
          <span class="video-item--title__text">Our Chefs</span>
        </div>
        <div class="video-item__icon"></div>
      </div>
      <div class="video-item">
        <img class="video-item--img" src="@/assets/images/video.jpg" alt="">
        <div class="video-item--title">
          <span class="video-item--title__text">Our Chefs</span>
        </div>
        <div class="video-item__icon"></div>
      </div>
      <div class="video-item">
        <img class="video-item--img" src="@/assets/images/video.jpg" alt="">
        <div class="video-item--title">
          <span class="video-item--title__text">Our Chefs</span>
        </div>
        <div class="video-item__icon"></div>
      </div>
    </div>
    <div class="introduction">
      <div class="introduction-main">
        <div class="introduction-main-left">
          <div class="introduction-main-left__img"></div>
          <div class="introduction-main-left__name">
            <span class="introduction-main-left__name--text1">Elaine Whelen</span>
            <br>
            <span class="introduction-main-left__name--text2">Director of Education</span>
          </div>
        </div>
        <div class="introduction-main-right">
          <div class="introduction-main-right__text">Ms. Whelen是圣心国际幼稚园的创校校长。她有30多年国际教育的经验，是华南最知名的国际教育者之一。在担任广州裕达隆国际学校校长（2007-2014）和爱莎国际学校创校校长(2014-2017)之前，她是伦敦国际学校校长(2001-2005)和乌干达Kabira国际学校校长(2005-2007)。</div>
          <div class="introduction-main-right__btn">更多 ></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-item1">
        <div>广州市天河区珠江新城花城大道663号</div>
        <div class="footer-item1__text">T / +86(20)8558 3287</div>
        <div>E / www.trinitygz.com</div>
      </div>
      <div class="footer-item2"></div>
      <div class="footer-item3">
        <div class="footer-item3--code"></div>
        <span class="footer-item3--text">扫描二维码</span>
        <br>
        <span class="footer-item3--text">关注我们</span>
      </div>
    </div>
    <div class="author">
      <span class="author__text">粤ICP备05003387号 Powered by XOOPS!</span>
    </div>
  </div>
</template>

<script>
import { getStatic,getTitle } from '@/utils/api'
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
      popList:[],
      popTitle:'',
      timeout:null
    }
  },
  async asyncData( ){
    const {data:bannerList} = await getStatic({
      type: 'banner'
    })
    const {data:videoList} = await getStatic({
      type: 'video'
    })
    const {data:titleList} = await getTitle({
      is_format:1
    })
    let _titleList = titleList.filter((item)=>{return item.is_deleted === 0})
    let length = _titleList.length
    let lengthLeft = Math.floor(length/2)
    return {
      bannerList,
      videoList,
      titleListLeft:_titleList.slice(0,lengthLeft),
      titleListRight:_titleList.slice(lengthLeft,length)
    }
  },
  methods: {
    handleClickNav(data){
      if(data.name === '首页'){
        this.$router.push({
          name: 'index'
        })
      }else if(data.children.length === 0){
        return
      }else{
        this.$router.push({
          name:'detail',
          query:{parentId:data.id,id:null}
        })
      }
    },
    handleClickNavChildren(data){
      this.$router.push({
        name:'detail',
        query:{parentId:data.parent_id,id:data.id}
      })
    },
    handleShowPop(flag,data){
      if(this.timeout){
        clearTimeout(this.timeout)
      }
      if(data.children.length === 0){
        this.isShowPop = false
        return 
      }
      this.popList = data.children
      this.popTitle = data.children[0].name
      if(flag){
        this.isShowPop = flag
      }else{
        this.timeout = setTimeout(()=>{
          this.isShowPop = flag
        },2000)
      }
    },
    handleStayPop(flag){
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
    },
    handlePopTitle(title){
      this.popTitle = title
    }
  },
  async mounted(){
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
  font-size:0;
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
  font-weight: 800;
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
  font-weight: 800;
  font-size:14px;
  padding:8px 0;
}
.pop-main-lfet__item:hover{
  color:#fff;
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
  font-weight: 800;
  color:#fff;
}
.principle-line2{
  font-size:14px;
  font-weight: 800;
  color:#fff;
  margin-top:10px;
}
.video{
  width:100%;
  height:360px;
  background:#fff;
  padding-top:67px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.video-item{
  position: relative;
  width: 182px;
  height:324px;
  margin-right:20px;
  box-shadow: 4px 4px 6px 0px #98a3b6;
  border-radius: 4px;
  font-size:0;
}
.video-item:last-child{
  margin-right:0;
}
.video-item--img{
  width:100%;
  height:248px;
  object-fit: contain;
}
.video-item--title{
  width:100%;
  height:76px;
  background:#dcbb71;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-item--title__text{
  font-size:20px;
  color:#16305f;
  font-weight: 800;
}
.video-item__icon{
  position: absolute;
  width:60px;
  height:60px;
  background:url('~assets/images/play.png');
  background-size:100% 100%;
  left:50%;
  transform: translateX(-50%);
  top:100px;
}
.introduction{
  width:100%;
  height:470px;
  background:#16305f;
  display: flex;
  justify-content: center;
}
.introduction-main{
  width:61%;
  height:410px;
  background:url('~assets/images/square.png');
  background-size:100% 100%;
  margin-top:50px;
}
.introduction-main-left{
  display: inline-block;
  margin-top:68px;
  margin-left:63px;
  width:180px;
}
.introduction-main-left__img{
  width:180px;
  height:180px;
  background:url('~assets/images/director.jpg');
  background-size:100% 100%;
  border-radius: 100%;
}
.introduction-main-left__name{
  text-align: center;
}
.introduction-main-left__name--text1{
  display: inline-block;
  margin-top:24px;
  color:#fff;
  font-size:18px;
  font-weight: 800;
}
.introduction-main-left__name--text2{
  display: inline-block;
  margin-top:10px;
  color:#fff;
  font-size:12px;
  font-weight: 800;
}
.introduction-main-right{
  display: inline-block;
  width:400px;
  height:210px;
  vertical-align: top;
  margin-top:62px;
  margin-left:84px;
  padding-top:20px;
  border-top:1px solid #dcbb71;

}
.introduction-main-right__text{
  font-size:16px;
  color:#fff;
  line-height: 30px;
  text-align: justify;
}
.introduction-main-right__btn{
  display: inline-block;
  font-size:16px;
  padding:4px 18px;
  border:1px solid rgb(213, 210, 210);
  border-radius: 16px;
  color:#fff;
  margin-top:22px;
}
.footer{
  width:100%;
  height:340px;
  background:url('~assets/images/footer.jpg');
  background-size:100% 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding:0 100px;
  box-sizing: border-box;
}
.footer-item1{
  font-size:14px;
  color:#fff;
  border-top:1px solid #fff;
  border-bottom:1px solid #fff;
  width:280px;
  padding:20px 0;
}
.footer-item1__text{
  margin:20px 0;
}
.footer-item2{
  width:280px;
  height:200px;
  background:url('~assets/images/map.png') 0 0 no-repeat;
  background-size:100% 100%;
}
.footer-item3{
  text-align: center;
}
.footer-item3--code{
  width:150px;
  height:150px;
  background:url('~assets/images/qrcode.png') 0 0 no-repeat;
  background-size:100% 100%;
  margin-bottom:20px;
}
.footer-item3--text{
  font-size:14px;
  color:#fff;
  line-height: 30px;
}
.author{
  width:100%;
  height:44px;
  background:#16305f;
  display: flex;
  justify-content: center;
  align-items: center;
}
.author__text{
  color:#fff;
  font-size:15px;
  font-weight: 800;
}
</style>
