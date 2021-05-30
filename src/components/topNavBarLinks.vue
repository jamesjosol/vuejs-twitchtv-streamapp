<template>
<div id="topNavBarLinksContainer">
    <router-link to='/'>Top Games</router-link><span class="divider"> | </span> 
    <router-link to='/GetTopStreamers'>Top Streamers</router-link>
</div>   
</template>

<script>
export default {
    name: 'topNavBarLinks'
}
</script>

<style>
#topNavBarLinksContainer {
    margin-bottom: 10px;
    padding-top: 20px;
}

#topNavBarLinksContainer a{
    font-size: 25px;
    padding: 10px 10px 3px 10px;
    color: #7e7e7e;
    text-decoration: none;
    transition: 0.5s;
}


#topNavBarLinksContainer a:hover{
    transition: 0.5s;
    color: #f0a7ff;
}

.divider {
    font-size: 1.5em;
    color: #dfdfdf;
}
</style>