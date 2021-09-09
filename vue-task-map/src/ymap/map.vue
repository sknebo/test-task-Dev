<template>
  <div :id="id" :style="style"><slot v-if="map" :map="map"></slot></div>
</template>

<script>
import ymaps from './ymaps';

export default {
  model: {
    prop: 'center',
    event: 'boundschange',
  },
  props: {
    center: {
      type: Array,
      required: true,
    },
    zoom: {
      type: Number,
      default: 10,
    },
    options: {
      type: Object,
      default: () => ({
        autoFitToViewport: 'always',
      }),
    },
  },
  data: () => ({
    map: null,
    style: {
      width: '100%',
      height: '100%',
    },
  }),
  computed: {
    id() {
      const randomId = Math.random().toString().replace(/^0\./, '');
      return `map-${randomId}`;
    },
  },
  watch: {
    center(coords) {
      this.map.setCenter(coords);
    },
  },
  methods: {
    boundschange(event) {
      this.$emit('boundschange', event.get('newCenter'));
    },
  },
  async mounted() {
    try {
      await ymaps.loadMap();
      this.map = new ymaps.state.Map(
        this.id,
        {
          center: this.center,
          zoom: this.zoom,
        },
        this.options,
      );
      this.map.events.add('boundschange', this.boundschange);
      this.$emit('ready', this.map);
    } catch (error) {
      console.error(error);
    }
  },
  beforeDestroy() {
    this.map.events.remove('boundschange', this.boundschange);
  },
};
</script>
