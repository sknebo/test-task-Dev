<template>
    <yandex-map :coords="coords" :zoom="9" @click="setUserCoords">
      <ymap-marker
        marker-id="3"
        hint-content="МКАД"
        marker-type="polygon"
        :coords="mkadCoords"
      ></ymap-marker>
      <ymap-marker
        v-if="userCoords"
        marker-id="4"
        hint-content="Вы находитесь здесь"
        :coords="userCoords"
      ></ymap-marker>
    </yandex-map>
</template>
<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    coords: [
      55.74281610137857,
      37.62860552383314,
    ],
    userCoords: null
  }),
  computed: mapState({ mkadCoords: (state) => state.MKAD_COORDS }),
  methods: {
    setUserCoords(e) {
      this.userCoords = e.get("coords");
    }
  },
};
</script>
