import * as React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

interface MarkerProps {

}


// interface MapProps {
//     center: Coord;
//     zoom: number;
// }

class YMap extends React.Component {
  state = {
      marker: []
  }
  clickOnMap = (event: any) => {
    const coord = event.get('coord')
    console.log(coord)
    this.setState({marker: [coord]})
  }
  render() {
    return (
      <YMaps query={{
        apikey: '33b83829-e9aa-40ba-8cc3-3c6247061f63'
      }}>
          <Map 
          defaultState={{ center: [55.75, 37.57], zoom: 9}}
          width={"100%"}
          height={"100vh"}
          onClick={(event: any) => this.setState({marker: event.get('coords')})}
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



