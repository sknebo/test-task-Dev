import { loadYmap } from "vue-yandex-maps";

export default {
  namespaced: true,
  state: {
    MKAD_COORDS: [
      [
        [55.7850046012527, 37.841599741705735],
        [55.774558, 37.842762],
        [55.76522, 37.842789],
        [55.755723, 37.842627],
        [55.747399, 37.841828],
        [55.739103, 37.841217],
        [55.730482, 37.840175],
        [55.721939, 37.83916],
        [55.712203, 37.837121],
        [55.703048, 37.83262],
        [55.694287, 37.829512],
        [55.68529, 37.831353],
        [55.675945, 37.834605],
        [55.667752, 37.837597],
        [55.658667, 37.839348],
        [55.650053, 37.833842],
        [55.643713, 37.824787],
        [55.637347, 37.814564],
        [55.62913, 37.802473],
        [55.623758, 37.794235],
        [55.617713, 37.781928],
        [55.611755, 37.771139],
        [55.604956, 37.758725],
        [55.599677, 37.747945],
        [55.594143, 37.734785],
        [55.589234, 37.723062],
        [55.583983, 37.709425],
        [55.578834, 37.696256],
        [55.574019, 37.683167],
        [55.571999, 37.668911],
        [55.573093, 37.647765],
        [55.573928, 37.633419],
        [55.574732, 37.616719],
        [55.575816, 37.60107],
        [55.5778, 37.586536],
        [55.581271, 37.571938],
        [55.585143, 37.555732],
        [55.587509, 37.545132],
        [55.5922, 37.526366],
        [55.594728, 37.516108],
        [55.60249, 37.502274],
        [55.609685, 37.49391],
        [55.617424, 37.484846],
        [55.625801, 37.474668],
        [55.630207, 37.469925],
        [55.641041, 37.456864],
        [55.648794, 37.448195],
        [55.654675, 37.441125],
        [55.660424, 37.434424],
        [55.670701, 37.42598],
        [55.67994, 37.418712],
        [55.686873, 37.414868],
        [55.695697, 37.407528],
        [55.702805, 37.397952],
        [55.709657, 37.388969],
        [55.718273, 37.383283],
        [55.728581, 37.378369],
        [55.735201, 37.374991],
        [55.744789, 37.370248],
        [55.75435, 37.369188],
        [55.762936, 37.369053],
        [55.771444, 37.369619],
        [55.779722, 37.369853],
        [55.789542, 37.372943],
        [55.79723, 37.379824],
        [55.805796, 37.386876],
        [55.814629, 37.390397],
        [55.823606, 37.393236],
        [55.83251, 37.395275],
        [55.840376, 37.394709],
        [55.850141, 37.393056],
        [55.858801, 37.397314],
        [55.867051, 37.405588],
        [55.872703, 37.416601],
        [55.877041, 37.429429],
        [55.881091, 37.443596],
        [55.882828, 37.459065],
        [55.884625, 37.473096],
        [55.888897, 37.48861],
        [55.894232, 37.5016],
        [55.899578, 37.513206],
        [55.90526, 37.527597],
        [55.907687, 37.543443],
        [55.909388, 37.559577],
        [55.910907, 37.575531],
        [55.909257, 37.590344],
        [55.905472, 37.604637],
        [55.901637, 37.619603],
        [55.898533, 37.635961],
        [55.896973, 37.647648],
        [55.895449, 37.667878],
        [55.894868, 37.681721],
        [55.893884, 37.698807],
        [55.889094, 37.712363],
        [55.883555, 37.723636],
        [55.877501, 37.735791],
        [55.874698, 37.741261],
        [55.862464, 37.764519],
        [55.861979, 37.765992],
        [55.850257, 37.788216],
        [55.850383, 37.788522],
        [55.844167, 37.800586],
        [55.832707, 37.822819],
        [55.828789, 37.829754],
        [55.821072, 37.837148],
        [55.811599, 37.838926],
        [55.802781, 37.840004],
        [55.793991, 37.840965],
        [55.785017, 37.841576]
      ]
    ],
    SPAWN: [55.74281610137857, 37.62860552383314],
    ymaps: null,
    userCoords: null,
    placeMarksAtPolygon: null,
    currentAirRoute: null,
    currentRoadRoute: null,
    currentAddress: null,
    map: null,
    startPathPoint: null,
    distance: 0
  },
  mutations: {
    SET_YMAPS(state, ymaps) {
      state.ymaps = ymaps;
    },
    SET_USER_COORDS(state, coords) {
      state.userCoords = coords;
    },
    SET_PLACEMARKS_AT_POLYGON(state, placeMarks) {
      state.placeMarksAtPolygon = placeMarks;
    },
    SET_CURRENT_AIR_ROUTE(state, route) {
      state.currentAirRoute = route;
    },
    SET_CURRENT_ROAD_ROUTE(state, route) {
      state.currentRoadRoute = route;
    },
    SET_MAP(state, map) {
      state.map = map;
    },
    SET_START_PATH_POINT(state, point) {
      state.startPathPoint = point;
    },
    SET_DISTANCE(state, distance) {
      state.distance = distance;
    },
    SET_CURRENT_ADDRESS(state, address) {
      state.currentAddress = address;
    }
  },
  actions: {
    async loadYmaps({ commit }) {
      try {
        const settings = { lang: "en_US" };
        await loadYmap(settings);
        // eslint-disable-next-line no-undef
        commit("SET_YMAPS", ymaps);
      } catch (error) {
        console.log(error);
      }
    },
    async buildRoutes({ commit, state, dispatch }) {
      try {
        state.map.geoObjects.removeAll();
        state.map.geoObjects.add(new state.ymaps.Polygon(state.MKAD_COORDS));
        const currentAddress = await state.ymaps.geocode(state.userCoords, { kind: 'locality' });
        commit("SET_CURRENT_ADDRESS", currentAddress.geoObjects.get(0)?.properties.get("text"));
        const closestPoint = state.placeMarksAtPolygon.getClosestTo(state.userCoords);
        const startPoint = new state.ymaps.Placemark(state.userCoords, {
          hintContent: "Вы находитесь здесь",
        });
        commit("SET_START_PATH_POINT", startPoint);
        const airPath = new state.ymaps.Polyline(
          [state.userCoords, closestPoint.geometry.getCoordinates()],
          {},
          {
            strokeWidth: 3,
            strokeStyle: "shortdash",
            strokeColor: "#2e2e2e"
          }
        );
        commit("SET_CURRENT_AIR_ROUTE", airPath);
        const roadPath = await state.ymaps.route([
          state.userCoords,
          closestPoint.geometry.getCoordinates(),
        ]);
        commit("SET_DISTANCE", Math.round(roadPath.getLength() / 1000));
        roadPath.getPaths().options.set({
          strokeColor: "#1E98FF",
          opacity: 0.9,
          strokeWidth: 5
        });
        commit("SET_CURRENT_ROAD_ROUTE", roadPath);
        localStorage.setItem("lastClick", JSON.stringify({
          startPoint: state.userCoords,
          endPoint: closestPoint.geometry.getCoordinates(),
          distance: state.distance,
          currentAddress: state.currentAddress
        }));
        dispatch("geoObjectsAction", "add");
        dispatch("showCardDialog", true, { root: true });
      } catch (err) {
        console.log(err);
        dispatch("geoObjectsAction", "remove");
        state.map.geoObjects.add(state.currentAirRoute);
        state.map.geoObjects.add(state.startPathPoint);
      }
    },
    geoObjectsAction({ state }, actionType) {
      state.map.geoObjects[actionType](state.currentRoadRoute?.getPaths());
      state.map.geoObjects[actionType](state.currentAirRoute);
      state.map.geoObjects[actionType](state.startPathPoint);
    },
    setPlacemarksAtPolygon({ commit, state, getters }) {
      const placeMarksAtPolygon = state.ymaps
        .geoQuery(getters.getPlacemarksAtPolygon)
        .addToMap(state.map)
        .setOptions("visible", false);
      commit("SET_PLACEMARKS_AT_POLYGON", placeMarksAtPolygon);
    },
  },
  getters: {
    getPlacemarksAtPolygon: (state) => {
      const placeMarks = [];
      for (let i = 0; i < state.MKAD_COORDS[0].length; i++) {
        placeMarks.push(new state.ymaps.Placemark(state.MKAD_COORDS[0][i]));
      }
      return placeMarks;
    }
  }
};
