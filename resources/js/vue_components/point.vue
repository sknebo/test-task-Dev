<template>
  <div class="point-block">
    <div class="distance-wrapper">
      <div class="distance-title">Расстояния</div>
      <div class="distance-item">
        <div class="distance-text">Прямое растояние:</div>
        <div>{{ Math.ceil10(point.distanceDirect / 1000, -2) }} км.</div>
      </div>
      <div class="distance-item">
        <div class="distance-text">Растояние по маршруту:</div>
        <div class="distance-value">{{ Math.ceil10(point.distanceRoad / 1000, -2) }} км.</div>
      </div>
    </div>
    <div class="point-wrapper">
      <div class="point-title">Координаты выбраной точки</div>
      <div class="point-item">
        <div class="point-itemText">Ширина:</div>
        <div class="point-value">{{ Math.ceil10(point.markerCoords[0], -6) }}</div>
      </div>
      <div class="point-item">
        <div class="point-itemText">Долгота:</div>
        <div class="point-value">{{ Math.ceil10(point.markerCoords[1], -6) }}</div>
      </div>
    </div>
    <div class="point-wrapper">
      <div class="point-title">Координаты ближайшей точки на МКАД</div>
      <div class="point-item">
        <div class="point-itemText">Ширина:</div>
        <div class="point-value">{{ Math.ceil10(point.closestPoint.position[0], -6) }}</div>
      </div>
      <div class="point-item">
        <div class="point-itemText">Долгота:</div>
        <div class="point-value">{{ Math.ceil10(point.closestPoint.position[1], -6) }}</div>
      </div>
    </div>
    <div class="point-wrapper">
      <div class="address-title">Адрес</div>
      <div class="address-item">
        <div class="address-value">{{ point.address }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: ['point'],
}
</script>
