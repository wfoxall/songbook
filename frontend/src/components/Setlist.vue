<template>
    <v-container
    @keypress.right="nextSong()"
    align-start class="ma-0" fluid>
        <v-row align-centre justify-centre cols="12">
            <Song v-if="song" :song="song"/>
            <v-card v-else>Setlist is empty!</v-card>
        </v-row>
        <v-footer padless absolute class="ml-90">
            <v-card width="100%" height="4rem">
                <v-container fill-height>
                    <v-row align="center" justify="center" >
                        <!-- <v-btn
                        @click="prevSong()"
                        :disabled="currentSongIdx===0">
                            Prev
                        </v-btn>
                        <v-chip class="mx-1">{{currentSongIdx+1}}</v-chip>
                        <v-btn
                        @click="nextSong()"
                        :disabled="currentSongIdx>=(setlist.songs.length-1)">
                            Next
                        </v-btn> -->
                        <v-pagination v-model="CurrentSongNum" :length="setlist.songs.length"></v-pagination>
                    </v-row>
                </v-container>
            </v-card>
        </v-footer>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import { getSong } from '../api';
import APISetlist from '../apisetlist';
import APISong from '../apisong';
import Song from '../components/Song.vue';
@Component({components:{Song}})
export default class SetList extends Vue {
    @Prop({type:Object,required:true}) readonly setlist!: APISetlist;
    @Prop({type:Object,required:false}) readonly song!: APISong;
    currentSongIdx = 0;
    created() {
        this.loadFirstSong();
    }
    mounted() {
        window.addEventListener('keydown',this.onkeydown)
        this.loadFirstSong();
    }
    unmounted() {
        window.removeEventListener('keydown',this.onkeydown);
    }
    onkeydown(ev:KeyboardEvent){
        if(ev.key === 'ArrowRight') {
            ev.preventDefault()
            this.nextSong()
        }
        if(ev.key === 'ArrowLeft') {
            ev.preventDefault()
            this.prevSong()
        }
    }
    loadFirstSong() {
        if(this.setlist.songs.length>0)
        this.$emit('selectedsong',this.setlist.songs[0])
    }
    close(){
      this.$emit('close');
    }
    get CurrentSongNum() {
        return this.currentSongIdx+1;
    }
    set CurrentSongNum(number: number) {
        this.currentSongIdx = number-1;
        let nextsong = this.setlist.songs[this.currentSongIdx]
        this.$emit('selectedsong',nextsong)
    }
    nextSong() {
        console.log('clicky')
        if((this.setlist.songs.length-1) > this.currentSongIdx){
            this.currentSongIdx++;
            let nextsong = this.setlist.songs[this.currentSongIdx]
            console.log(`Loading ${nextsong.title}`)
            this.$emit('selectedsong',nextsong)
        }
    }
    prevSong() {
        if(this.currentSongIdx>0){
            this.currentSongIdx--;
            this.$emit('selectedsong',this.setlist.songs[this.currentSongIdx])
        }
    }
}
</script>

<style lang="scss">

</style>