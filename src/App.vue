<template>
  <div id="app">
    <notifications group="info" />
    <yandex-map   zoom="10"
                  style="width: 100%; height: 100vh"
                  :coords="coords"
                  @click="onClick"
                  @map-was-initialized="init"
                >


    </yandex-map>
  </div>
</template>

<script>

  import { yandexMap, loadYmap} from 'vue-yandex-maps';
  import moscow from './moscow';

  export default {
    name: "App",
    components: { yandexMap},
    data: () => ({
      coords: [55.76, 37.64],
      moscowCoords: moscow,
      nearest_points:[],
      myGeoObjectsCollection:null,
      myRoute:null,
      polyline:null,
      byAirRoute :null,
      myMap:[]
    }),



    methods: {
      onClick(e) {
        this.coords = e.get('coords');

        //узнаем адрес
        var address = '';
        // eslint-disable-next-line
        var myReverseGeocoder = ymaps.geocode(this.coords);
        myReverseGeocoder.then(
                function (res) {
                  address= res.geoObjects.get(0).properties.getAll().text;
                }
        )

        //ближайшая точка на полигоне
        const coords = this.coords;
        const nearest_points= [];
        this.myGeoObjectsCollection.each(function (object) {
          nearest_points.push(object.geometry.getClosest(coords));
        });
        this.nearest_points = nearest_points;
        var closestPoint = this.nearest_points[0].position;

        // Оно летает! Расстояние напрямую
        // eslint-disable-next-line
        this.byAirRoute = Math.round(ymaps.coordSystem.geo.getDistance(closestPoint, this.coords)/1000);

        //строим линию напрямую
        var geometry = [this.coords, closestPoint],
          properties = {
                  hintContent: "Летим без пробок!"
                },
          options = {
            draggable: false,
            strokeColor: '#000',
            strokeWidth: 4,
            strokeStyle: '1 2'
          };
        this.polyline && this.myMap.geoObjects.remove(this.polyline);
        // eslint-disable-next-line
        this.polyline = new ymaps.Polyline(geometry, properties, options);
        this.myMap.geoObjects.add(this.polyline);

        //создаем маршрут авто
       const routeCreate =(coords, closestPoint)=>{
           return(
              // eslint-disable-next-line
              ymaps.route([
                coords,
                closestPoint
              ], {
                mapStateAutoApply: false
              }).then( (route) => {
                return(
                  this.myRoute && this.myMap.geoObjects.remove(this.myRoute),
                  this.myRoute = route,
                  route.getPaths().options.set({
                    // внешний вид маршрута
                    strokeColor: '0000ffff',
                    opacity: 0.9
                  }),

                  // добавляем маршрут на карту
                   this.myMap.geoObjects.add(route),

                  //уведомление
                    this.$notify({
                      group: 'info',
                      title: 'Адрес клика',
                      text: `${address} <br><hr>
                             на машине: ${Math.round(route.getLength()/1000)} km <br>
                             на ковре-самолете: ${this.byAirRoute} km`
                    })
                )}
              )

           )
         }
         routeCreate(this.coords, closestPoint)
      },

      init(map) {
        this.myMap = map;
        //Строим полигон
        // eslint-disable-next-line
        this.myGeoObjectsCollection = new ymaps.GeoObjectCollection();
        // eslint-disable-next-line
        this.myGeoObjectsCollection.add (new ymaps.Polygon(this.moscowCoords))
        this.myGeoObjectsCollection.options
                .set({
                  draggable: false,
                  inderactive: 'none'
                });

        this.myMap.geoObjects.add(this.myGeoObjectsCollection)

      },

    },
    async mounted() {
      await loadYmap();


    },

  }

</script>

<style>
  body {
    margin:0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .ymap-container {
    height: 600px;
  }
  .red {
    color: red;
  }
</style>
