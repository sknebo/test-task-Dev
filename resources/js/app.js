require('./func.js');
window.Vue = require('vue').default;
Vue.component('point', require('./vue_components/point.vue').default);

import {get_coords_area} from './data/coordinatesMKAD.js';

const app = new Vue({
    el: '#app',
    data: {
        points: {},
        objects: {},
        map: {},
        coordinates: {},
        show: {
            point_1: false,
            key_1: 1
        }
    },
    methods: {
        drawArea() {
            this.objects.area_mkad = new ymaps.Polygon([this.coordinates.mkad]);
            this.map.geoObjects.add(this.objects.area_mkad);
        },
        addListenerToMap() {
            this.map.events.add('click', function (e) {
                if (typeof app.$data.points.point_1 !== 'undefined') {
                    app.$data.map.geoObjects.remove(app.$data.points.point_1.route);
                    app.$data.map.geoObjects.remove(app.$data.points.point_1.line);
                    app.$data.map.geoObjects.remove(app.$data.points.point_1.objCollection);
                    app.$data.map.geoObjects.remove(app.$data.points.point_1.obj);
                } else {
                    app.$data.points.point_1 = {}
                }
                app.$data.points.point_1 = {}
                app.$data.points.point_1.markerCoords = e.get('coords');
                app.$data.points.point_1.obj = new ymaps.Placemark(app.$data.points.point_1.markerCoords, {},);
                app.$data.points.point_1.objCollection = ymaps.geoQuery(app.$data.points.point_1.obj).addToMap(app.$data.map);
                app.$data.points.point_1.closestPoint = app.$data.objects.area_mkad.geometry.getClosest(app.$data.points.point_1.markerCoords);
                ymaps.geocode(app.$data.points.point_1.markerCoords).then(function (res) {
                    app.$data.points.point_1.firstGeoObject = res.geoObjects.get(0);
                    app.$data.points.point_1.address = app.$data.points.point_1.firstGeoObject.getAddressLine();
                    app.$data.show.key_1 = Math.random();
                });
                ymaps.route([
                    app.$data.points.point_1.markerCoords,
                    app.$data.points.point_1.closestPoint.position
                ]).then(function (route) {
                    app.$data.points.point_1.distanceRoad = route.getLength();
                    app.$data.points.point_1.distanceDirect = ymaps.coordSystem.geo.getDistance(app.$data.points.point_1.markerCoords, app.$data.points.point_1.closestPoint.position);
                    app.$data.points.point_1.line = new ymaps.Polygon([[app.$data.points.point_1.markerCoords, app.$data.points.point_1.closestPoint.position]],
                        {},
                        {
                            strokeColor: 'rgba(65, 135, 206, 0.94)',
                            strokeWidth: 2,
                        });


                    app.$data.map.geoObjects.add(app.$data.points.point_1.route = route);
                    app.$data.map.geoObjects.add(app.$data.points.point_1.line);
                    app.$data.show.key_1 = Math.random();
                })
                app.$data.show.point_1 = true;
            })
        }
    },
});

ymaps.ready(function () {
    app.$data.map = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 9
    });
    app.$data.coordinates.mkad = get_coords_area();
    app.drawArea();
    app.addListenerToMap();
})


