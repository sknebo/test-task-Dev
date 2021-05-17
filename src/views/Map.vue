<template>
    <v-layout class="map__wrap">
        <yandex-map @map-was-initialized="initMap" @click="clickOnMap" :coords="center" :zoom="zoom">
            <ymap-marker marker-id="marker" :coords="markerCoord"/>
        </yandex-map>
        <div class="notice__wrap">
            <notice/>
        </div>
    </v-layout>
</template>

<script>
import {yandexMap, ymapMarker} from 'vue-yandex-maps';
import Notice from '@/components/Notice';
import {mapState, mapActions, mapMutations} from 'vuex';

export default {
    // eslint-disable-next-line vue/no-unused-components
    components: {yandexMap, ymapMarker, Notice},
    name: 'Map',
    data: () => ({
        route: null,
        secondRoute: null,
        points: [],
        point: {},
    }),
    computed: {
        ...mapState('map', {
            mkadCoords: state => state.MKAD_COORDS,
            center: state => state.CENTER,
            zoom: state => state.ZOOM,
            map: state => state.map,
            ymaps: state => state.ymaps,
            markerCoord: state => state.currentCoords
        }),
    },
    methods: {
        ...mapActions('map', [
            'buildRoutes',
            'addMkadPoligon'
        ]),
        ...mapMutations('map', [
            'SET_MAP',
            'SET_YMAPS'
        ]),
        ...mapActions([
            'addErrors',
        ]),
        initMap: function (instance) {
            if (instance) {
                this.SET_MAP(instance);
                if (window.ymaps) {
                    this.SET_YMAPS(window.ymaps);
                    const mkadPoligon = new this.ymaps.Polygon(this.mkadCoords);
                    this.addMkadPoligon(mkadPoligon);
                    this.ymaps.geoQuery(mkadPoligon).addToMap(this.map);
                } else {
                    this.addErrors('missing instance map');
                }
            } else {
                this.addErrors('missing instance map');
            }
        },
        clickOnMap: async function (e) {
            const coords = e.get('coords');
            await this.buildRoutes(coords);
        },
    },
    async mounted() {
        // await this.loadYmaps();
    }
};
</script>

<style lang="scss">
html {
    overflow: hidden !important;
}


</style>
<style scoped lang="scss">
.map__wrap {
    width: 100%;
    height: 100%;
    position: relative;
}

.ymap-container {
    width: 100%;
    height: 100%;
}

.v-progress-circular {
    position: absolute;
    right: 50px;
    bottom: 100px;
}

.notice__wrap {
    position: absolute;
    top: 50px;
    right: 10px;
    width: 100%;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
}


</style>

