<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in floorsList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from './ListContainer';
import Recommend from './Recommend';
import Rank from './Rank';
import Like from './Like';
import Floor from './Floor';
import Brand from './Brand';

import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    this.$store.dispatch('getFloorsList');
  },
  computed: {
    ...mapState({ floorsList: (state) => state.home.floorsList }),
  },
};
</script>

<style lang="less" scoped></style>
