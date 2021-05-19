/* eslint-disable no-unused-vars */
import { loadYmap } from "vue-yandex-maps";

export default {
  namespaced: true,
  state: {
    MKAD_COORDS: [
      [
        [37.842762, 55.774558],
        [37.842789, 55.76522],
        [37.842627, 55.755723],
        [37.841828, 55.747399],
        [37.841217, 55.739103],
        [37.840175, 55.730482],
        [37.83916, 55.721939],
        [37.837121, 55.712203],
        [37.83262, 55.703048],
        [37.829512, 55.694287],
        [37.831353, 55.68529],
        [37.834605, 55.675945],
        [37.837597, 55.667752],
        [37.839348, 55.658667],
        [37.833842, 55.650053],
        [37.824787, 55.643713],
        [37.814564, 55.637347],
        [37.802473, 55.62913],
        [37.794235, 55.623758],
        [37.781928, 55.617713],
        [37.771139, 55.611755],
        [37.758725, 55.604956],
        [37.747945, 55.599677],
        [37.734785, 55.594143],
        [37.723062, 55.589234],
        [37.709425, 55.583983],
        [37.696256, 55.578834],
        [37.683167, 55.574019],
        [37.668911, 55.571999],
        [37.647765, 55.573093],
        [37.633419, 55.573928],
        [37.616719, 55.574732],
        [37.60107, 55.575816],
        [37.586536, 55.5778],
        [37.571938, 55.581271],
        [37.555732, 55.585143],
        [37.545132, 55.587509],
        [37.526366, 55.5922],
        [37.516108, 55.594728],
        [37.502274, 55.60249],
        [37.49391, 55.609685],
        [37.484846, 55.617424],
        [37.474668, 55.625801],
        [37.469925, 55.630207],
        [37.456864, 55.641041],
        [37.448195, 55.648794],
        [37.441125, 55.654675],
        [37.434424, 55.660424],
        [37.42598, 55.670701],
        [37.418712, 55.67994],
        [37.414868, 55.686873],
        [37.407528, 55.695697],
        [37.397952, 55.702805],
        [37.388969, 55.709657],
        [37.383283, 55.718273],
        [37.378369, 55.728581],
        [37.374991, 55.735201],
        [37.370248, 55.744789],
        [37.369188, 55.75435],
        [37.369053, 55.762936],
        [37.369619, 55.771444],
        [37.369853, 55.779722],
        [37.372943, 55.789542],
        [37.379824, 55.79723],
        [37.386876, 55.805796],
        [37.390397, 55.814629],
        [37.393236, 55.823606],
        [37.395275, 55.83251],
        [37.394709, 55.840376],
        [37.393056, 55.850141],
        [37.397314, 55.858801],
        [37.405588, 55.867051],
        [37.416601, 55.872703],
        [37.429429, 55.877041],
        [37.443596, 55.881091],
        [37.459065, 55.882828],
        [37.473096, 55.884625],
        [37.48861, 55.888897],
        [37.5016, 55.894232],
        [37.513206, 55.899578],
        [37.527597, 55.90526],
        [37.543443, 55.907687],
        [37.559577, 55.909388],
        [37.575531, 55.910907],
        [37.590344, 55.909257],
        [37.604637, 55.905472],
        [37.619603, 55.901637],
        [37.635961, 55.898533],
        [37.647648, 55.896973],
        [37.667878, 55.895449],
        [37.681721, 55.894868],
        [37.698807, 55.893884],
        [37.712363, 55.889094],
        [37.723636, 55.883555],
        [37.735791, 55.877501],
        [37.741261, 55.874698],
        [37.764519, 55.862464],
        [37.765992, 55.861979],
        [37.788216, 55.850257],
        [37.788522, 55.850383],
        [37.800586, 55.844167],
        [37.822819, 55.832707],
        [37.829754, 55.828789],
        [37.837148, 55.821072],
        [37.838926, 55.811599],
        [37.840004, 55.802781],
        [37.840965, 55.793991],
        [37.841576, 55.785017],
        [37.842762, 55.774558]
      ]
    ],
    SPAWN: [37.62860552383314, 55.74281610137857],
    ymaps: null,
    userCoords: null,
    placeMarksAtMkadPolygon: null,
    placeMarksAtOtherPolygon: null,
    currentAirRouteToMkad: null,
    currentAirRouteToOtherPolygon: null,
    currentRoadRouteToMkad: null,
    currentRoadRouteToOtherPolygon: null,
    currentAddress: null,
    map: null,
    startPathPoint: null,
    otherPolygonCoords: null,
    distanceToMkad: 0,
    airDistanceToMkad: 0,
    distanceToOther: 0,
    airDistanceToOther: 0,
    diff: 5000
  },
  mutations: {
    SET_YMAPS(state, ymaps) {
      state.ymaps = ymaps;
    },
    SET_USER_COORDS(state, coords) {
      state.userCoords = coords;
    },
    SET_PLACEMARKS_AT_MKAD_POLYGON(state, placeMarks) {
      state.placeMarksAtMkadPolygon = placeMarks;
    },
    SET_PLACEMARKS_AT_OTHER_POLYGON(state, placeMarks) {
      state.placeMarksAtOtherPolygon = placeMarks;
    },
    SET_CURRENT_AIR_ROUTE_TO_MKAD(state, route) {
      state.currentAirRouteToMkad = route;
    },
    SET_CURRENT_AIR_ROUTE_TO_OTHER_POLYGON(state, route) {
      state.currentAirRouteToOtherPolygon = route;
    },
    SET_CURRENT_ROAD_ROUTE_TO_MKAD(state, route) {
      state.currentRoadRouteToMkad = route;
    },
    SET_CURRENT_ROAD_ROUTE_TO_OTHER_POLYGON(state, route) {
      state.currentRoadRouteToOtherPolygon = route;
    },
    SET_MAP(state, map) {
      state.map = map;
    },
    SET_START_PATH_POINT(state, point) {
      state.startPathPoint = point;
    },
    SET_DISTANCE_TO_MKAD(state, distance) {
      state.distanceToMkad = distance;
    },
    SET_AIR_DISTANCE_TO_MKAD(state, distance) {
      state.airDistanceToMkad = distance;
    },
    SET_DISTANCE_TO_OTHER(state, distance) {
      state.distanceToOther = distance;
    },
    SET_AIR_DISTANCE_TO_OTHER(state, distance) {
      state.airDistanceToOther = distance;
    },
    SET_CURRENT_ADDRESS(state, address) {
      state.currentAddress = address;
    },
    SET_OTHER_POLYGON_COORDS(state, coords) {
      state.otherPolygonCoords = coords;
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
        const otherPolygon = new state.ymaps.Polygon(state.otherPolygonCoords);
        otherPolygon.options.set({
          fillColor: "#36D792",
          fillOpacity: 0.4,
          strokeColor: "#007241"
        });
        state.map.geoObjects.add(otherPolygon);
        const currentAddress = await state.ymaps.geocode(state.userCoords, { kind: "locality" });
        const startPoint = new state.ymaps.Placemark(state.userCoords, {
          hintContent: "Вы находитесь здесь"
        });
        commit("SET_START_PATH_POINT", startPoint);
        commit("SET_CURRENT_ADDRESS", currentAddress.geoObjects.get(0)?.properties.get("text"));
        await dispatch("setRoutes");
        dispatch("geoObjectsAction", "add");
        dispatch("showCardDialog", true, { root: true });
      } catch (err) {
        console.log(err);
        dispatch("geoObjectsAction", "remove");
        state.map.geoObjects.add(state.currentAirRoute);
        state.map.geoObjects.add(state.startPathPoint);
      }
    },
    async setRoutes({ state, commit, dispatch }) {
      const closestPointToMkad = state.placeMarksAtMkadPolygon.getClosestTo(state.userCoords);
      const closestPointToOther = state.placeMarksAtOtherPolygon.getClosestTo(state.userCoords);
      const [closestAirPointToMkad, minAirDistanceToMkad] = await dispatch("minAirDistance", state.MKAD_COORDS);
      const [closestAirPointToOther, minAirDistanceToOther] = await dispatch("minAirDistance", state.otherPolygonCoords);
      const airPathToMkad = new state.ymaps.Polyline(
        [state.userCoords, closestAirPointToMkad],
        {},
        {
          strokeWidth: 3,
          strokeStyle: "shortdash",
          strokeColor: "#2e2e2e"
        }
      );
      const airPathToOther = new state.ymaps.Polyline(
        [state.userCoords, closestAirPointToOther],
        {},
        {
          strokeWidth: 3,
          strokeStyle: "shortdash",
          strokeColor: "#aa0a00"
        }
      );
      commit("SET_CURRENT_AIR_ROUTE_TO_MKAD", airPathToMkad);
      commit("SET_AIR_DISTANCE_TO_MKAD", Math.round(minAirDistanceToMkad * 100));
      commit("SET_CURRENT_AIR_ROUTE_TO_OTHER_POLYGON", airPathToOther);
      commit("SET_AIR_DISTANCE_TO_OTHER", Math.round(minAirDistanceToOther * 100));
      const roadPathToMkad = await state.ymaps.route([
        state.userCoords,
        closestPointToMkad.geometry.getCoordinates()
      ]);
      const roadPathToOtherPolygon = await state.ymaps.route([
        state.userCoords,
        closestPointToOther.geometry.getCoordinates()
      ]);
      commit("SET_DISTANCE_TO_MKAD", Math.round(roadPathToMkad.getLength() / 1000));
      commit("SET_DISTANCE_TO_OTHER", Math.round(roadPathToOtherPolygon.getLength() / 1000));
      roadPathToMkad.getPaths().options.set({
        strokeColor: "#1E98FF",
        opacity: 0.9,
        strokeWidth: 5
      });
      roadPathToOtherPolygon.getPaths().options.set({
        opacity: 0.9,
        strokeWidth: 5,
        strokeColor: "#007241"
      });
      commit("SET_CURRENT_ROAD_ROUTE_TO_MKAD", roadPathToMkad);
      commit("SET_CURRENT_ROAD_ROUTE_TO_OTHER_POLYGON", roadPathToOtherPolygon);
      localStorage.setItem(
        "lastClick",
        JSON.stringify({
          startPoint: state.userCoords,
          endPointOnMkad: closestPointToMkad.geometry.getCoordinates(),
          endPointOnOther: closestPointToOther.geometry.getCoordinates(),
          distanceToMkad: state.distanceToMkad,
          distanceToOther: state.distanceToOther,
          currentAddress: state.currentAddress
        })
      );
    },
    minAirDistance({ state }, coords) {
      let closestAirPoint;
      let minAirDistance = 100;
      coords[0].forEach((point) => {
        const distance = state.ymaps.coordSystem.cartesian.getDistance(point, state.userCoords);
        if (distance < minAirDistance) {
          closestAirPoint = point;
          minAirDistance = distance;
        }
      });
      return [closestAirPoint, minAirDistance];
    },
    geoObjectsAction({ state }, actionType) {
      state.map.geoObjects[actionType](state.currentRoadRouteToMkad?.getPaths());
      state.map.geoObjects[actionType](state.currentRoadRouteToOtherPolygon?.getPaths());
      state.map.geoObjects[actionType](state.currentAirRouteToMkad);
      state.map.geoObjects[actionType](state.currentAirRouteToOtherPolygon);
      state.map.geoObjects[actionType](state.startPathPoint);
    },
    setPlacemarksAtPolygon({ commit, state, getters }, type) {
      const placeMarks = type === "MKAD"
        ? getters.getPlacemarksAtPolygon(state.MKAD_COORDS)
        : getters.getPlacemarksAtPolygon(state.otherPolygonCoords);
      const placeMarksAtPolygon = state.ymaps
        .geoQuery(placeMarks)
        .addToMap(state.map)
        .setOptions("visible", false);
      commit(`SET_PLACEMARKS_AT_${type}_POLYGON`, placeMarksAtPolygon);
    }
  },
  getters: {
    getPlacemarksAtPolygon: (state) => (coords) => {
      const placeMarks = [];
      for (let i = 0; i < coords[0].length; i++) {
        placeMarks.push(new state.ymaps.Placemark(coords[0][i]));
      }
      return placeMarks;
    }
  }
};
