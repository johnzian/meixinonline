/**
 * Created by Administrator on 2017/12/31.
 */
const myroutes=[
    {
        path:"",
        component:mainpage,
        //呢度都要加一段children
        children:[
            {path:'',component:index}
        ]
    },
    {
        path:"/mainpage",
        component:mainpage,
        children:[
            {path:'',component:index},
            {path:'/index',component:index},
            {path:'/cake_list',component:cake_list},
            {path:'/desert_list',component:desert_list},
            {path:'/com_introduce',component:com_introduce},
            {path:'/all_shop',component:all_shop},
            {path:'/product_details/:pid',component:product_details},
            {path:'/search/:kw',component:search}
        ]
    }
];