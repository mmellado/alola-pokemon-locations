<script>
import Menu from './Menu.vue';
import cleaner from '../scripts/table-cleaner';

const sunMoonMarkup = cleaner(require('../../data/sun-moon.html'));
const ultraSunMoonMarkup = cleaner(require('../../data/ultra-sun-moon.html'));

export default {
  name: 'App',
  components: { Menu },
  data: () => ({
    game: 'ultra-sun-moon',
    gameMarkup: ultraSunMoonMarkup,
    isMobileMenuOpen: false,
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
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = null;
      }
    },
    closeMenu() {
      if (this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
        document.body.style.overflow = null;
      }
    },
  },
};
</script>

<template>
  <div id="wrapper">
    <header>
      <h1 v-bind:class="game">Alola Pokemon Locations</h1>
      <ul>
        <li><button v-bind:class="{active: game === 'ultra-sun-moon'}" v-on:click="enableUltraSunMoon">Pokemon Ultra Sun and Ultra Moon</button></li>
        <li><button v-bind:class="{active: game === 'sun-moon'}" v-on:click="enableSunMoon">Pokemon Sun and Moon</button></li>
      </ul>
    </header>
    <main>
      <aside v-bind:class="{'mobile-open': isMobileMenuOpen}">
        <Menu v-bind:isMobileMenuOpen="isMobileMenuOpen" v-bind:toggleMobileMenu="toggleMobileMenu" v-bind:closeMenu="closeMenu"></Menu>
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

<style>
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
}

header button {
  height: 50px;
  line-height: 50px;
  background: #ccc;
  border: 1px solid #333;
  border-radius: 3px;
  font-size: 1.2rem;
  padding: 0 10px;
  opacity: 0.7;
  cursor: pointer;
}

header li:first-child button {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
  margin-right: -4px;
}

header li:last-child button:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

header button.active,
header button:hover {
  background: #96e0ff;
  opacity: 1;
  cursor: default;
}

header button:hover {
  text-decoration: underline;
  cursor: pointer;
}

main {
  padding: 0 20px;
  position: relative;
}

main aside {
  width: 15%;
  min-width: 200px;
  position: sticky;
  top: 100px;
  left: 0;
  height: calc(100vh - 100px);
  float: left;
  overflow-y: scroll;
  padding-top: 20px;
  box-shadow: -5px 0 5px -2px #ccc inset;
}

main > div {
  width: 85%;
  padding-left: 20px;
  padding-top: 20px;
  margin-left: 15%;
}

header h1 {
  display: block;
  width: 359px;
  height: 90px;
  color: transparent;
}

header h1.ultra-sun-moon {
  background: url('../img/ultra-sun-moon.png');
  background-size: cover;
}

header h1.sun-moon {
  background: url('../img/sun-moon.png');
  background-size: cover;
}
</style>
