<template>
	<div class="footer-wrapper">
		<ul>
			<li :class="{active:curNav ===1}" @click="changeNav(1,'/index')"><a>首页</a></li>
			<li :class="{active:curNav ===2}" @click="changeNav(2,'/category')"><a>分类</a></li>
			<li :class="{active:curNav ===3}" @click="changeNav(3,'/cart');islogin()"><a>购物车</a></li>
			<li :class="{active:curNav ===4}" @click="changeNav(4,'/user');islogin()"><a>个人中心</a></li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                data(){
			return{
			        curNav:0
			}
                },
                methods:{
                        changeNav:function(index,path){
				this.curNav = index;
				this.$router.push(path);
                        },
	                islogin(){
                                var user = sessionStorage.getItem('user')
		                if(user === null){
                                        this.$router.push(`/login`)
		                }
	                }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus"  scoped>
	.footer-wrapper
		height:1rem
		position:fixed
		width:100%
		background-color:white
		bottom:0rem
		ul
			height:100%
			display: flex
			li
				flex:1 1 1px
				display: flex
				flex-direction: column
				align-items: center
				justify-content: center
				&:before
					content: ''
					display: block
					width: 48px
					height:48px
					background-size: 100% 1000%
				&:nth-child(1).active:before
					background-size 100%
					background-image: url('../assets/img/redindex.png')
				&:nth-child(1):before
					background-size 100%
					background-image: url('../assets/img/index.png')
				&:nth-child(2):before
					background-size 100%
					background-image: url('../assets/img/feilei.png')
				&:nth-child(2).active:before
					background-size 100%
					background-image: url('../assets/img/redfenlei.png')
				&:nth-child(3):before
					background-size 100%
					background-image: url('../assets/img/gouwuce.png')
				&:nth-child(3).active:before
					background-size 100%
					background-image: url('../assets/img/gouwuce.png')
				&:nth-child(4):before
					background-size 100%
					background-image: url('../assets/img/geren.png')
				&:nth-child(4).active:before
					background-size 100%
					background-image: url('../assets/img/redgeren.png')

</style>