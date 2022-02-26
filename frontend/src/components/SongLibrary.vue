<template>
    <v-layout class="songlist"
    gap
    align-center 
    justify-space-around
    wrap>
        <v-card class="songlistItem ma-2" link
        width="20rem" height="5rem"
        v-for="song of Songs" :key="song.filename" 
        @click="selectSong(song)">
        <v-card-title>{{song.title}}</v-card-title>
        <v-card-subtitle>{{song.artist}}</v-card-subtitle>
            <!-- {{song.title}} - {{song.artist}} -->
        </v-card>
    </v-layout>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import APISong from '../apisong';

@Component
export default class SongLibrary extends Vue {
    songs: APISong[] = [];
    @Prop({type: String, default: 'title'}) readonly sortby!: 'artist'|'title';

    created() {
        this.fetchSonglist();
    }

    mounted() {
        this.fetchSonglist();
    }

    async fetchSonglist() {
        console.log('Fetching songlist...')
        this.songs = await fetch('/songs').then(resp=>resp.json())
    }

    selectSong(song: APISong): void {
        console.log("click")
        this.$emit('selected',song);
    }

    get Songs(): APISong[] {
        if(this.sortby === 'artist') {
            return this.songs.sort((a,b)=>a.artist > b.artist ? 1 : -1)
        }else {
            return this.songs.sort((a,b)=>a.title > b.title ? 1 : -1)
        }
    }

}
</script>

<style lang="scss" scoped>
    // .songlist {
    //     height: 90vh;
    //     text-align: start;
    //     display: flex;
    //     gap: 0.2rem 1rem;
    //     flex-direction: column;
    //     flex-wrap: wrap;
    // }
    // .songlistItem {
    //     background-color: lightblue;
    //     &:hover {
    //         background-color: lightcoral;
    //     }
    // }
</style>