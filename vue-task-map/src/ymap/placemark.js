import ymaps from './ymaps';

export default {
  props: {
    map: {
      type: Object,
      required: true,
    },
    objectManager: {
      type: Object,
    },
    coords: {
      type: Array,
      required: true,
    },
    objectId: {
      type: Number,
    },
  },
  data: () => ({
    placemark: null,
  }),
  watch: {
    coords(newValue, oldValue) {
      if (!this.placemark) return;

      const [newLat, newLon] = newValue;
      const [oldLat, oldLon] = oldValue;

      if (newLat === oldLat && newLon === oldLon) return;

      // eslint-disable-next-line no-console
      console.log([newLat, newLon]);

      if (this.objectManager) {
        this.placemark.geometry.coordinates = newValue;

        this.objectManager
          .remove(this.placemark)
          .add(this.placemark);
      } else {
        this.placemark.geometry.setCoordinates(newValue);
      }
    },
    objectId(newValue, oldValue) {
      if (!this.placemark || newValue === oldValue) return;

      // eslint-disable-next-line no-console
      console.log(newValue);

      if (this.objectManager) {
        this.placemark.id = newValue;

        this.objectManager
          .remove(this.placemark)
          .add(this.placemark);
      }
    },
  },
  methods: {
    click(event) {
      this.$emit('click', event);
    },
  },
  created() {
    if (this.objectManager) {
      this.placemark = {
        type: 'Feature',
        id: this.objectId,
        geometry: {
          type: 'Point',
          coordinates: this.coords,
        },
      };
      this.objectManager.add(this.placemark);
    } else {
      this.placemark = new ymaps.state.Placemark(this.coords);
      this.placemark.events.add('click', this.click);
      this.map.geoObjects.add(this.placemark);
    }
  },
  beforeDestroy() {
    if (!this.placemark) return;

    if (this.objectManager) {
      this.objectManager.remove(this.placemark);
    } else {
      this.placemark.events.remove('click', this.click);
      this.map.geoObjects.remove(this.placemark);
      this.placemark = null;
    }
  },
  render: (h) => h(),
};
