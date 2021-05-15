<template>
  <yandex-map
    :coords="spawn"
    :zoom="9"
    @click="getRoute"
    @map-was-initialized="initializePolygon"
  >
  </yandex-map>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers("mapModule");
export default {
  async mounted() {
    await this.loadYmaps();
  },
  computed: mapState({
    mkadCoords: (state) => state.MKAD_COORDS,
    spawn: (state) => state.SPAWN,
    ymaps: (state) => state.ymaps,
    placeMarksAtPolygon: (state) => state.placeMarksAtPolygon,
    userCoords: (state) => state.userCoords,
    map: (state) => state.map,
  }),
  methods: {
    ...mapActions(["loadYmaps", "buildRoute"]),
    ...mapMutations([
      "SET_USER_COORDS",
      "SET_PLACEMARKS_AT_POLYGON",
      "SET_MAP"
    ]),
    getRoute(e) {
      this.SET_USER_COORDS(e.get("coords"));
      this.setPlacemarksAtPolygon();
      this.buildRoute();
    },
    setPlacemarksAtPolygon() {
      const placeMarksAtPolygon = this.ymaps
        .geoQuery(this.getPlacemarksAtPolygon())
        .addToMap(this.map)
        .setOptions("visible", false);
      this.SET_PLACEMARKS_AT_POLYGON(placeMarksAtPolygon);
    },
    initializePolygon(map) {
      this.SET_MAP(map);
      const mkad = new this.ymaps.Polygon(this.mkadCoords);
      this.ymaps.geoQuery(mkad).addToMap(this.map);
    },
    getPlacemarksAtPolygon() {
      const placeMarks = [];
      for (let index = 0; index < this.mkadCoords[0].length; index++) {
        placeMarks.push(new this.ymaps.Placemark(this.mkadCoords[0][index]));
      }
      return placeMarks;
    },
  },
};
</script>
