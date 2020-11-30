import React from 'react';
import YMap from './Map/Map'

class App extends React.Component {
  center={
    lat: 55.755826, 
    lng: 37.6173
  }
  zoom = 10

  render() {
    return (
      <div style={{ height: "100%"}}>
        <YMap />
        </div>
    )
  }
}

export default App;

