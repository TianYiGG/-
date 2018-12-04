<template>
	<div v-if="obj !== null">
		<div class="header">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="item in obj.bannerImgs" :key="item._id">
						<img :src="`${$store.state.serverIP}${item}`" >
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div>
				<div class="details-info">
					<span class="details-title" v-text="obj.brief"></span>
				</div>
			</div>
		</div>
		<div class="sku-content">
			<div class="sku-scroll">
				<div class="prpo-rows">
					<p>数量:</p>
					<div class="number">
						<span class="minus" @click="minus">-</span>
						<span class="sum" v-model="info.num" v-text="info.num"></span>
						<span class="add" @click="plus">+</span>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<div>收藏</div>
			<div>小店</div>
			<div @click="submit" class="AddCart">
				<span>加购</span>
			</div>
			<div @click="submit">
				<p v-text="obj.price"></p>
				单独购买
			</div>
			<div @click="submit">
				<p v-text="obj.price/2"></p>
				2人拼团
			</div>
			<div class="sum" v-text="number"></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios';
	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css';

        export default {
	        data(){
	                return {
		                obj:null,
		                list:[],
		                number:null,
		                info:{
		                        _id:'',
			                uid:'',
                                        num:1,
			                goods:{
				                        img:this.img,
					                brief:this.brief,
					                price:this.price,
				                },
		                }
	                }
	        },
	        methods:{
	                plus(){
	                        this.info.num++;
	                },
		        minus(){
	                        if(this.info.num<2) return
	                        this.info.num--;
		        },
	                submit(){
			        var use = sessionStorage.getItem('user');
                                        if(use === null){
                                                alert('请登录');
                                                this.$router.push(`/login`)
                                        }else{ //加入购物车
					var url = `${this.$store.state.serverIP}/login/cart`;
					var timer = new Date();
					var use = sessionStorage.getItem('user')
					axios.post(url,this.info)
						.then(result => result.data)
						.then(result => {
						        this.list = result;
                                                        this.$router.push(`/cart`)
						        console.log(this.list.length);
						})
						.catch(err => console.log(err))

				}
	                }
	        },
                created(){
	                var id=this.$route.params.id;
                        var url = `${this.$store.state.serverIP}/product/getProductById`;
                        axios.post(url,{id:id})
	                        .then(result => result.data)
	                        .then(result => {
	                                this.obj = result[0];
                                        this.info.uid= sessionStorage.getItem('user');
                                        this.info.goods.img = this.obj.bannerImgs[0];
                                        this.info.goods.brief = this.obj.brief;
                                        this.info.goods.price = this.obj.price;
                                        this.info._id = this.obj._id;
	                                this.$nextTick( ()=>{
                                                var mySwiper = new Swiper ('.swiper-container');
                                        })
	                        })
	                        .catch(err => console.log(err))
                        var URL = `${this.$store.state.serverIP}/login/getcart`;
                        var uid = sessionStorage.getItem('user');
                        axios.post(URL,{uid:uid})
                                .then(result => result.data)
                                .then(result => {
                                        this.number=result.length;
                                })
                                .catch(err => console.log(err))
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.sku-content
		padding:0.5rem 0 1.5rem 0
 		.number
			text-align center
			width 0.8rem
			height0.3rem
			border 1px solid #BBBBBB
			line-height 0.3rem
			display flex
			 span
				display: block
				width: 1rem
				font-size: 0.8rem
				margin-right:0.5rem
			 &:nth-child(3)
				color: #FF496C;
			.sum
				font-size: 0.4rem
	.swiper-slide
		img
			width:100%
	.footer
		width: 100%
		height: 1rem
		position fixed
		z-index:1000
		left: 0
		bottom: 0
		display flex
		justify-content space-between
		background-color:#fff
		div
			flex-grow 1
			text-align center
			flex-shrink 0
			&:nth-child(1):before
				content: ''
				display: block
				width: 0.4rem
				height: 0.4rem
				background-image: url(../assets/img/indexicon.png)
				background-size 100%
				margin: 0.1rem auto 5px
			&:nth-child(2):before
				content: ''
				display: block
				width: 0.4rem
				height: 0.4rem
				background-image: url(../assets/img/iconfont.png)
				background-size 100%
				margin: 0.1rem auto 5px
			&:nth-child(3):before
				content: ''
				display: block
				width: 0.4rem
				height: 0.4rem
				background-image: url(../assets/img/scat_44x44.png)
				background-size 100%
				margin: 0.1rem auto 5px
			&:nth-child(4)
				color: #ff5577
				padding 0.2rem 0
			&:nth-child(5)
				color: #fff
				padding 0.2rem 0
				background-color: #ff5577
		.sum
			position: absolute
			left: 3.5rem
			top: 0
			width:0.5rem
			height: 0.5rem
			border-radius:50px
			background-color:#f00
			color: #fff
			text-align center
			line-height 0.5rem
	.details-info
		padding:0 0.3rem
		margin-top: 0.3rem

</style>