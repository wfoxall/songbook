<template>
  <div id="app">
    <Song v-if="currentSong" :song="currentSong" @close="closeSong"/>
    <SongLibrary v-else @selected="onSongSelected"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Song from './components/Song.vue';
import SongLibrary from './components/SongLibrary.vue'
import APISong from './apisong';

@Component({
  components: {
    Song,
    SongLibrary
  },
})
export default class App extends Vue {
  currentSong: APISong | null = null;
  onSongSelected(song: APISong) {
    console.log(`Loading song ${song.title}...`);
    this.loadSong(song.filename);
  }
  async loadSong(filename: string) {
    this.currentSong = await fetch('http://localhost:3000/songs/'+filename)
    .then(resp=>resp.json())
    .then(song=>{
      return song;
    })
  }
  closeSong() {
    console.log('Received close event.')
    this.currentSong = null;
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  // @media print {
  //   margin: 0;
  // }
}
</style>
