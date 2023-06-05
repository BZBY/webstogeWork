import { defineStore } from 'pinia'

export const useUser = defineStore('USER',{
    state:() =>({
        //登录状态
        isLogin:true,
        //用户登录信息
        userinfo:{
            id:'',
            username:'',
            nickname:'',
            password:'',
            gender:0,
            email:'',
            address:'',
            phone:''
        },
        //注册的账号列表
        regUser:{
            id:'',
            username:'',
            password:'',
            nickname:'',
            gender:0,
            email:'',
            address:'',
            phone:''
        },
       
    }),
    getters:{

    },
    actions:{
        //退出登录
        exitLogin(){
            this.isLogin = false
            this.userinfo = {
                id:0,
                username:'',
                nickname:'',
                gender:0,
                email:'',
                address:''
            }
        },
       
    }
})