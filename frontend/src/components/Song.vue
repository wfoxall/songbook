<template>
  <v-flex class="song ma-1" max-width="100%">
    <v-row class="pa-1 ma-1">
      <!-- <v-col cols="1">
        <v-btn @click="close">Back</v-btn>
      </v-col> -->
      <v-col cols="12">
        <!-- <button @click="chords">Toggle Chords</button> -->
        <div class="content" :class="{horizontal:horizontal}" v-if="song.html"  v-html="song.html"></div>
        <div v-else>Couldn't load song!!</div>
      </v-col>
    </v-row>
  </v-flex>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import APISong from '../apisong';
@Component
export default class Song extends Vue {
    horizontal = true;
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
  .content.horizontal .chord-sheet {
    display: flex;
    max-height: 90vh;
    flex-direction: column;
    flex-wrap: wrap;
    overflow-x: auto;
    gap: 2rem;
  }
  .chord-sheet {
    page-break-before: avoid;
    page-break-inside: auto;
    padding: 1rem;
  }
  .paragraph {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem 1rem;
    &.verse,&.chorus{
      background-color: #fafbfc;
    }
    &.chorus {
      border: 1px none #bbb;
      border-left-style: solid;
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    text-align: start;
    gap: 0.25rem 0rem;
    .column {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-content: space-between;
      min-width: max-content;
      .chord {
        font-size: 0.8rem;
        flex: 1;
        font-weight: bold;
        color: #373f50;
        border-radius: 0.2rem;
        background-color: #eaeff8;
        align-self: flex-start;
        min-width: 2rem;
        text-align: center;
        margin: 0.1rem;
        &:empty {
          background-color: unset;
          min-width: unset;
        }
      }
      .lyrics {
        flex: 1;
        white-space: pre-wrap;
      }
    }
  }
  .comment {
    color: rgb(116, 116, 116);
    display: flex;
    font-style: italic;
    text-decoration: underline;
    padding-bottom: 0.5rem;
  }
</style>