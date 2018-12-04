<template>
	<div>
		<div class="header">
			<div class="user-avater">
				<img src="img/user.jpg" alt="" />
			</div>
			<div>
				<p class="user-name" v-text="name"></p>
				<a class="address-link" @click="$router.push(`/address`)">
					<p>我的收获地址</p>
				</a>
			</div>
		</div>
		<div class="content-box">
			<div class="order-info">
				<a>
					<div class="item-text clearfix">
						<p class="order-icon pull-left">
							<img src="../assets/img/icon1.png" alt="" />
						</p>
						<p class="order-title pull-left">我的订单</p>
					</div>
				</a>
			</div>
			<div class="collection-tips">
				<a>
					<div class="item-text clearfix">
						<p class="order-icon pull-left">
							<img src="../assets/img/icon2.png" alt="" />
						</p>
						<p class="order-title pull-left">我的购物车</p>
					</div>
				</a>
				<a>
					<div class="item-text clearfix">
						<p class="order-icon pull-left">
							<img src="../assets/img/icon3.png" alt="" />
						</p>
						<p class="order-title pull-left">我的拼团</p>
					</div>
				</a>
				<a>
					<div class="item-text clearfix">
						<p class="order-icon pull-left">
							<img src="../assets/img/icon4.png" alt="" />
						</p>
						<p class="order-title pull-left">我的钱包</p>
						<p class="coupon-num pull-right">快速提现</p>
					</div>
				</a>
				<a>
					<div class="item-text clearfix">
						<p class="order-icon pull-left">
							<img src="../assets/img/icon1.png" alt="" />
						</p>
						<p class="order-title pull-left">我的优惠卷</p>
					</div>
				</a>
				<a>
					<div class="item-text clearfix">
						<p class="order-icon pull-left">
							<img src="../assets/img/icon1.png" alt="" />
						</p>
						<p class="order-title pull-left">我收藏的商品</p>
					</div>
				</a>
				<a>
					<div class="item-text clearfix">
						<p class="order-icon pull-left">
							<img src="../assets/img/icon1.png" alt="" />
						</p>
						<p class="order-title pull-left">我收藏的店铺</p>
					</div>
				</a>
				<div class="blank"></div>
				<a>
					<div class="item-text clearfix">
						<p class="order-icon pull-left">
							<img src="../assets/img/icon1.png" alt="" />
						</p>
						<p class="order-title pull-left">消息通知</p>
					</div>
				</a>
				<a>
					<div class="item-text clearfix">
						<p class="order-icon pull-left">
							<img src="../assets/img/icon1.png" alt="" />
						</p>
						<p class="order-title pull-left">客服</p>
					</div>
				</a>
				<a>
					<div class="item-text clearfix">
						<p class="order-icon pull-left">
							<img src="../assets/img/icon1.png" alt="" />
						</p>
						<p class="order-title pull-left">意见反馈</p>
					</div>
				</a>
			</div>
			<div class="out-content" @click="islogin">
				<a class="loginout">退出登录</a>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                data(){
                        return {
				name:null
                        }
                },
	        methods:{
                        islogin(){
                                sessionStorage.removeItem('user')
	                        this.$router.push(`/index`)
                        }
	        },
	        created(){
			var user = sessionStorage.getItem('user')
		        this.name = user
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.header
		width: 100%
		height: 1.5rem
		display: flex
		font-size:0.5rem
		.user-avater
			width: 2rem
			height: 2rem
			padding:0.2rem 0 0 0.2rem
			 img
				border-radius: 50%
				width: 0.5rem
				height: 0.5rem
		.user-name
			color: #333
			font-size: 0.5rem
			line-height: 0.5rem
			padding-top: 0.2rem

		.address-link
			p
				color: #333
				font-size: 0.3rem
				margin-top: 0.3rem
				padding-right: 0.1rem

	/*页脚*/
	.footer
		background-color: #fff
		display: flex
		justify-content: space-around
		position: fixed
		bottom: 0
		left: 0
		width: 100%
		height: 0.9rem
		border-top: 1px solid #e5e5e5
		z-index: 500
		.footer-item
			display: block
			height: 100%
			text-align: center
			flex-grow: 1
			color: #666
			background-color: #fff
		.img-warp
			width: 2.45rem
			height: 2.3rem
			margin: 0.3rem auto
			img
				width: 90%
				height: 90%
	/*内容部分*/
	.content-box
		background-color: #f6f6f6
		width: 100%
		padding-bottom: 0.5rem
		overflow: hidden
		.order-info
			width: 100%
			margin-top: 0.1rem
			background-color: #fff
		.item-text
			border-bottom: 1px solid #e5e5e5
			height: 1rem
			line-height 1rem
			background-color: #fff
			position: relative
			padding:0 0 0 0.5rem
			clear:both
		.item-text:after
			content: "";
			display: inline-block
			width: 0.2rem
			height: 0.2rem
			background-size: auto 100%
			vertical-align: middle
			margin-left: 0.1rem
			margin-right: 0.15rem
			position: absolute
			top: 0.15rem
			right: 0rem
		.order-icon
			width: 0.6rem
			height: 0.5rem
		.order-icon
			float:left
			img
				display: block
				width: 0.5rem
				height: 0.5rem
				margin: 0 auto
				text-align: center
				border-radius: 50%
		.order-title
			line-height: 0.5rem
			color: #333
			font-size: 0.4rem
			float:left
			vertical-align middle
		.collection-tips
			margin-top: 0.1rem
		.collection-tips
			a
				display: block
		.coupon-num
			margin-right: 0.3rem
			color: #999
			font-size: 0.2rem
			line-height: 0.5rem
			float:right
			vertical-align middle
		.blank
			width: 100%
			height: 0.2rem
			background-color: #f6f6f6
		.out-content
			margin-top: 0.5rem
			.loginout
				display: block
				width: 80%
				height: 1rem
				line-height: 1rem
				margin: 0 auto
				color: #fff
				background-color: #FF5777
				font-size: 0.4rem
				margin: 0 auto
				text-align: center
				border-radius: 10px
		.shade
			display: none
			position: fixed
			top: 0
			left: 0
			width: 100%
			height: 100%
			background: rgba(0,0,0,0.5)
			z-index: 10000
		.hint
			position: absolute
			top:50%
			left: 50%
			transform: translateX(-50%) translateY(-50%)
			width: 2.5rem
			height: 2rem
			text-align: center
			line-height: 1rem
			background-color: #fff
			border-radius: 5px
</style>