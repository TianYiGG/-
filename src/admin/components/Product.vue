<template>
	<div>
		<el-collapse value="1">
			<el-collapse-item title="商品查询" name="1">
				<el-form :inline="true">
					<el-form-item label="商品名称:">
						<el-input placeholder="商品名称"></el-input>
					</el-form-item>
					<el-form-item label="商品类别:">
						<el-select v-model="search.cid" placeholder="商品类别" @change="searchSelectChange">
							<el-option-group v-for="item in _getItemByPid(0)"
							                 :key="item._id" :label="item.name">
								<el-option v-for="item2 in _getItemByPid(item._id)"
								           :key="item2._id" :label="item2.name" :value="item2._id">
								</el-option>
							</el-option-group>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="secondary">查询</el-button>
						<el-button type="primary" @click="beginProductEdit()">新增</el-button>
					</el-form-item>
				</el-form>
			</el-collapse-item>
		</el-collapse>
		<el-table :data="list" border style="width:100%">
			<el-table-column type="index" width="35" fixed></el-table-column>
			<el-table-column prop="name" label="名称" fixed></el-table-column>
			<el-table-column prop="brief" label="简介"></el-table-column>
			<el-table-column label="商品类别" prop="cid" width="80">
				<template slot-scope="scope">
					<span v-text="getCategoryNameById(scope.row.cid)"></span>
				</template>
			</el-table-column>
			<el-table-column prop="price" label="价格" width="60"></el-table-column>
			<el-table-column width="130" fixed="right" label="Banner图片">
				<template slot-scope="scope">
					<el-button @click="beginBannerEdit(scope.row)">查看 / 编辑</el-button>
				</template>
			</el-table-column>
			<el-table-column width="180" fixed="right" label="操作">
				<template slot-scope="scope">
					<el-button @click="beginProductEdit(scope.row)">修改</el-button>
					<el-button>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :visible="dialog.banner.isShow" :showClose="false" width="900px" :title="`${dialog.banner.modal.name} - banner图片管理`">
			<el-row>
				<el-col :span="7" v-for="(img,index) in dialog.banner.modal.bannerImgs" :key="index" :offset="1">
					<el-card :body-style="{padding: '0px'}">
						<img :src="$store.state.serverIP + img" class="image">
						<div style="padding: 14px;">
							<div class="bottom clearfix">
								<el-button @click="deleteImg(img)" type="text" size="medium" class="button">删除</el-button>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="7" :offset="1">
					<el-card :body-style="{padding: '0px'}">
						<el-upload ref="upload" action="" class="banner-uploader" :show-file-list="false" :auto-upload="false"
							accept='image/jpeg,image/png' :on-change="uploadChange" :http-request="uploadImg">
							<img v-if="dialog.banner.newBannerImg" :src="dialog.banner.newBannerImg" class="banner">
							<i v-else class="banner-uploader-icon el-icon-plus"></i>
						</el-upload>
						<div style="padding: 14px;">
							<div class="bottom clearfix">
								<el-button @click="submitImg" v-show="dialog.banner.newBannerImg" type="primary" size="medium" class="button">提交</el-button>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
			<span slot="footer">
				<el-button @click="endBannerEdit">关闭</el-button>
			</span>
		</el-dialog>
		<el-dialog :visible="dialog.edit.isShow" :showClose="false" :title="isAdd?'新增商品':'修改商品'">
			<el-form :model="dialog.edit.modal" label-width="80px" label-position="left">
				<el-form-item label="商品名称" >
					<el-input v-model="dialog.edit.modal.name"></el-input>
				</el-form-item>
				<el-form-item label="商品简介">
					<el-input v-model="dialog.edit.modal.brief"></el-input>
				</el-form-item>
				<el-form-item label="商品分类">
					<el-select v-model="dialog.edit.modal.cid" placeholder="商品类别" @change="editSelectChange">
						<el-option-group v-for="item in _getItemByPid(0)"
						                 :key="item._id" :label="item.name">
							<el-option v-for="item2 in _getItemByPid(item._id)"
							           :key="item2._id" :label="item2.name" :value="item2._id">
							</el-option>
						</el-option-group>
					</el-select>
				</el-form-item>
				<el-form-item label="商品价格">
					<el-input v-model="dialog.edit.modal.price"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click='submitProduct' type="primary">保存</el-button>
					<el-button @click="endProductEdit">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios';
	import _ from 'lodash';

        export default {
                data(){
                        return {
                                isAdd: true,                         // 标识是否是新增
                                search: {name: '', cid: ''},     // 记录关联搜索信息
                                cList: [],                              // 商品分类信息
				list: [],                                // 是表格要展现的数据
	                        dialog: {
                                        banner: { isShow: false, modal: {_id: 0,name: '',bannerImgs: []}, newBannerImg: '' },
		                        edit:{ isShow: false, modal: {_id: 0,name:'',brief:'',price:'',cid:''} }
	                        }
                        };
                },
                created(){
                        // 拿商品分类信息
                        axios.get(`${this.$store.state.serverIP}/category/list`)
                                .then(result => result.data)
                                .then(result => this.cList = result)
                                .catch(err => console.log(err))
                        // 拿商品信息
			axios.post(`${this.$store.state.serverIP}/product/list`)
				.then(result => result.data)
				.then(result => this.list = result)
				.catch(err => console.log(err))
                },
	        methods: {
                        _getItemByPid(pid){
                                return this.cList.filter(item => item.pid === pid);
                        },
		        searchSelectChange(cid){
				this.search.cid = cid;
		        },
                        editSelectChange(cid){
                                this.dialog.edit.modal.cid = cid;
                        },
		        getCategoryNameById(_id){
		                let target = this.cList.filter(item => item._id === _id)[0];
		                return target === undefined? '' : target.name;
		        },
		        beginBannerEdit(row){
                                this.dialog.banner.modal.bannerImgs = row.bannerImgs;
                                this.dialog.banner.modal._id = row._id;
                                this.dialog.banner.modal.name = row.name;
                                this.dialog.banner.isShow = true;
		        },
		        endBannerEdit(){
                                this.dialog.banner.isShow = false;
                                this.dialog.banner.modal.bannerImgs = [];
                                this.dialog.banner.modal._id = 0;
                                this.dialog.banner.modal.name = '';
                                this.dialog.banner.newBannerImg = '';
		        },
                        uploadChange(file, fileList){
                                // 判断用户选的是不是jpg或png图片
                                if(!/\.(png|jpg)$/.test(file.name)){
                                        this.$message({
                                                message: '必须选用 jpg 或 png 图片',
                                                type: 'warning'
                                        })
                                        fileList.splice(fileList.length - 1, 1);
                                        return;
                                }
                                // 预览显示当前选择择图片
                                this.dialog.banner.newBannerImg = file.url;
                                // 保证永远只会记录最近一次提交的图片
                                if(fileList.length > 1) fileList.shift();
                        },
                        submitImg(){
                                // 命令upload控件提交当前选中的图片
                                this.$refs.upload.submit();
                        },
		        uploadImg(content){
                                // 图片上传前准备
                                var url = `${this.$store.state.serverIP}/product/upload`;
                                var fd = new FormData();
                                fd.append('_id', this.dialog.banner.modal._id);
                                fd.append('banner', content.file);
                                var config = {
                                        headers: {'Content-Type': 'multipart/form-data'}
                                };
				// 执行图片上传
			        axios.post(url, fd, config)
				        .then(result => result.data)
				        .then(result => { // 回来是新增图片在服务器的有效访问路径
						// 将新图片放到this.list指定商品的bannerImgs数组中去
						_.find(this.list, {_id: this.dialog.banner.modal._id}).bannerImgs.push(result);
					        // 清空upload控件的文件列表
						this.$refs.upload.clearFiles();
					        // 清空this.dialog.banner.newBannerImg保存的路径
						this.dialog.banner.newBannerImg = '';
				        })
				        .catch(err => console.log(err))
		        },
		        deleteImg(img){
		                var url = `${this.$store.state.serverIP}/product/deleteImg`;
				axios.post(url, {
				        _id: this.dialog.banner.modal._id,
					img: img
				})
					.then(result => result.data)
					.then(result => {
						if(result.ok && result.n === 1){
                                                        // 从list中指定商器中去移除指定图片
							var target = _.find(this.list, {_id: this.dialog.banner.modal._id});
							target.bannerImgs.splice(target.bannerImgs.indexOf(img), 1);
							return true;
						}
						else return false;
					})
					.then(result => {   // 给用户一个良好的操作反馈结果
					        this.$message({
						        message: result? '删除成功': '删除失败',
						        type: result?'success':'error'
					        })
					})
					.catch(err => console.log(err));
		        },
		        beginProductEdit(row){
		                this.isAdd = (typeof row === 'undefined')?true :false;
		                // 做editDialog显示前的准备备工作
			        if(this.isAdd){
					this.dialog.edit.modal._id = this.list[this.list.length - 1]._id + 1;
                                        this.dialog.edit.modal.name = '';
                                        this.dialog.edit.modal.brief = '';
                                        this.dialog.edit.modal.cid = '';
                                        this.dialog.edit.modal.price = '';
			        }else{
                                        this.dialog.edit.modal._id = row._id;
                                        this.dialog.edit.modal.name = row.name;
                                        this.dialog.edit.modal.brief = row.brief;
                                        this.dialog.edit.modal.cid = row.cid;
                                        this.dialog.edit.modal.price = row.price;
			        }
			        // 显示editDialog
			        this.dialog.edit.isShow = true;
		        },
		        endProductEdit(){
		                this.$confirm('确定退出当前编辑状态?','警告',{
		                        type:'warning',
			                showClose: false,
			                beforeClose: (action, instance, done) => {
		                                if(action === 'confirm') this.dialog.edit.isShow = false;
		                                done();
			                }
		                });
		        },
                        submitProduct(){
		                var url = `${this.$store.state.serverIP}/product/${this.isAdd?'add':'update'}`;
				if(this.isAdd) this.dialog.edit.modal.bannerImgs = [];
				else delete this.dialog.edit.modal.bannerImgs;
		                axios.post(url, this.dialog.edit.modal)
					.then(result => result.data)
					.then(result => {
                                                if(result.result.ok && result.result.n === 1){
                                                        // 根据新增/修改不同操作更新list,进而更新tree控件
                                                        if(this.isAdd) this.list.push(result.ops[0]);
                                                        else{
                                                                for(var i = 0; i < this.list.length; i++){
                                                                        if(this.list[i]._id === this.dialog.edit.modal._id){
                                                                                var temp = _.cloneDeep(this.dialog.edit.modal);
                                                                                temp.bannerImgs = _.cloneDeep(this.list[i].bannerImgs);
                                                                                this.list.splice(i, 1, temp);
                                                                                break;
                                                                        }
                                                                }
                                                        }
                                                        this.dialog.edit.isShow = false;
                                                        return true;
                                                }else return false;
					})
					.then(result => {
					        this.$message({
						        type: result?'success':'error',
						        message: `${this.isAdd?'新增':'修改'}${result?'成功':'失败'}`
					        });
					})
					.catch(err => console.log(err));
                        }
	        }
        };
</script>

<style scoped>
	.el-card{background-color: #f5f5f9;}
	.image {width: 100%;display: block;}
	.bottom {line-height:12px;}
	.button{float: right;}

	.banner-uploader{
		font-size: 0;
		padding-bottom: 100%;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.banner-uploader:hover{background-color: #409EFF;}
	.banner-uploader:hover .banner-uploader-icon{color: white;}
	.banner{width:100%;display:block;position:absolute;left:0;top:0;}
	.banner-uploader-icon{
		position:absolute;
		font-size:50px;
		width: 100%;
		height: 100%;
		text-align:center;
		color: #8c939d;
		padding: 100px;
		box-sizing: border-box;
	}
</style>











