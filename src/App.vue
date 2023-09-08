<template>
  <div>
    <nav class="nav">
      <router-link to="/">Home</router-link>      
      <router-link to="/about">About</router-link>     
      <router-link to="/demo1">Demo1</router-link>      
      <router-link to="/demo2">Demo2</router-link> 
      <router-link to="/demo3">Demo3</router-link>
      <router-link to="/demo4">Demo4</router-link>
    </nav>
    <router-view />  
  </div>
</template>
<style scoped>
.nav>a{
  margin-right: 10px;
  font-size: 18px;
}
</style>
