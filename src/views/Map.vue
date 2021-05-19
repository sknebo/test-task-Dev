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
    diff: (state) => state.diff
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
      "SET_OTHER_POLYGON_COORDS",
    ]),
    getRoute(e) {
      this.SET_USER_COORDS(e.get("coords"));
      this.setPlacemarksAtPolygon("MKAD");
      this.setPlacemarksAtPolygon("OTHER");
      this.buildRoutes();
    },
    initializeMkadPolygon(map) {
      this.SET_MAP(map);
      const mkad = new this.ymaps.Polygon(this.mkadCoords);
      this.ymaps.geoQuery(mkad).addToMap(this.map);
      this.initializeOtherPolygon();
    },
    initializeOtherPolygon() {
      const azimuth = 0.3;
      const polygonCoordinates = [this.mkadCoords[0].map(
        (point, index) => {
          let direction;
          if (index + 1 < 27) {
            direction = [Math.cos(azimuth), -Math.sin(azimuth)];
          } else if (index + 1 >= 27 && index + 1 < 54) {
            direction = [-Math.cos(azimuth), -Math.sin(azimuth)];
          } else if (index + 1 >= 54 && index + 1 < 81) {
            direction = [-Math.cos(azimuth), Math.sin(azimuth)];
          } else {
            direction = [Math.cos(azimuth), Math.sin(azimuth)];
          }
          return this.ymaps
            .coordSystem
            .geo
            .solveDirectProblem(point, direction, this.diff)
            .endPoint;
        }
      )];
      this.SET_OTHER_POLYGON_COORDS(polygonCoordinates);
      const polygon = new this.ymaps.Polygon(polygonCoordinates);
      polygon.options.set({
        fillColor: "#36D792",
        fillOpacity: 0.4,
        strokeColor: "#007241"
      });
      this.ymaps.geoQuery(polygon).addToMap(this.map);
    }
  },
};
</script>
<style lang="scss">
.map{
  height: 100%;
}
</style>
