export default {
    actions: {
        addToHistory(ctx, history) {
            ctx.commit('updateHistory', history);
        },
    },
    mutations: {
        updateAddress(state, newAddress) {
            state.currentAddress = newAddress.address;
            state.currentCoords = newAddress.coords;
        },
        updateHistory(state, newAddress) {
            state.addresses.push(newAddress);
        },
    },
    state: {
        currentAddress: '',
        currentCoords: '',
        mkadCoords: '',
        currentDistance: 0,
        addresses: [],
    },
    getters: {
        allData(state) {
            return {
                history: state.addresses,
                currentAddress: state.currentAddress,
                currentCoords: state.currentCoords,
                mkadCoord: state.mkadCoords,
            };
        },
    },
};
