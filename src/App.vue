<template>
  <div id="app">
    <yandex-map
        zoom="10"
        style="width: 100%; height: 100vh"
        :coords="coords"
        @click="onClick"
        @map-was-initialized="init"
    />
  </div>
</template>

<script>
import {yandexMap, loadYmap} from 'vue-yandex-maps';
import moscow from './moscow';

export default {
  name: "App",
  components: {yandexMap},
  data: () => ({
    coords: [55.76, 37.64],
    moscowCoords: moscow,
    nearest_points: [],
    myGeoObjectsCollection: null,
    byRoadRoute: null,
    polyline: null,
    shortestRoute: null,
    map: []
  }),
  methods: {
    async onClick(e) {
      this.coords = e.get('coords');
      // eslint-disable-next-line
      const address = (await ymaps.geocode(this.coords))
          .geoObjects
          .get(0)
          .properties
          .getAll()
          .text;
      //ближайшая точка на полигоне
      const nearestPoints = [];
      this.myGeoObjectsCollection.each(it => {
        nearestPoints.push(it.geometry.getClosest(this.coords));
      });
      const closestPoint = nearestPoints[0].position;
      this.showShortestRoute(closestPoint);
      await this.showAutoRoute(closestPoint);
      this.showAlert(address);
    },
    showShortestRoute(point) {
      // Напрямую
      // eslint-disable-next-line
      this.shortestRoute = Math.round(ymaps.coordSystem.geo.getDistance(point, this.coords) / 1000);
      // Удаление старой линии
      this.polyline && this.map.geoObjects.remove(this.polyline);
      // eslint-disable-next-line
      this.polyline = new ymaps.Polyline(
          [this.coords, point],
          {
            hintContent: "Напрямую"
          },
          {
            draggable: false,
            strokeColor: '#5666db',
            strokeWidth: 2,
            strokeStyle: '1 2'
          });
      this.map.geoObjects.add(this.polyline);
    },
    async showAutoRoute(point) {
      // eslint-disable-next-line
      const route = await ymaps.route(
          [this.coords, point],
          {
        mapStateAutoApply: false
      });
      // Удаление старого маршрута
      this.byRoadRoute && this.map.geoObjects.remove(this.byRoadRoute);
      this.byRoadRoute = route;
      route.getPaths().options.set({
            // внешний вид маршрута
            strokeColor: '040f58',
            opacity: 0.6
          });
          this.map.geoObjects.add(route);
    },
    showAlert(address) {
      // Уведомление
        console.log(`
Адрес клика: ${address}
На машине: ${Math.round(this.byRoadRoute.getLength() / 1000)}км
Напрямую: ${this.shortestRoute}км
`)
    },
    init(map) {
      this.map = map;
      // eslint-disable-next-line
      this.myGeoObjectsCollection = new ymaps.GeoObjectCollection();
      // Подгрузка МКАДа
      // eslint-disable-next-line
      this.myGeoObjectsCollection.add(new ymaps.Polygon(this.moscowCoords));
      this.myGeoObjectsCollection.options.set({
        draggable: false,
        inderactive: 'none'
      });
      this.map.geoObjects.add(this.myGeoObjectsCollection);
    },
  },
  async mounted() {
    await loadYmap();
  },
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.ymap-container {
  height: 100%;
}

.red {
  color: red;
}
</style>