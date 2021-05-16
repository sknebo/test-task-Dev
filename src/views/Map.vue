<template>
  <section class="map">
    <card-dialog></card-dialog>
    <yandex-map
      :coords="spawn"
      :zoom="9"
      @click="getRoute"
      @map-was-initialized="initializeMkadPolygon"
    >
    </yandex-map>
  </section>
</template>
<script>
import CardDialog from "@/components/CardDialog.vue";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers("mapModule");
export default {
  components: {
    CardDialog
  },
  async mounted() {
    await this.loadYmaps();
  },
  computed: mapState({
    mkadCoords: (state) => state.MKAD_COORDS,
    spawn: (state) => state.SPAWN,
    ymaps: (state) => state.ymaps,
    map: (state) => state.map,
  }),
  methods: {
    ...mapActions([
      "loadYmaps",
      "buildRoutes",
      "setPlacemarksAtPolygon"
    ]),
    ...mapMutations([
      "SET_USER_COORDS",
      "SET_MAP",
    ]),
    async getRoute(e) {
      this.SET_USER_COORDS(e.get("coords"));
      this.setPlacemarksAtPolygon();
      this.buildRoutes();
    },
    initializeMkadPolygon(map) {
      this.SET_MAP(map);
      const mkad = new this.ymaps.Polygon(this.mkadCoords);
      this.ymaps.geoQuery(mkad).addToMap(this.map);
    },
  },
};
</script>
<style lang="scss">
.map{
  height: 100%;
}
</style>
