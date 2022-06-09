<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.ShowFooter" />
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知Vuex发请求，获取数据，储存于仓库
    this.$store.dispatch('categoryList');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
