<template>
	<div>
		<div class="header">
			<div class="head-frist"></div>
			<div class="head-content">账号注册</div>
			<div class="head-last"></div>
		</div>
		<div class="content">
			<div class="account-content">
				<div class="account-group">
					<div class="menu">
						<input v-model="txt" type="text" placeholder="用户名/邮箱/手机号">
					</div>
					<div class="menu">
						<input v-model="pwd" type="password" placeholder="密码">
					</div>
				</div>
				<div class="btn" @click="submit">
					注册
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import axios from 'axios';

        export default {
                data(){
                        return {
                                txt:'',
                                pwd:''
                        }
                },
                methods:{
                        submit(){
                                var url = `${this.$store.state.serverIP}/login/register`;
                                axios.post(url,{txt:this.txt , pwd:this.pwd})
                                        .then(rlt => rlt.data)
	                                .then(rlt => {
	                                        if(rlt.ok){
	                                                alert('注册成功')
		                                        this.$router.push(`/login`)
	                                        }else{
	                                                alert(rlt.msg)
	                                        }
	                                })
                                        .catch(err => console.log(err))
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.header
		display:flex
		justify-content space-between
		height:0.9rem
		line-height 0.9rem
		font-size:0.36rem
		box-sizing border-box
		border-bottom:1px solid #999
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
		.head-last
			width: 0.9rem
			height: 0.9rem
	.account-content
		padding:0 0.5rem
		.account-group
			margin:1rem 0 0.6rem 0
			.menu
				width:100%
				padding 0.2rem 0
				input
					width:100%
					height:100%
					outline:none
					font-size:0.36rem
					padding:0.15rem 0.3rem
					border none
					&::placeholder
						color: #999
		.btn
			height:1rem
			text-align center
			line-height 1rem
			color:#fff
			background-color:#ff5577
			border-radius:50px


</style>