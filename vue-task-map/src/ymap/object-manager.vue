<template>
  <div><slot :objectManager="manager"></slot></div>
</template>

<script>
import ymaps from './ymaps';

export default {
  props: {
    map: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({
        //
      }),
    },
  },
  data: () => ({
    manager: null,
    clickObjectId: null,
  }),
  methods: {
    click(event) {
      const objectId = event.get('objectId');
      this.$emit('click', event, objectId);
    },
  },
  created() {
    this.manager = new ymaps.state.ObjectManager(this.options);
    this.manager.objects.events.add('click', this.click);
    this.map.geoObjects.add(this.manager);
  },
  beforeDestroy() {
    this.manager.objects.events.remove('click', this.click);
    this.map.geoObjects.remove(this.manager);
    this.manager = null;
  },
};
</script>
