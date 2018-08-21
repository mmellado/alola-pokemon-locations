<script>
import menuData from '../../data/menu';

export default {
  name: 'Menu',
  data: () => ({
    menuData,
  }),
};
</script>

<template>
  <nav>
    <ol>
      <li v-for="location in menuData" v-bind:key="location.id">
        <a v-bind:href="'#' + location.id">{{location.name}}</a>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
li {
  margin-bottom: 7px;
  padding-left: 25px;
  position: relative;
}

li:before {
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
</style>
