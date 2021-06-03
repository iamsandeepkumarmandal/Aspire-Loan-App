<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import '@/assets/scss/common/_base.scss';
import Header from '@/components/header/index.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>
