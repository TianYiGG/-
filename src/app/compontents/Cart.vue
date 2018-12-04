<template>
	<div>
		<div class="container">
			<div class="head">
				<div class="head-frist"></div>
				<div class="head-content">购物车</div>
				<div class="head-last">编辑</div>
			</div>
			<div class="content">
				<div class="goods" v-for="(item,index) in clist" :key="item._id">
					<div class="good-img">
						<input type="checkbox" v-model="item.checked" @click="item.checked = $event.target.checked">
						<img :src="`${$store.state.serverIP}${item.goods.img}`">
					</div>
					<div class="good-info">
						<div class="tiem" v-text="item.time"></div>
						<p v-text="item.goods.brief"></p>
						<div>
							<span>¥</span>
							<span v-text="item.goods.price"></span>
							<span class="remove" @click="remove(item._id,index)">删除</span>
						</div>
					</div>
				</div>
				<div class="emptycart" v-show="isShow" v-if="!clist.length>0">
					<img src="../assets/img/cartbg.png">
					<p>你的购物车空空如也</p>
					<span>去逛逛</span>
				</div>
				<div class="product-list" v-show="isShow" v-if="!clist.length>0">
					<div>猜你喜欢</div>
					<ul>
						<li v-for="item in list" :key="item._id"  @click="$router.push(`/details/${item._id}`)">
							<img :src="`${$store.state.serverIP}${item.bannerImgs[0]}`">
							<p class="brief" v-text="item.brief"></p>
							<div class="wrap">
								<span class="name" v-text="item.name"></span>
								<span class="price">
									<i>¥</i>
									<em v-text="item.price"></em>
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="footer" v-for="item in clist" :key="item._id">
				<div class="foot-one">
					<input type="checkbox" :checked="allChecked" @click="handleChecked(item)">
					<label>全选</label><span v-text="`${getNum}`"></span>
				</div>
				<div class="foot-tow" v-text='`${getPrice}`'>¥</div>
				<div class="foot-three">去结算</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import axios from 'axios';

        export default {
                data(){
                        return{
                                list:[],
                                curCid:0,
	                        isShow:true,
				clist:[],
	                        allChecked:false,
	                        id:'',

                        }
                },
	        methods:{
                        remove(_id,index){ //删除商品
                                var url = `${this.$store.state.serverIP}/login/removecart`;
                                axios.post(url,{_id:_id})
                                        .then(result => result.data)
                                        .then(result => {
                                                if(result.ok === 1){
                                                          this.clist.splice(index,1);
                                                        this.$router.go(0);
                                                }
                                        })
                                        .catch(err => console.log(err))

                        },
                        handleChecked(item) {
                                //全选
                                if(this.allChecked === false) {
                                        for(var i = 0; i < this.clist.length; i++) {
                                                var item = this.clist[i];
                                                item.checked = true;
                                        }
                                } else {  //取消全选
                                        for(var j = 0; j < this.clist.length; j++) {
                                                var item = this.clist[j];
                                                item.checked = false;
                                        }
                                }
                                this.allChecked = !this.allChecked;
                        }
	        },
                created(){ //渲染购物车
	                var URL = `${this.$store.state.serverIP}/login/getcart`;
                        var uid = sessionStorage.getItem('user');
			axios.post(URL,{uid:uid})
				.then(result => result.data)
				.then(result => {
				        result.forEach(item => item.checked = false);
				        this.clist=result;
                                        for(var i =0; i<result.length;i++){
                                                this.id = result[i]._id;
                                                console.log(this.id)
                                        }
				        if(this.clist.length == 0){
				                this.isShow = true
				        }else{
				                this.isShow = false
				        }
				})
				.catch(err => console.log(err))


                        var url = `${this.$store.state.serverIP}/product/list`;
                        axios.post(url)
                                .then(result => result.data)
                                .then(result => {
                                        this.list =result;
                                })
                                .catch(err => console.log(err));
                },
	        computed:{
			getPrice(){
			        var temp = 0;
			        this.clist.forEach(item => {
			                if(item.checked) temp += item.goods.price * item.num;
			        })
				return temp;
			},
		        getNum(){
			        var temp = 0;
			        this.clist.forEach(item =>{
			                if(item.checked) temp +=item.num;
			        })
			        return temp;
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.head
		display:flex
		justify-content space-between
		height:0.9rem
		line-height 0.9rem
		font-size:0.36rem
		box-sizing border-box
		border-bottom:1px solid #999
		position:fixed
		top: 0
		z-index:100
		width:100%
		background-color:#fff
		.head-frist
			background-image: url('../assets/img/houtui.png')
			background-repeat:no-repeat
			background-position:15px 15px
			background-size 60%
			width: 0.9rem
			height: 0.9rem
		.head-content
			flex-grow: 1
			text-align: center
			font-size:0.48rem
		.head-last
			font-size:0.24rem
			width: 0.9rem
			height: 0.9rem
	.footer
		display: flex
		justify-content space-between
		position:fixed
		bottom:0
		width:100%
		height: 1rem
		line-height 1rem
		background-color:#fff
		.foot-one
			margin-left 0.5rem
			input
				width: 0.3rem
				height: 0.3rem
				outline:none
				border:none
		.foot-tow
			flex-grow 1
			text-align:left
			padding-left:0.2rem
			color: #ff5577
		.foot-three
			margin-right 0.5rem
			border-radius:10px
			width: 1.5rem
			height:0.8rem
			line-height 0.8rem
			text-align center
			color:#fff
			background-color:#ff5577
			margin-top 0.1rem

	.content
		padding-top:0.9rem
		.emptycart
			width:100%
			margin-bottom:0.5rem
			background-color:#fff
			text-align:center
			img
				width:100%
				margin-top:-1rem
			p
				margin: -1rem 0 0.3rem 0
			span
				padding 0.15rem 0.4rem
				background-color:#ff5577
				border-radius:10px
				color: #fff
		.goods
			background-color:#fff
			margin:0.3rem 0
			padding:0.2rem
			display:flex
			border-top:1px solid #999
			input
				position:absolute
				left: 0rem
				top:0.5rem
				width: 0.3rem
				height:0.3rem
				outline:none
				border:none
			.good-img
				width:1.8rem
				padding:0.1rem 0.1rem 0 0.8rem
				position:relative
				img
					width:100%
					vertical-align middle
			.good-info
				padding:0.1rem 0 0 0.1rem
				display:flex
				flex-direction:column
				justify-content:space-between
				.remove
					float:right
					display inline

	.product-list
		flex-grow: 1
		flex-shrink: 1
		border-top: 1px solid #ddd
		overflow: hidden
		margin-top:0.3rem
		ul
			display: flex
			flex-wrap: wrap
			justify-content: space-between
			li
				width: 49%
				border-radius:10px
				overflow:hidden
				font-size: 0
				margin-bottom: 0.2rem
				&.more
					font-size: 0.32rem
				img
					width: 100%
				p.brief
					font-size: 0.2rem
					height: 0.6rem
					line-height: 0.6rem
					background: rgb(245,242,240)
					text-overflow: ellipsis
					white-space: nowrap
					overflow: hidden
				.wrap
					padding 0 0.15rem
					span.name
						height: 0.4rem
						line-height: 0.4rem
						font-size: 0.26rem
						font-weight: normal
					span.price
						float:right
						font-size: 0.2rem
						&>*
							color: red
							font-style: normal
						em
							font-size: 0.32rem
</style>