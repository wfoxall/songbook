<template>
  <v-app>
    <v-navigation-drawer
    permanent
    mini-variant
    expand-on-hover
    app>
      <v-list>
        <v-list-item link @click="closeSong">
          <v-list-item-icon><v-icon>mdi-bookshelf</v-icon></v-list-item-icon>
          <v-list-item-title>Library</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-if="!currentSong" v-slot:append>
        <v-container>
          <v-switch v-model="sortbytitle" :label="`Sort by ${sortbytitle ? 'title' : 'artist'}`"></v-switch>
        </v-container>
      </template>
    </v-navigation-drawer>
    <v-main class="px-20">
      <Song v-if="currentSong" :song="currentSong" @close="closeSong"/>
      <SongLibrary v-else @selected="onSongSelected" :sortby="sortbytitle ? 'title' : 'artist'"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import APISong from './apisong';
import Song from './components/Song.vue';
import SongLibrary from './components/SongLibrary.vue';

@Component({
  components: {
    Song,
    SongLibrary
  }
})
export default class App extends Vue{
  sortbytitle = false;
  currentSong: APISong | null = null;
  onSongSelected(song: APISong){
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
