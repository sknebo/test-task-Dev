<template>
    <transition name="notice">
        <v-card class="notice" v-if="noticeShow">
            <v-card-title>Уведомление</v-card-title>
            <v-card-subtitle class="pr-12">Текущий адрес: {{ address }}</v-card-subtitle>
            <v-card-subtitle>
                <span>Расстояние на машине: {{ carDistance }}</span>
                <br>
                <span>Расстояние по воздуху: {{ airDistance }}</span>
            </v-card-subtitle>
            <v-card-actions class="justify-center">
                <v-btn
                    class=""
                    small
                    elevation="3"
                    color="primary"
                    @click="showNotice(false)"
                >
                    Закрыть
                </v-btn>
            </v-card-actions>
        </v-card>
    </transition>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';

export default {
    name: 'Notice',
    data: () => ({}),
    computed: {
        ...mapState({
            noticeShow: state => state.noticeShow,
            address: state => state.map.address,
        }),
        ...mapGetters('map', {
            carDistance: 'getFormatCarDistance',
            airDistance: 'getFormatAirDistance'
        })
    },
    methods: {
        ...mapActions([
            'showNotice'
        ]),
    }
};
</script>

<style lang="scss">
.notice-enter-active {
    animation: show 1s;
}

.notice-leave-active {
    animation: close 1s;
}

@keyframes show {
    from {
        transform: translateX(calc(100% * 2));
    }

    to {
        transform: translateX(0);
    }
}

@keyframes close {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(calc(100% * 2));
    }
}

</style>

<style scoped lang="scss">
.v-card__title {
    word-break: break-word;
}
</style>
