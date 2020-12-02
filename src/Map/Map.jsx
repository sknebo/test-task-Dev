import * as React from 'react';
import { YMaps, Map, Placemark, Polygon, Polyline } from 'react-yandex-maps';
import { store } from 'react-notifications-component';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import moscow from '../moscow.json'



class YMap extends React.Component {
    state = {
        marker: [],
        markerAddress: "",
        closestPoint: [],
        polyline: [],
        route: null,
        airDistance: null,
        carDistance: null,
    }
    data = []
    myMap
    map
    polygonInst

    geocode() {
        this.map.geocode(this.state.marker)
            .then((result) => this.setState({ markerAddress: result.geoObjects.get(0).getAddressLine() }))
            .then(() => {
                store.addNotification({ // this is the handler for generating notifications
                    title: "Текущий адрес",
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

    getClosestPoint() { // function to find the nearest point
        const closestPoint = this.polygonInst.geometry.getClosest(this.state.marker)
        this.setState({ closestPoint: closestPoint.position })
        this.setState({airDistance: closestPoint.distance})
        this.setState({ polyline: [this.state.marker, closestPoint.position] })
        // console.log(closestPoint)
    }

    addRoute = () => { // function to add a route
        if (this.map) {
            this.map
                .route(this.state.polyline)
                .then(response => {
                    if (this.state.route) this.myMap.geoObjects.remove(this.state.route);
                    this.myMap.geoObjects.add(response);
                    this.setState({ route: response })
                    this.setState({ carDistance: response.getLength() })
                });
        }
    }

    setLocalStorage(){ // function to set local storage data
        let data = {
            from: this.state.marker, 
            to: this.state.closestPoint,
            airDistance: this.state.airDistance,
            carDistance: this.state.carDistance
        }
        this.data.push(data)
        localStorage.setItem("data", JSON.stringify(this.data))
    }


    render() {
        return (
            <YMaps
                query={{ apikey: '33b83829-e9aa-40ba-8cc3-3c6247061f63' }}
            >
                <ReactNotification />
                <Map
                    modules={['geocode', 'route']}
                    defaultState={{ center: [55.75, 37.57], zoom: 10 }}
                    width={"100%"}
                    height={"100vh"}
                    onClick={(event) => {
                        this.setState({ marker: event.get('coords') })
                        this.geocode()
                        this.getClosestPoint()
                        this.addRoute()
                        this.setLocalStorage()
                    }}
                    onLoad={(map) => this.map = map}
                    instanceRef={(ref) => this.myMap = ref}

                >
                    <Polygon
                        instanceRef={(ref) => this.polygonInst = ref}
                        geometry={moscow.coordinates}
                        options={{ visible: false }}
                    />
                    {this.state.marker &&
                        <Placemark
                            geometry={this.state.marker}
                        />}
                    {this.state.polyline &&
                        <Polyline geometry={this.state.polyline}
                        />}

                </Map>
            </YMaps>
        );
    }
}

export default YMap;



