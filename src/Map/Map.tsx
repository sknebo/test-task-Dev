import * as React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { store } from 'react-notifications-component';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'



class YMap extends React.Component {
    state = {
        marker: [],
        markerAddress: ""
    }
    ymaps: any
    geocode() {
        this.ymaps.geocode(this.state.marker)
          .then((result: any) => this.setState({markerAddress: result.geoObjects.get(0).getAddressLine()}))
          .then(() => {store.addNotification({
            title: "Address",
            message: this.state.markerAddress,
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          })
        })
      }

    render() {
        return (
            <YMaps
                query={{ apikey: '33b83829-e9aa-40ba-8cc3-3c6247061f63' }}>
                <ReactNotification />
                <Map
                    modules={['geocode']}
                    defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                    width={"100%"}
                    height={"100vh"}
                    onClick={(event: any) => {
                        this.setState({ marker: event.get('coords') })
                        this.geocode()
                    }}
                    onLoad={(ymaps: any) => this.ymaps = ymaps}
                >
                    {this.state.marker &&
                        <Placemark
                            geometry={this.state.marker}
                        />}
                </Map>
            </YMaps>
        );
    }
}

export default YMap;



