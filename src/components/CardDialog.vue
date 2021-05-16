<template>
  <v-card
      elevation="2"
      class="card"
      :class="{show: isShow}"
    >
    <v-card-title>Информация</v-card-title>
    <v-card-text>
      <div>
        Текущий адрес: <address class="card__address"> {{ address || "Неопределено" }} </address>
      </div>
      <div>
        Расстояние до МКАДа: {{ distance }}км
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="primary" @click="hideCard">Понятно</v-btn>
    </v-card-actions>
    </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState({
    address: (state) => state.mapModule.currentAddress,
    distance: (state) => state.mapModule.distance,
    isShow: (state) => state.showCardDialog
  }),
  methods: {
    ...mapActions(["showCardDialog"]),
    hideCard() {
      this.showCardDialog(false);
    }
  }
};
</script>
<style lang="scss">
.card{
  position: absolute!important;
  z-index: 1000;
  width: 300px;
  right: 0;
  top: -100%;
  &.show{
    top: 7%;
    transition: top .3s cubic-bezier(0.215, 0.610, 0.355, 1);
  }
  &__address{
    display: inline;
  }
}
</style>
