<template>
    <div class="gallery">
      <div class="gallery-panel" v-for="thumbnail in thumbnails" :key="thumbnail.name">
        <router-link :to="`/photo/${thumbnail.name}`">
            <img :src="thumbnail.url">
        </router-link>
      </div>
    </div>
</template>
  
<script lang="ts" src="./Gallery.ts"></script>

<style>
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        grid-gap: 1rem;
        max-width: 80rem;
        margin: 5rem auto;
        padding: 0 5rem;
    }
    .gallery-panel img {
        width: 100%;
        height: 22vw;
        object-fit: cover;
        border-radius: 0.75rem;
  }
</style>