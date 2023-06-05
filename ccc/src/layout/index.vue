<template>
    <div class="layout">
        <Header></Header>
        <router-view></router-view>
        <div class="footer">
            Coding ~ @Copyright 2023
        </div>
    </div>
</template>

<script setup>
import {ref,reactive} from 'vue'
import Header from '../components/Header.vue'


</script>

<style scoped lang="less">
.layout{
    background-color: #e7e7e7;
  opacity:90%;
    padding:10px 10px 30px 10px;
    width: 100%;
    min-height: 100vh;
    .footer{
        color:#666;
        position: fixed;
        top:95%;
        left:45%;
        text-align: center;
    }
}
</style>