<template>
	<div class="container">
		<div class="header">
			<div class="left"></div>
			<div class="login">登录页面</div>
			<div class="right"></div>
		</div>
		<div class="content">
			<div class="input-warp">
				<input type="text" placeholder="请输入账号密码">
			</div>
			<div class="input-warp">
				<input type="text" placeholder="请输入密码">
			</div>
		</div>
		<div class="login-button">
			<span>登录</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {};
</script>

<style>
	.container{
		width:100%;
	}
	.header{
		width:100%;
		display: flex;
		justify-content: space-between;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
	}
	.left{
		width:1rem;
		background:url("../assets/img/houtui.png") no-repeat 50% 50%;
		background-size: 60%;
	}
	.login{
		flex-grow: 1;
		font-size: 0.5rem;
	}
	.right{
		width:1rem;
	}
	.input-warp{
		width:80%;
		margin: 0 auto;
		height: 1rem;
		padding-top: .1rem;
		padding-bottom: .1rem;
		position: relative;
		overflow: hidden;
		margin-top: .2rem;
		background: #fff;
		border-bottom: .01rem solid #efefef;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	input{
		width:100%;
		border:0;
		height:100%;
		font-size: 0.4rem;
		outline:none;
	}
	.content{
		margin-bottom: 0.5rem;
	}
	.login-button{
		width:80%;
		margin:0 auto;
		height:1rem;
		line-height: 1rem;
		background: linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18);
		color: white;
		text-align: center;
		font-size:0.4rem;
		-webkit-border-radius: 1.24rem;
		-moz-border-radius: 1.24rem;
		border-radius: 1.24rem;
	}
</style>