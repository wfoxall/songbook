<template>
    <v-layout column class="pa-2">
        <h1>Setlists</h1>
        <v-layout class="songlist"
        gap
        align-center 
        justify-space-between
        wrap>
            <v-card class="songlistItem ma-2" link
            width="20rem" height="5rem"
            v-for="setlist of Setlists" :key="setlist.name" 
            @click="selectSetlist(setlist)">
                <v-card-title>{{setlist.name}}</v-card-title>
                <v-card-subtitle>{{setlist.songs.length}} songs</v-card-subtitle>
                <!-- {{song.title}} - {{song.artist}} -->
            </v-card>
        </v-layout>
        <h1>Songs</h1>
        <v-layout class="songlist"
        gap
        align-center 
        justify-space-between
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
    </v-layout>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import APISong from '../apisong';
import {getSongList, getSetlists} from '../api';
import APISetList from '../apisetlist';

const apiroot = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

@Component
export default class Library extends Vue {
    sortbytitle = true;
    songs: APISong[] = [];
    setlists: APISetList[] = [];
    @Prop({type: String, default: 'title'}) readonly sortby!: 'artist'|'title';

    created() {
        this.fetchSonglist();
        this.fetchSetlists();
    }

    mounted() {
        this.fetchSonglist();
        this.fetchSetlists();
    }

    async fetchSonglist() {
        console.log('Fetching songlist...')
        this.songs = await getSongList();
    }

    async fetchSetlists() {
        this.setlists = await getSetlists();
    }

    selectSong(song: APISong): void {
        console.log("click")
        this.$emit('selectedsong',song);
    }
    selectSetlist(setlist: APISetList): void {
        console.log("click")
        this.$emit('selectedsetlist',setlist);
    }

    get Setlists(): APISetList[] {
        return this.setlists.sort((a,b)=>a.name > b.name ? 1 : -1)
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

</style>