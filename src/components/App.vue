<script>
import Menu from './Menu.vue';

const sunMoonMarkup = require('../../data/sun-moon.html');
const ultraSunMoonMarkup = require('../../data/ultra-sun-moon.html');

export default {
  name: 'App',
  components: { Menu },
  data: () => ({
    game: 'ultra-sun-moon',
    gameMarkup: ultraSunMoonMarkup,
  }),
  methods: {
    enableUltraSunMoon() {
      this.game = 'ultra-sun-moon';
      this.gameMarkup = ultraSunMoonMarkup;
    },
    enableSunMoon() {
      this.game = 'sun-moon';
      this.gameMarkup = sunMoonMarkup;
    },
  },
};
</script>

<template>
  <div id="wrapper">
    <header>
      <h1>Alola Pokemon Locations</h1>
      <ul>
        <li><button v-on:click="enableUltraSunMoon">Pokemon Ultra Sun and Ultra Moon</button></li>
        <li><button v-on:click="enableSunMoon">Pokemon Sun and Moon</button></li>
      </ul>
    </header>
    <main>
      <aside>
        <Menu></Menu>
      </aside>
      <div v-html="gameMarkup"></div>
    </main>
    <footer>
      <p>
        All information presented was sourced from <a href="https://bulbapedia.bulbagarden.net/" target="_blank">Bulbapedia</a>. 
        Pokémon © 2002-2018 Pokémon. © 1995-2018 Nintendo/Creatures Inc./GAME FREAK inc. TM, ® and Pokémon character names are trademarks of Nintendo.
        No copyright or trademark infringement is intended in using Pokémon content
      </p>
    </footer>
  </div>
</template>

<style scoped>
header {
  position: sticky;
  height: 100px;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1;
  background: #eee;
  box-shadow: 0 5px 5px -2px #ccc;
}

header li {
  display: inline-block;
  margin-left: 10px;
}

main {
  padding: 0 20px;
  position: relative;
}

main aside {
  width: 20%;
  position: sticky;
  top: 100px;
  left: 0;
  padding-bottom: 20px;
  height: calc(100vh - 100px);
  float: left;
  overflow: scroll;
  padding-top: 20px;
  box-shadow: -5px 0 5px -2px #ccc inset;
}

main > div {
  width: 80%;
  padding-left: 20px;
  padding-top: 20px;
  margin-left: 20%;
}
</style>
