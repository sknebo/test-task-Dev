import { Component } from '@angular/core';
import { data_MKAD } from './data/MKAD';

import { YaReadyEvent } from 'angular8-yandex-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public polygon!: YaReadyEvent;
  public route: any[] = [];
  private mkad_points = data_MKAD;
  public feature = {
    geometry: {
      type: "Polygon",
      coordinates: [
        this.mkad_points
      ],
      fillRule: "nonZero",
    },
    properties:{
      balloonContent: "Москва внутри МКАД"
    }
  }

  // public options = {
  //   fillColor: '#00FF00',
  //   opacity: 0.5,
  //   strokeWidth: 0,
  // }

  constructor() {
    this.mkad_points.forEach(point => {
      point.reverse();
    });
  }

  public onReady(e: YaReadyEvent<ymaps.Map>) {
    e.target.events.add('click', (e) => {
      let coords = <[]>e.get('coords');
      let closest = this.polygon.target.geometry?.getClosest(coords).position;
      console.log(closest);
      
      this.route = [];
      this.route.push(closest, coords);
    })
    
  }

  public onPolygonReady(e: YaReadyEvent<ymaps.Polygon>) {
    this.polygon = e;
  }
}
