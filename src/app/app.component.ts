import { Component } from '@angular/core';
import { data_MKAD } from './data/MKAD';

import { YaReadyEvent } from 'angular8-yandex-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  
  public coords: number[] = [];
  private mkad_km = data_MKAD;
  public feature = {
    geometry: {
      type: "Polygon",
      coordinates: [
        this.mkad_km
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
    this.mkad_km.forEach(km => {
      km.push(1);
      km[2] = km[0];
      km.splice(0, 1);
    });
  }

  public onReady(e: YaReadyEvent<ymaps.Map>) {
    e.target.events.add('click', (e) => {
      this.coords = <[]>e.get('coords');
    })
  }
}
