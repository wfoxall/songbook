<template>
  <v-container class="song">
    <v-row>
      <!-- <v-col cols="1">
        <v-btn @click="close">Back</v-btn>
      </v-col> -->
      <v-col cols="11">
        <!-- <button @click="chords">Toggle Chords</button> -->
        <div class="content" v-if="song.html"  v-html="song.html"></div>
        <div v-else>Couldn't load song!!</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import APISong from '../apisong';
@Component
export default class Song extends Vue {
    @Prop({type:Object,required:true}) readonly song!: APISong;
    close(){
      this.$emit('close');
    }
    chords(): void{
      console.warn('Will Todo: Write this function.')
    }
}
</script>

<style lang="scss">
  button {
    @media print {
      display: none;
    }
  }
  .song {
    min-width: 40rem;
    margin: 1rem auto;
    padding: 1rem;
    // page-break-inside: auto;
    // background-color: #f0f0f0;
    @media print {
      // background-color: #fff;
    }
  }
  .content > h1 {
    page-break-after: avoid;
    display: block;
  }
  .chord-sheet {
    page-break-before: avoid;
    page-break-inside: auto;
    display: block;
    padding: 1rem;
  }
  .paragraph {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem 1rem;
    &.chorus {
      border: 1px none #bbb;
      border-left-style: solid;
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    text-align: start;
    gap: 0.25rem 0rem;
    .column {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-content: space-between;
      min-width: max-content;
      .chord {
        flex: 1;
        font-weight: bold;
        color: #676b74;
      }
      .lyrics {
        flex: 1;
        white-space: pre-wrap;
      }
    }
  }
  .comment {
    color: #444;
    display: flex;
    font-style: italic;
    text-decoration: underline;
    padding-bottom: 0.5rem;
  }
</style>