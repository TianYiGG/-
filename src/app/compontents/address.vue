<template>
	<div>
		<div>
			<div class="head">
				<div class="head-frist"></div>
				<div class="head-content">我的收货地址</div>
				<div class="head-last">编辑</div>
			</div>
			<div class="wrap">
				<div class="list-location">
					<div class="border">
						<div class="location-item"  v-for="(item,index) in list" :key="index">
							<div class="location-info">
								<p class="user-info">
									<span v-text="item.username"></span>
									<span class="mobile dianHua" v-text="item.phone"></span>
								</p>
								<p class="diZhi" v-text="item.city"></p>
							</div>
							<div class="operate clearfix">
								<div class="chek pull-left">设为默认</div>
								<div class="remove pull-right">删除</div>
								<div class="redact pull-right" @click="show"><span @click="isAdd=false">编辑</span></div>
							</div>
						</div>
					</div>
				</div>
				<div class="newlocation" v-show="isShow">
					<label for="">
						<p>收货人:</p>
						<input type="text" v-model="userinfo.username"/>
					</label>
					<label for="">
						<p>手机号:</p>
						<input type="text" v-model="userinfo.phone"/>
					</label>
					<!--三级联动-->
					<label>
						<span>请输入收货地址:</span>
						<input type="text" v-model="userinfo.city">
					</label>
					<label for="">
						<p>详细地址:</p>
						<textarea></textarea>
						<p class="count">0/35</p>
					</label>
					<label for="">
						<p>邮编:</p>
						<input type="text" v-model="userinfo.postcode"/>

					</label>
					<div class="btn-group">
						<button type="button" class="btn-cancle" @click="hide">取消</button>
						<button type="button" class="btn-confirm" @click="submit">确定</button>
					</div>
				</div>
			</div>
			<div class="address-add" @click="isAdd=true">
				<div class="address-button" @click="show">
					添加收货地址
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";

export default {
  data() {
    return {
      isShow: false,
      isAdd: false,
      userinfo: {
			uid: "",
			username: "",
			phone: "",
			city: "",
			postcode: ""
      },
      		list: []
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    submit() {
      var url = `${this.$store.state.serverIP}/login/${
        this.isAdd ? "city" : "update"
      }`;
      axios
        .post(url, this.userinfo)
        .then(result => result.data)
        .then(result => {
          this.$router.go(0);
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.userinfo.uid = sessionStorage.getItem("user");
    var uid = sessionStorage.getItem("user");
    var url = `${this.$store.state.serverIP}/login/getcity`;
    axios
      .post(url, { uid: uid })
      .then(result => result.data)
      .then(result => {
        this.list = result;
        console.log(this.list);
      })
      .catch(err => console.log(err));
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.head {
	display: flex;
	justify-content: space-between;
	height: 0.9rem;
	line-height: 0.9rem;
	font-size: 0.36rem;
	box-sizing: border-box;
	border-bottom: 1px solid #999;
	z-index: 100;
	width: 100%;
	background-color: #fff;

	.head-frist {
		background-image: url('../assets/img/houtui.png');
		background-repeat: no-repeat;
		background-position: 15px 15px;
		background-size: 60%;
		width: 0.9rem;
		height: 0.9rem;
	}

	.head-content {
		flex-grow: 1;
		text-align: center;
		font-size: 0.36rem;
	}

	.head-last {
		font-size: 0.24rem;
		width: 0.9rem;
		height: 0.9rem;
	}
}

.wrap {
	padding: 0.24rem;
	margin: 0 auto 1rem;

	.list-location {
		width: 100%;

		.border {
			border: 1px solid #d1d1d1;
			box-shadow: 0 0.04rem 0.08rem rgba(50, 50, 50, 0.3);

			.location-item {
				padding: 0.24rem 0 0;
				background-color: #fff;
				border: 1px solid #d1d1d1;
				border-radius: 4px;
			}

			.addlocation {
				width: 100%;
				padding: 0.4rem;
				color: #ff5777;
				border-top: 1px solid #d1d1d1;
				text-align: center;
				right: 0;
				z-index: 500;
			}

			.location-info {
				padding: 0.07rem;
				color: #727272;

				.user-info {
					padding: 0 0.2rem 0.2rem;
					font-size: 0.4rem;
					color: #000;
				}

				.diZhi {
					padding: 0 0.2rem;
				}
			}

			.location-info p {
				margin: 0;
			}

			.mobile {
				margin-left: 0.2rem;
			}

			.operate {
				margin: 0.2rem 0 0 0;
				padding: 0.15rem 0;
				border-top: 1px solid #999;
				overflow: hidden;
				color: #333;
			}

			.operate div {
				margin: 0 0.07rem;
				text-indent: 0.2rem;
			}

			.chek {
				float: left;
			}

			.remove {
				float: right;
			}

			.redact {
				float: right;
			}
		}
	}
}

.address-add {
	position: fixed;
	z-index: 0;
	bottom: 0;
	height: 1.1rem;
	width: 100%;

	.address-button {
		line-height: 1.1rem;
		text-align: center;
		font-size: 0.3rem;
		background: linear-gradient(90deg, #ff885d, #fb4947);
		color: #fff;
	}
}

.newlocation {
	width: 100%;
	height: 100%;
	background-color: #FFf;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 2;

	label {
		display: flex;
		color: #5e5e5e;
		border-bottom: 1px solid #eee;
		background-color: #fff;
		position: relative;
		margin: 0;
		width: 100%;

		p {
			width: 2rem;
			height: 0.8rem;
			line-height: 0.8rem;
			padding: 0.04rem;
			margin: 0;
			font-size: 0.4rem;
			box-sizing: content-box;
		}

		input {
			vertical-align: middle;
			outline: 0;
			color: #424242;
			-webkit-appearance: none;
			border: none;
			width: 100%;
			padding: 0 0.1rem;
			font-size: 0.4rem;
		}

		span {
			display: block;
			flex-shrink: 0;
			font-size: 0.4rem;
		}

		textarea {
			padding: 0.1rem;
			width: 100%;
			border: none;
			line-height: 0.8rem;
			position: relative;
			background: transparent;
			height: 100%;
			resize: none;
			outline: 0;
			font-size: 0.4rem;
		}

		.count {
			position: absolute;
			bottom: 0;
			right: 0;
			margin: 0;
			padding: 0.05rem;
			font-size: 0.3rem;
			width: auto;
			height: auto;
		}
	}

	.btn-group {
		margin: 0.04rem;
		display: flex;
		justify-content: space-around;
		position: fixed;
		bottom: 2rem;
		width: 100%;
		background-color: #fff;

		.btn-cancle {
			color: #666;
			background-color: #fff;
			border: none;
			outline: none;
			font-size: 0.4rem;
			border-radius: 4px;
			padding: 0.3em;
			line-height: 1;
			min-width: 40%;
		}

		.btn-confirm {
			color: #fff;
			background-color: #ff5777;
			border: none;
			outline: none;
			font-size: 0.4rem;
			border-radius: 4px;
			padding: 0.3em;
			line-height: 1;
			min-width: 40%;
		}
	}
}
</style>