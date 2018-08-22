<script>
import menuData from '../../data/menu';

export default {
  name: 'Menu',
  props: ['isMobileMenuOpen', 'toggleMobileMenu', 'closeMenu'],
  data: () => ({
    menuData,
    legendOpen: false,
  }),
  methods: {
    toggleLegend() {
      this.legendOpen = !this.legendOpen;
    },
  },
};
</script>

<template>
  <nav>
    <button class="hamburguer" v-on:click="toggleMobileMenu" aria-lable="toggle menu">
      <svg v-if="!isMobileMenuOpen" aria-hidden="true" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100">
        <path class="line line-1" d="M5 13h90v14H5z"/>
        <path class="line line-2" d="M5 43h90v14H5z"/>
        <path class="line line-3" d="M5 73h90v14H5z"/>
      </svg>
      <svg v-if="isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <path fill="#1D1D1B" d="M28.941 31.786L.613 60.114a2.014 2.014 0 1 0 2.848 2.849l28.541-28.541 28.541 28.541c.394.394.909.59 1.424.59a2.014 2.014 0 0 0 1.424-3.439L35.064 31.786 63.41 3.438A2.014 2.014 0 1 0 60.562.589L32.003 29.15 3.441.59A2.015 2.015 0 0 0 .593 3.439l28.348 28.347z"/>
      </svg>
    </button>
    <ol>
      <li v-for="location in menuData" v-bind:key="location.id">
        <a v-bind:href="'#' + location.id" v-on:click="closeMenu">{{location.name}}</a>
      </li>
    </ol>

    <div v-bind:class="{legends: true, open: legendOpen}" v-on:click="toggleLegend">
      <button>
          Location legend
          <span v-if="legendOpen">▼</span>
          <span v-if="!legendOpen">▲</span>
      </button>
      <ul>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/a/a4/Professor_Kukui_SM_OD.png/30px-Professor_Kukui_SM_OD.png" width="25" height="25"> Starter</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/a/a2/SMUSUM_Grass.png/30px-SMUSUM_Grass.png" width="25" height="25"> Grass</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/4/44/SMUSUM_Grass_brown.png/30px-SMUSUM_Grass_brown.png" width="25" height="25"> Grass</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/3/38/SMUSUM_Long_Grass.png/22px-SMUSUM_Long_Grass.png" width="25" height="25"> Long grass</li>
         <li><img src="//cdn.bulbagarden.net/upload/e/ea/Bag_Fishing_Rod_Sprite.png" width="25" height="25"> Fishing</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/0/0b/Lapras_Paddle_VII_OD.png/30px-Lapras_Paddle_VII_OD.png" width="25" height="25"> Surfing</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/c/cc/SMUSUM_Water_splashes.png/30px-SMUSUM_Water_splashes.png" width="25" height="25"> Water splash</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/a/a4/SMUSUM_Cave.png/30px-SMUSUM_Cave.png" width="25" height="25"> Cave</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/9/9b/SMUSUM_Shadow.png/30px-SMUSUM_Shadow.png" width="25" height="25"> Shadow</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/b/b0/SMUSUM_Berry_pile_small.png/30px-SMUSUM_Berry_pile_small.png" width="25" height="25"> Berry Pile</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/0/08/SMUSUM_Yellow_Flowers.png/30px-SMUSUM_Yellow_Flowers.png" width="25" height="25"> Yellow flower</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/1/12/SMUSUM_Red_Flowers.png/30px-SMUSUM_Red_Flowers.png" width="25" height="25"> Red flower</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/4/46/SMUSUM_Dirt_cloud.png/30px-SMUSUM_Dirt_cloud.png" width="25" height="25"> Dirt cloud</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/a/a6/SMUSUM_Sand_cloud.png/30px-SMUSUM_Sand_cloud.png" width="25" height="25"> Sand cloud</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/1/15/SMUSUM_Sand.png/30px-SMUSUM_Sand.png" width="25" height="25"> Deep sand</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/e/e8/SMUSUM_Rustling_grass.png/19px-SMUSUM_Rustling_grass.png" width="25" height="25"> Rustlir grass</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/7/7f/SMUSUM_Rustling_bush.png/30px-SMUSUM_Rustling_bush.png" width="25" height="25"> Rustlir bush</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/1/16/SMUSUM_Rustling_tree.png/30px-SMUSUM_Rustling_tree.png" width="25" height="25"> Rustlir Tree</li>
         <li><img src="//cdn.bulbagarden.net/upload/a/a2/EggMS.png" width="25" height="25"> Egg</li>
         <li><img src="//cdn.bulbagarden.net/upload/thumb/6/6b/Gen_VII_Item_Ball.png/10px-Gen_VII_Item_Ball.png" width="25" height="25"> Gift</li>
         <li><img src="//cdn.bulbagarden.net/upload/5/55/Bag_Premier_Ball_Sprite.png" width="25" height="25"> Only one (special)</li>
         <li>Other: Pokemon is found via trade or fossil restoration</li>
      
      </ul>
    </div>
  </nav>
</template>

<style scoped>
ol li {
  margin-bottom: 7px;
  padding-left: 25px;
  position: relative;
}

ol {
  margin-bottom: 25px;
}

ol li:before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(//cdn.bulbagarden.net/upload/9/93/Bag_Pok%C3%A9_Ball_Sprite.png)
    center center;
  background-size: cover;
  position: absolute;
  left: 0;
}

ul {
  padding: 20px;
}

ul img {
  width: 20px;
  height: 20px;
}

ul li {
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.legends {
  width: 100%;
  position: sticky;
  left: 0;
  bottom: 0;
  padding-bottom: 20px;
  height: 44px;
  overflow: hidden;
  box-shadow: 0 -5px 5px -2px #ccc;
  background: #eee;
}

.legends.open {
  height: auto;
}

.legends button {
  outline: 0;
  cursor: pointer;
  height: 44px;
  font-size: 1rem;
  padding: 5px 20px;
  border-bottom: 1px solid #ccc;
  text-align: left;
  border-right: 0;
  border-left: 0;
  border-top: 1px solid #ccc;
  width: 100%;
  background: #eee;
}

.legends button span {
  display: inline-block;
  float: right;
}

svg {
  width: 50px;
  height: 50px;
  fill: #000;
}
</style>
.hamburguer {
  display: none;
}
<style>

