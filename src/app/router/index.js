import Vue from 'vue';
import Router from 'vue-router';
import MyCategory from '../compontents/MyCategory.vue';
import MyProduct from '../compontents/MyProduct.vue';
import MyDetails from '../compontents/MyDetails .vue';
import Login from '../compontents/Login.vue';
import Register from '../compontents/Register.vue';
import Index from '../compontents/Index.vue';
import Cart from '../compontents/Cart.vue';
import User from '../compontents/User.vue';
import Address from '../compontents/address.vue';
import Dome from '../compontents/dome.vue';

Vue.use(Router)

var router = new Router({
        routes:[
                {path:'/',redirect:'/index'},
                {path:'/category',component:MyCategory},
                {path:'/product/:id',component:MyProduct},
                {path:'/details/:id',component:MyDetails },
                {path:'/login',component:Login},
                {path:'/register',component:Register},
                {path:'/index',component:Index},
                {path:'/cart',component:Cart},
                {path:'/user',component:User},
                {path:'/address',component:Address},
                {path:'/dome',component:Dome}
        ]
});

export default router;