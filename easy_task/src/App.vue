<template>
  <div id="app">
    <yandex-map
      :settings="settings"
      :coords="coords"
      :zoom="10"
      @click="onClick"
    >
      <ymap-marker
        :coords="coords"
        marker-id="123"
        hint-content="some hint"
        :balloon-template="balloonTemplate"
      />
    </yandex-map>
  </div>
</template>
<script>
export default {
  data: () => ({
    coords: [55.751173, 37.622423],
    addr: "Здесь адрес доставки",
  }),
  computed: {
    balloonTemplate() {
      return `<p>Вы кликнули сюда: ${this.coords}</p>`;
    },
  },
  methods: {
    onClick(e) {
      this.coords = e.get("coords");
    },
  },
  name: "App",
  components: {},
};
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}

.ymap-container {
  height: 100%;
}
</style>
