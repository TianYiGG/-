<template>
	<transition name="fadeRight">
		<div class="category-wrapper">
			<div class="search"></div>
			<div class="category">
				<div class="left" ref="leftScroll">
					<ul>
						<li @click="changeCategory($event,item._id)" :class="{active:item._id === curCid}" v-for="item in mainCategory" :key="item._id">
							<a v-text="item.name"></a>
						</li>
					</ul>
				</div>
				<div class="right">
					<div class="right-content" v-if="curCid > 0">
						<div class="subCategory-wrapper">
							<ul class="clearfix">
								<li v-for="item in subCategory" :key="item._id" @click="$router.push(`/product/${item._id}`)">
									<img :src="`${$store.state.serverIP}${item.avatar}`">
									<a v-text="item.name"></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios';
	import BetterScroll from 'better-scroll';

        export default {
                data(){
                        return {
                                list:[],
	                        curCid:0     //记录当前激活的一级分类的_id
                        }
                },
	        methods:{
                        changeCategory(e,_id){
				if(e._constructed)this.curCid = _id;
                        }
	        },
                created(){
                        axios.get(this.$store.state.serverIP + '/category/list')
	                        .then(result => result.data)
                                .then(result => {
                                        this.list = result;
                                        this.curCid = this.list.filter(item => item.pid === 0)[0]._id;
                                        this.$nextTick(() => {
                                                if(!this.scroll){
                                                        new BetterScroll(this.$refs.leftScroll,{click:true});
                                                }
                                        })

                                })
                                .catch(err => console.log(err));
                },
	        computed:{
                        mainCategory(){
                                return this.list.filter(item => item.pid === 0);
                        },
		        subCategory(){
                                return this.list.filter(item => item.pid === this.curCid);
		        },
		        curCategoryAvatar(){
		                return this.list.filter(item => item._id)[0].avatar
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.category-wrapper
		position:fixed
		left: 0
		top: 0
		bottom: 1rem
		width:100%
		.search
			height: 0.9rem
		.category
			position:absolute
			top: 0.9rem
			left: 0
			bottom:0
			width:100%
			display: flex
			.left
				width: 2rem
				flex-shrink: 0
				overflow:hidden
				ul
					li
						height: 0.88rem
						line-height: 0.88rem
						a
							font-size: 0.26rem
							font-weight bold
							color: #666
							width:100%
							display: inline-block
							text-align: center
							height: 0.5rem
							line-height: 0.5rem
							border-left:6px solid transparent
						&.active>a
							border-left:6px solid #ff5577
							color: #ff5577

			.right
				flex-grow: 1
				.right-content
					padding:0.3rem 0.3rem 0
					img.curAvatar
						width:100%
					.subCategory-wrapper
						width:100%
						overflow: hidden
						ul
							margin-right: -0.66rem
							li
								width: 33.3333%
								box-sizing: border-box
								float: left
								padding-right: 0.66rem
								padding-bottom: 0.66rem
								text-align center
								img
									width:100%
								a
									font-size:0.24rem
									color: #666

</style>