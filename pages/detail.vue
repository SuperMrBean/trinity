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
            <img :src="`http://www.boatng.cn:7002${poster}`" class="swiper-img" alt="">
          </swiper-slide>
        </swiper>
      </client-only>
      <div class="lang">
        <div class="lang_ch" @click="handleChangeLang(1)">中文</div>
        <div class="lang_en" @click="handleChangeLang(2)">English</div>
      </div>
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
              <div v-for="(item,index) in popList" :key="index" class="pop-main-lfet__item" @mouseenter="handlePopTitle(item)" @click="handleClickNavChildren(item)">{{item.name}}</div>
            </div>
            <div class="pop-main-mid">
              <img :src="popImg ? `http://www.boatng.cn:7002${popImg}` : ''" alt="" class="pop-main-mid--img">
            </div>
            <div class="pop-main-right" @click="handleJump">
              <div class="pop-main-right--title">{{popTitle.name}}</div>
              <div class="pop-main-right--icon"></div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="bar"></div>
    <div class="principle">
      <span class="principle__text">{{navFirst}}</span>
      <span class="principle__text">{{navSecond}}</span>
      <span class="principle__text">{{navThird}}</span>
      <span class="principle__text" v-if="navFour">{{navFour}}</span>
    </div>
    <div class="article">
        <div class="article-nav">
          <div class="article-nav-item" v-for="(item,index) in sideList" :key="index">
            <div class="article-nav-item--title" :class="{'noborder':item.isSelect && item.children.length !== 0}" @click="handleFolder(index)">
              <span class="article-nav-item--title__icon" v-if="item.children.length !== 0"></span>
              <span class="article-nav-item--title__icon2" v-if="item.children.length === 0"></span>
              <span class="article-nav-item--title__text" :class="{'select':item.isSelect}">{{item.name}}</span>
            </div>
            <div v-if="item.children.length !== 0">
              <toggle v-for="(children,indexChildren) in item.children" :key="indexChildren">
                <div class="article-nav-item--children" @click="handleFolderChildren(children,index)" v-show="item.isSelect">
                  <div class="article-nav-item--children__text">{{children.name}}</div>
                </div>
              </toggle>
            </div>

          </div>
        </div>
      <div class="article-main">
        <div class="article-main-title">
          {{articleTitle}}
        </div>
        <div class="article-main-line"></div>
        <div class="article-main-text" v-html="content">
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
import { getStatic,getTitle,getArticle } from '@/utils/api'
import toggle from '@/assets/js/toggle.js'
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
        autoplay:false,
        speed:800
      },
      poster:'',
      isShowPop:false,
      popList:[],
      popTitle:{
        name:''
      },
      popImg:'',
      timeout:null,
      navFirst:'',
      navSecond:'',
      navThird:'',
      navFour:'',
      sideList:[],
      content:'',
      articleTitle:''
    }
  },
  async asyncData({ query }){
    try {
      const {data:titleList} = await getTitle({
        is_format:1
      })
      let _titleList = titleList.filter((item)=>{return item.is_deleted === 0})
      let length = _titleList.length
      let lengthLeft = Math.floor(length/2)
      return {
        titleList,
        titleListLeft:_titleList.slice(0,lengthLeft),
        titleListRight:_titleList.slice(lengthLeft,length)
      }
    } catch (error) {
      console.log(error)
    }
  },
  watch: {
    $route(){
      this.init()
    }
  },
  methods: {
    handleChangeLang(type){
      switch(type){
        case 1:
          this.$router.push({
            name:'home',
          })
          break
        case 2:
          this.$router.push({
            name:'home_en',
          })
          break
        default:
          break
      }
    },
    async init(){
      this.navFirst = ''
      this.navSecond = ''
      this.navThird = ''
      this.navFour = ''
      if(this.$route.query.id){
        let _index1 = this.titleList.findIndex((item)=>{
          return item.id === Number(this.$route.query.parentId)
        })
        let _index2 = this.titleList[_index1].children.findIndex((item)=>{
          return item.id === Number(this.$route.query.id)
        })
        this.navFirst = "首页"
        this.navSecond = this.titleList[_index1].name
        this.navThird = this.titleList[_index1].children[_index2].name
        this.poster = this.titleList[_index1].cover
        if(this.titleList[_index1].children[_index2].children.length !== 0){
          this.navFour = this.titleList[_index1].children[_index2].children[0].name
        }
        this.sideList = this.titleList[_index1].children.map((item)=>{
          return {
            ...item,
            isSelect:false
          }
        })
        this.sideList[_index2].isSelect = true
        if(this.sideList[_index2].children.length === 0){
          try {
            const {data:{content}} = await getArticle({
              id:this.sideList[_index2].article_id
            })
            this.content = content
            this.articleTitle = this.sideList[_index2].name
          } catch (error) {
            console.log(error)
          }
        }else{
          try {
            const {data:{content}} = await getArticle({
              id:this.sideList[_index2].children[0].article_id
            })
            this.content = content
            this.articleTitle = this.sideList[_index2].children[0].name
          } catch (error) {
            console.log(error)
          }
        }
      }else{
        let _index = this.titleList.findIndex((item)=>{
          return item.id === Number(this.$route.query.parentId)
        })
        this.navFirst = "首页"
        this.navSecond = this.titleList[_index].name
        this.navThird = this.titleList[_index].children[0].name
        console.log(this.titleList[_index])
        this.poster = this.titleList[_index].cover
        if(this.titleList[_index].children[0].children.length !== 0){
          this.navFour = this.titleList[_index].children[0].children[0].name
        }
        this.sideList = this.titleList[_index].children.map((item)=>{
          return {
            ...item,
            isSelect:false
          }
        })
        this.sideList[0].isSelect = true
        if(this.sideList[0].children.length === 0){
          try {
            const {data:{content}} = await getArticle({
              id:this.sideList[0].article_id
            })
            this.content = content
            this.articleTitle = this.sideList[0].name
          } catch (error) {
            console.log(error)
          }
        }else{
          try {
            const {data:{content}} = await getArticle({
              id:this.sideList[0].children[0].article_id
            })
            this.content = content
            this.articleTitle = this.sideList[0].children[0].name
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    handleClickNav(data){
      if(data.name === '首页'){
        this.$router.push({
          name: 'home'
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
      this.popTitle = data.children[0]
      this.popImg = data.thumb_image
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
    handlePopTitle(data){
      this.popTitle = data
    },
    handleJump(){
      this.$router.push({
        name:'detail',
        query:{parentId:this.popTitle.parent_id,id:this.popTitle.id}
      })
    },
    async handleFolder(index){
      this.sideList.forEach((item,indexValue) => {
        if(index !== indexValue){
          item.isSelect = false
        }else{
          this.sideList[index].isSelect = !this.sideList[index].isSelect
        }
      });
      if(this.sideList[index].children.length === 0){
        try {
          const {data:{content}} = await getArticle({
            id:this.sideList[index].article_id
          })
          this.content = content
          this.navThird = this.sideList[index].name
          this.articleTitle = this.sideList[index].name
          this.navFour = ''
        } catch (error) {
          console.log(error)
        }
      }
    },
    async handleFolderChildren(data,index){
      try {
        const {data:{content}} = await getArticle({
          id:data.article_id
        })
        this.content = content
        this.navThird = this.sideList[index].name
        this.navFour = data.name
        this.articleTitle = data.name
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted(){
    this.init()
  },
  components: {
    toggle
  }
}
</script>

<style lang="scss" scoped>
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
.lang{
  position: absolute;
  top:36px;
  right:70px;
  z-index: 999;
}
.lang_ch{
  display: inline-block;
  padding:6px;
  font-size: 16px;
  border:2px solid #f8b551;
  color:#f8b551;
  margin-right:10px;
  cursor: pointer;
}
.lang_en{
  display: inline-block;
  padding:6px;
  font-size: 16px;
  border:2px solid #f8b551;
  color:#f8b551;
  cursor: pointer;
}
.lang_ch:hover{
  color:#fff
}
.lang_en:hover{
  color:#fff
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
  cursor: pointer;
}
.pop-main-lfet__item{
  color:#dcbb71;
  font-weight: 800;
  font-size:14px;
  padding:8px 0;
  cursor: pointer;
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
}
.principle__text{
  color:#fff;
  font-size:22px;
  padding:0 30px;
  border-right: 2px solid #fff;
}
.article{
  width: 100%;
  background:#fff;
  padding-top:78px;
  text-align: center;
}
.article-nav{
  display: inline-block;
  width:220px;
  background:#e8c473;
  vertical-align: top;
  text-align: left;
  padding:76px 26px;
  box-sizing: border-box;
}
.article-nav-item{
  cursor: pointer;
}
.article-nav-item--title{
  padding:14px 0;
  border-bottom:1px solid #b8881c;
}
.article-nav-item--title__icon{
  display: inline-block;
  width:14px;
  height:7px;
  background: url('~assets/images/icon_folder.png') 0 0 no-repeat;
  background-size:100% 100%;
  vertical-align: top;
  margin-top:5px;
}
.article-nav-item--title__icon2{
  display: inline-block;
  width:6px;
  height:6px;
  background:#805a06;
  border-radius: 6px;
  vertical-align: top;
  margin-top:6px;
  margin-right: 6px;
}
.article-nav-item--title__text{
  font-size:16px;
  color:#805a06;
}
.article-nav-item--title__text:hover{
  color:#fff;
}
.article-nav-item--children{
  padding-left:34px;
}
.article-nav-item--children:last-child{
  border-bottom:1px solid #b8881c;
}
.article-nav-item--children__text{
  font-size:14px;
  color:#805a06;
  line-height: 40px;
}
.article-nav-item--children__text:hover{
  color:#fff;
}
.article-main{
  display: inline-block;
  width:690px;
  margin-left:15px
}
.article-main-title{
  width:100%;
  height:40px;
  background: #e8c473;
  line-height: 40px;
  text-align: left;
  padding-left:20px;
  font-size:20px;
  box-sizing: border-box;
}
.article-main-line{
  width:100%;
  height:1px;
  background:#e8c473;
  margin:20px 0;
}
.article-main-text{
  text-align: left;
  /deep/img{
    width:100%;
  }
  /deep/p{
    font-size:0.1rem;
    line-height: 1.5;
  }
  /deep/.ql-size-small{
    font-size:0.075rem;
  }
  /deep/.ql-size-large{
    font-size:0.15rem;
  }
  /deep/.ql-size-huge{
    font-size:0.25rem;
  }
}
.principle__text:last-child{
  border-right: none;
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
.select{
  color:#16305f;
}
.noborder{
  border-bottom:none;
}
</style>
