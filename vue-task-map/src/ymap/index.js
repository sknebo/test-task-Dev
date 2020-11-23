import mapComponent from '@/ymap/map.vue';
import objectManagerComponent from '@/ymap/object-manager.vue';
import placemarkComponent from '@/ymap/placemark';

export default {
  install(Vue) {
    Vue.component('y-map', mapComponent);
    Vue.component('y-object-manager', objectManagerComponent);
    Vue.component('y-placemark', placemarkComponent);
  },
};
