import { defineStore } from 'pinia'

export const useStore = defineStore('STORE',{
    state:() =>({
        currentPageId:0,
        day:false,
    }),
    getters:{

    },
    actions:{
        changeDay(){
            this.day = true
        },
        changeBlock(){
            this.day = false 
        }
    }
})