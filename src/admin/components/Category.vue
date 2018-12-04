<template>
	<div>
		<el-tree :data="treeData"
		        :default-expand-all="true"
			:expand-on-click-node="false">
			<span slot-scope="{ node, data }" class="custom-tree-item">
				<span v-text="node.label"></span>
				<span>
					<el-button type="text" v-if="!data.pid" class="el-icon-plus" @click="beginEdit(data, true)"></el-button>
					<el-button type="text" v-if="data.id" class="el-icon-edit" @click="beginEdit(data, false)"></el-button>
					<el-button type="text" v-if="data.id" class="el-icon-delete" :disabled="!canDel(data.id)" @click="delCategory(data)"></el-button>
					<el-popover  v-if="data.id" placement="left" title="分类图片" trigger="hover">
						<img :src="$store.state.serverIP + data.avatar + '?t=' + Math.random()" :class="{'thumb':!data.pid,'sub-thumb':data.pid}">
						<el-button type="text" class="el-icon-picture" slot="reference"></el-button>
					</el-popover>
				</span>
			</span>
		</el-tree>
		<el-dialog :visible="editShow" :show-close="false"
		           :title="isAdd?'新增分类':'修改分类'" center>
			<el-form :model="modal" label-width="90px" label-position="left" :rules="rules" ref="form" status-icon>
				<el-form-item label="父分类名字">
					<el-input :disabled="true" size="small" :value="fatherCategoryName"></el-input>
				</el-form-item>
				<el-form-item label="分类名字"  prop="name">
					<el-input size="small" v-model="modal.name"></el-input>
				</el-form-item>
				<el-form-item label="分类图片">
					<img class="avatar" :class="{small: modal.pid}" :src="avatar.oldPic" alt="" v-if="!isAdd">
					<img class="avatar" :class="{small: modal.pid}" :src="avatar.newPic" alt="" v-if="isAdd || (!isAdd && isSelectPicture)">
					<el-upload action="" ref="upload" :on-change="uploadChange"
					        :auto-upload="false"  :http-request="submitImage"
						:show-file-list="false" accept="image/jpeg,image/png">
						<el-button type="primary" size="small" slot="trigger">选择图片</el-button>
						<el-button type="text" @click="resetUpload" class="reset-img" v-show="isSelectPicture && !isAdd">使用原图片</el-button>
						<div slot="tip">只能上传 jpg 或 png 图片</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button type="info" size="small" @click="cancelEdit">取消</el-button>
				<el-button type="primary" size="small" @click="submitEdit">保存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	import axios from 'axios';
	import _ from 'lodash';

        export default {
                data: function(){
                        return {
                                list: [],
	                        editShow: false,
	                        isAdd: true,                // 标识当前是新增还是修改
	                        isSelectPicture: false, // 标识当前是否选择了图片
	                        modal: { _id: -1, name: '', avatar: '', pid: -1},
	                        // 专门控制图片预览相关数据
	                        avatar: {oldPic: '', newPic: ''},
	                        rules: {
                                        name:[
	                                        {required: true, message: '商品分类名必填', trigger: 'blur'}
                                        ]
	                        }
                        };
                },
	        created: function(){
                        axios.get(this.$store.state.serverIP + '/category/list')
	                        .then(result => this.list = result.data)
	                        .catch(err => console.log(err));
	        },
	        computed: {
	                treeData: function(){
	                        var data = [];
				var root = { id: 0, label: '商品分类'};
		                this._updateNode(root);
				data.push(root);
				return data;
	                },
		        fatherCategoryName: function(){
	                        if(this.modal.pid <1) return '';
	                        else return _.find(this.list, { _id:this.modal.pid }).name;
		        }
	        },
	        methods: {
	                _updateNode: function(node){
                                var children = this.list.filter(item => item.pid === node.id);
                                if(children.length > 0){
                                        node.children = [];
                                        children.forEach(item => {
                                                var subNode = {
                                                        id: item._id,
                                                        label: item.name,
                                                        pid: item.pid,
                                                        avatar: item.avatar
                                                };
                                                this._updateNode(subNode);
                                                node.children.push(subNode);
                                        });
                                }
	                },
		        canDel: function(_id){
	                        for(var i = 0;i < this.list.length;i++){
	                                if(this.list[i].pid === _id) return false;
	                        }
	                        return true;
		        },
		        delCategory: function(data){
                                this.$confirm('请确认没有任何商品与当前分类相关后再删除', '警告', {
                                        type: 'warning',
                                        showClose: false,
                                        beforeClose: (action, instance, done) => {
                                                if(action === 'confirm'){
                                                        instance.confirmButtonLoading = true;
                                                        instance.confirmButtonText = '删除中...';
                                                        // 请求服务器删除指定category
                                                        axios.post(this.$store.state.serverIP + '/category/delete',{id: data.id, avatar: data.avatar})
                                                                .then(result => {
                                                                        done();
                                                                        setTimeout(() => {
                                                                                instance.confirmButtonLoading = false;
                                                                                instance.confirmButtonText = '确定';
                                                                        }, 300);
                                                                        if(result.data.ok&&result.data.n === 1) {
                                                                                // 从this.list中把这个category删除
	                                                                        for(var i = 0;i <this.list.length; i++){
	                                                                                if(this.list[i]._id === data.id){
	                                                                                        this.list.splice(i, 1);
	                                                                                        break;
	                                                                                }
	                                                                        }
                                                                                return '删除成功';
                                                                        }
                                                                        else return '删除失败';
                                                                })
                                                                .then(result => {
                                                                        this.$message({
                                                                                message: result,
                                                                                type: result === '删除成功'?'success':'error'
                                                                        });
                                                                })
                                                                .catch(err => done())
                                                } else done();
                                        }
                                });
		        },
		        uploadChange: function(file, fileList){
	                        // 判断用户选的是不是jpg或png图片
				if(!/\.(png|jpg)$/.test(file.name)){
				        this.$message({
					        message: '必须选用 jpg 或 png 图片',
					        type: 'warning'
				        })
					fileList.splice(fileList.length - 1, 1);
				        return;
				}
				// 更改this.modal.avatar的值
			        this.modal.avatar = this.modal._id + file.name.slice(file.name.lastIndexOf('.'));
				// 预览显示当前选择择图片
                                this.avatar.newPic = file.url;
	                        // 保证永远只会记录最近一次提交的图片
	                        if(fileList.length > 1) fileList.shift();
	                        this.isSelectPicture = true;
		        },
		        beginEdit: function(data, flag){
	                        this.isAdd = flag;
	                        if(this.isAdd){         // 如果是新增
					this.modal._id = this.list.length?this.list[this.list.length - 1]._id + 1: 1;
					this.modal.name = '';
					this.modal.pid = data.id;
					this.modal.avatar = '';
	                        }else{                     // 如果是修改
					this.modal._id = data.id;
					this.modal.name = data.label;
					this.modal.pid = data.pid;
					this.modal.avatar = data.avatar.slice(data.avatar.lastIndexOf('/') + 1);
					this.avatar.oldPic = this.$store.state.serverIP + data.avatar;
	                        }
	                        this.avatar.newPic = this.$store.state.serverIP + '/images/category/default.png';
	                        this.editShow = true;
		        },
		        cancelEdit: function(){
		                this.$confirm('确定取消编辑?', '警告',{
		                        type: 'warning',
					showClose: false,
			                closeOnClickModal: false,
			                closeOnPressEscape: false
		                })
			                .then(() => this.editShow = false)
			                .catch(() => {})
		        },
		        submitImage: function(content){
		                // 只发送图片
                                var url = this.$store.state.serverIP + '/category/upload';
			        var fd = new FormData();
			        fd.append('fileName', this.modal.avatar);
			        var oldFileName = this.avatar.oldPic.slice(this.avatar.oldPic.lastIndexOf('/') + 1);
			        fd.append('oldFileName',oldFileName);
			        fd.append('avatar', content.file);
                                var config = {
                                        headers: {'Content-Type': 'multipart/form-data'}
                                };
                                axios.post(url,fd,config);
		        },
		        submitEdit: function(){
		                // 验证upload控件有没有选择图片
		                if(this.isAdd && !this.isSelectPicture){
		                        this.$message({
			                        message: '必须选择一张图片',
			                        type: 'warning'
		                        })
			                return;
		                }
			        // 验证除上传图片以外的其它东西是否填写完整
		                this.$refs.form.validate(result => {
		                        // 上传图片
		                        if(result){
                                                this.$refs.upload.submit();
                                                // 上传图片以外的其它信息
                                                var url = this.$store.state.serverIP + '/category/' + (this.isAdd?'add':'update');
                                                // 发送ajax
                                                axios.post(url, this.modal)
                                                //  {data: {result: {ok:1 , n: 1}, ops: [{.....}]}}
                                                        .then(result => result.data)
                                                        // {result: {}, ops: [{.....}]}      新增
                                                        // {n: 1, ok: 1, nInserted: 1}  修改
                                                        .then(result =>{
                                                                if(result.result.ok && result.result.n === 1){
                                                                        // 根据新增/修改不同操作更新list,进而更新tree控件
                                                                        if(this.isAdd) this.list.push(result.ops[0]);
                                                                        else{
                                                                                for(var i = 0; i < this.list.length; i++){
                                                                                        if(this.list[i]._id === this.modal._id){
                                                                                                var temp = _.cloneDeep(this.modal);
                                                                                                temp.avatar = '/images/category/' + temp.avatar;
                                                                                                this.list.splice(i, 1, temp);
                                                                                                break;
                                                                                        }
                                                                                }
                                                                        }
                                                                        this.editShow = false;
                                                                        return true;
                                                                }else return false;
                                                        })
                                                        .then(result =>{
                                                                // 友好提示反馈用户新增是否成功
                                                                var msg = (this.isAdd?'新增':'修改') + (result?'成功':'失败');
                                                                this.$message({
                                                                        message: msg,
                                                                        title: '提示',
                                                                        type: result?'success':'error'
                                                                });
                                                        })
                                                        .catch(err => console.log(err))
                                        }
		                })
		        },
		        resetUpload: function(){
		                // 设置this.modal.avatar 为原图片名
			        this.modal.avatar = this.avatar.oldPic.slice(this.avatar.oldPic.lastIndexOf('/') + 1);
		                // 设置data中isSelectPicture为false隐藏自己
			        this.isSelectPicture = false;
		                // 清空uploader控件中的文件
			        this.$refs.upload.clearFiles();
			        // 让预览显示默认default图片
			        this.avatar.newPic = this.$store.state.serverIP + '/images/category/default.png';
		        }
	        },
	        watch: { // 监听指定数据成员
                        editShow: function(newV, oldV){
                                if(!newV){
                                        // 表单初始化成默认状态
	                                this.$refs.form.resetFields();
                                        // 清空上传组件中上次上传所遗留的选择
                                        this.$refs.upload.clearFiles();
                                        // 将isSelectPictrue改成假
                                        this.isSelectPicture = false;
                                }
                        }
	        }
        };
</script>
<style scoped>
	.custom-tree-item{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
	.el-icon-picture{margin-left: 10px;}
	.thumb{width:200px;}
	.sub-thumb{width:150px;}
	.el-form-item{margin-bottom:15px;}
	.avatar { width: 200px;height: 100px; }
	.avatar.small { width: 150px; height: 150px;}
	.reset-img { margin-left: 20px; }
</style>