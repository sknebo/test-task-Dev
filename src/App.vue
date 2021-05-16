<template>
  <v-app>
    <v-main class="main">
      <router-view/>
    </v-main>
  </v-app>
</template>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
.main {
  width: 100%;
  height: 100vh;
}
.ymap-container {
  height: 100%;
}
</style>
