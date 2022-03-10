<template>
  <v-app>
    <v-navigation-drawer
    mini-variant-width="90"
    permanent
    mini-variant
    app>
      <v-app-bar app>
        <v-row wrap align="center" justify="center">
            <v-col cols="4" xs="12" md="12">
              <v-container>
                <v-flex>
                  <v-layout column align-center>
                      <v-switch v-model="sortbytitle" :label="`Sort by ${sortbytitle ? 'title' : 'artist'}`"></v-switch>
                  </v-layout>
                </v-flex>
              </v-container>
            </v-col>
        </v-row>
      </v-app-bar>
      <v-list>
        <v-list-item link @click="openLibrary">
          <v-list-item-icon><v-icon>mdi-bookshelf</v-icon></v-list-item-icon>
          <v-list-item-title>Library</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="pt-2 pt-md-0">
      <Setlist v-if="currentSetlist" @selectedsong="onSongSelected" :song="currentSong" :setlist=currentSetlist @close="closeSetlist"/>
      <Song v-else-if="currentSong" :song="currentSong" @close="closeSong"/>
      <Library v-else @selectedsong="onSongSelected" @selectedsetlist="onSetlistSelected" :sortby="sortbytitle ? 'title' : 'artist'"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import APISong from './apisong';
import Song from './components/Song.vue';
import Library from './components/Library.vue';
import Setlist from './components/Setlist.vue';
import {getSong} from './api'
import APISetList from './apisetlist';

const apiroot = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

@Component({
  components: {
    Song,
    Library,
    Setlist
  }
})
export default class App extends Vue {

  sortbytitle = true;
  currentSong: APISong | null = null;
  currentSetlist: APISetList | null = null;

  onSongSelected(song: APISong){
    this.loadSong(song.filename);
  }
  onSetlistSelected(setlist: APISetList) {
    this.currentSetlist = setlist;
  }
  async loadSong(filename: string) {
    this.currentSong = await getSong(filename)
  }

  async onTransposeInput(value: string){
    if(!this.currentSong) return;
    const transpose = Number.parseInt(value);
    this.currentSong = await getSong(this.currentSong.filename,transpose)
  }

  openLibrary() {
    this.currentSong = null;
    this.currentSetlist = null;
  }

  closeSong() {
    console.log('Received close event.')
    this.currentSong = null;
  }

  closeSetlist() {
    this.currentSetlist = null;
  }

}
</script>
