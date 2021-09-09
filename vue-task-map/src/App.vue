<template>
    <div id="app">
        <y-map :center="center" v-slot="{ map }" @ready="mapReady">
            <y-object-manager :map="map" @click="objectManagerClick" v-slot="{ objectManager }">
                <y-placemark
                    :map="map"
                    :objectManager="objectManager"
                    v-for="(city, i) in cities"
                    :key="i"
                    :objectId="i"
                    :coords="city.coords"
                    @click="markerClick(city)"
                ></y-placemark>
            </y-object-manager>
        </y-map>
    </div>
</template>

<script>
export default {
  data: () => ({
    cities: [
      {
        id: 1,
        name: 'Москва',
        coords: [55.755814, 37.617635],
      },
    ],
    currentCityId: 1,
    markerCoords: [],
  }),
  computed: {
    center() {
      return this.cities.find((city) => city.id === this.currentCityId).coords;
    },
  },
  methods: {
    objectManagerClick(event, objectId) {
      const city = this.cities[objectId];
      if (city) this.markerClick(city);
    },

    mapReady() {
      //
    },
  },
};
</script>

<style>
html, body, #app {
    margin: 0;
    height: 100%;
}
#app {
    display: flex;
    flex-direction: column;
}
</style>
