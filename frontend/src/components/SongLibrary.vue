<template>
    <div class="songlist">
        <div class="songlistItem" v-for="song of songs" :key="song.filename" @click="selectSong(song)">
            {{song.title}} - {{song.artist}}
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import APISong from '../apisong';

@Component
export default class SongLibrary extends Vue {
    songs: APISong[] = [];

    created() {
        this.fetchSonglist();
    }

    mounted() {
        this.fetchSonglist();
    }

    async fetchSonglist() {
        console.log('Fetching songlist...')
        this.songs = await fetch('http://localhost:3000/songs').then(resp=>resp.json())
    }

    selectSong(song: APISong): void {
        console.log("click")
        this.$emit('selected',song);
    }

}
</script>

<style lang="scss" scoped>
    .songlist {
        height: 90vh;
        text-align: start;
        display: flex;
        gap: 0.2rem 1rem;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .songlistItem {
        background-color: lightblue;
        &:hover {
            background-color: lightcoral;
        }
    }
</style>