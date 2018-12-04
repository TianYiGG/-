<template>
	<div class="product-list-wrapper">
		<div v-if="cList.length > 0" class="product-list-header">
			<div ref="categoryScroll" class="categoryScroll">
				<ul ref="categoryGroup">
					<li v-for="item in siblingCategory" :key="item._id"
						v-text="item.name"
						:class="{active: item._id === curCid}"
						@click="curCid = item._id">
					</li>
				</ul>
			</div>
		</div>
		<div class="product-list" ref="productList">
			<ul>
				<li v-for="item in list" :key="item._id" @click="$router.push(`/details/${item._id}`)">
					<img :src="`${$store.state.serverIP}${item.bannerImgs[0]}`">
					<p class="brief" v-text="item.brief"></p>
					<span class="name" v-text="item.name"></span>
					<span class="price">
						<i>¥</i>
						<em v-text="item.price"></em>
					</span>
				</li>
				<li v-show="isLoading" class="more">加载更多...</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios';
	import BetterScroll from 'better-scroll';

        export default {
                data(){
                        return {
                                list: [],
	                        cList: [],
	                        curCid: 0,
	                        isLoading: false
                        };
                },
	        computed: {
                        fatherCategoryName(){
                                var target = this.cList.filter(item => item._id ===this.curCid)[0];
                                return this.cList.filter(item => item._id === target.pid)[0].name;
                        },
		        siblingCategory(){
                                var target = this.cList.filter(item => item._id === this.curCid)[0];
				return this.cList.filter(item => item.pid === target.pid);
                        }
	        },
                created(){
                        this.curCid = parseInt(this.$route.params.id);
                        this.loadCategoryData();
                },
	        methods: {
                        loadCategoryData(){
				var url = `${this.$store.state.serverIP}/category/list`;
				axios.get(url)
					.then(result => result.data)
					.then(result => {
					        this.cList = result;
					        this.$nextTick(() => {
					                var width = 0, lis = this.$refs.categoryGroup.children;
					                for(var i = 0;i< lis.length;i++)
                                                                width += lis[i].clientWidth;
						        this.$refs.categoryGroup.style.width = width + 'px';
						        new BetterScroll(this.$refs.categoryScroll, {
						                click:true,
                                                                scrollX:true,
                                                                eventPassthrough:'vertical' //忽略竖直方向的滚动
						        });
					        });
					})
					.catch(err => console.log(err));
                        },
                        loadData(){
                                this.isLoading = true;
                                // 从服务器拿取指定分类的所有商品
                                var url = `${this.$store.state.serverIP}/product/getProductByCid`;
                                axios.post(url, {cid: this.curCid, total: this.list.length})
                                        .then(result => result.data)
                                        .then(result => {
                                                if(result.length >0&&this.scroll)
                                                        this.scroll.once('pullingUp',() => this.loadData());
                                                this.list = this.list.concat(result);
                                                this.$nextTick(() => {
                                                        this.isLoading = false;
                                                        if(!this.scroll){
                                                                this.scroll = new BetterScroll(this.$refs.productList, {
                                                                        click: true,
                                                                        probeType: 1,
                                                                        pullUpLoad: { threshold: -50 }
                                                                });
                                                                this.scroll.once('pullingUp', () => this.loadData());
                                                        }else  {
                                                                this.scroll.finishPullUp();
                                                                this.scroll.refresh();
                                                        }
                                                });
                                        })
                                        .catch(err => console.log(err));
                        },
	        },
	        watch: {
                        curCid(newV, oldV){
                                this.list = [];
                                if(this.scroll){
                                         this.scroll.destroy();   // 销毁原来的BetterScroll
                                }
                                this.scroll = null;
                                this.loadData();
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.product-list-wrapper
		position: fixed
		left: 0
		top: 0
		bottom: 1rem
		width: 100%
		display: flex
		flex-direction: column
		.product-list-header
			flex-shrink: 0
			.categoryScroll
				width: 100%
				overflow: hidden
				ul
					display: flex
					flex-wrap: nowrap
					li
						height: 0.8rem
						line-height: 0.8rem
						padding: 0 0.26rem
						white-space: nowrap
						border-bottom: 6px solid transparent
						&.active
							border-bottom: 6px solid rgb(132, 95, 63)
							color: rgb(132, 95, 63)
		.product-list
			flex-grow: 1
			flex-shrink: 1
			border-top: 1px solid #ddd
			overflow: hidden
			ul
				display: flex
				flex-wrap: wrap
				justify-content: space-between
				li
					width: 49%
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