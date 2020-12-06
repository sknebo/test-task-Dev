import { Component } from '@angular/core';
import { data_MKAD } from './data/MKAD';

import { YaReadyEvent } from 'angular8-yandex-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  private polygon!: YaReadyEvent;
  private polyline!: YaReadyEvent;
  private route!: YaReadyEvent;

  public routeCoords: any[] = [];
  public coords: number[] = [];

  private mkad_points = data_MKAD;

  public polygonFeature = {
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
  };

  public polylineFeature = {
    geometry: {
      type: "LineString",
      coordinates: []
    }
  };

  public polylineOptions = {
    strokeWidth: 5,
    strokeColor: "#3d6dd4",
    strokeStyle: 'shortdash'
  };

  public routeModel = {
    params: {
      results: 1
    }
  }

  public routeOptions = {
    wayPointVisible: false
  }

  constructor() {
    this.mkad_points.forEach(point => {
      point.reverse();
    });
  }

  public onReady(e: YaReadyEvent<ymaps.Map>) {
    e.target.events.add('click', (e) => {
      this.coords = <[]>e.get('coords');
      let closest = this.polygon.target.geometry?.getClosest(this.coords).position;
      this.routeCoords = [
        this.coords,
        closest
      ]
      this.polyline.target.geometry?.setCoordinates([
        this.coords,
        closest
      ]);
    })
    
  }

  public onPolygonReady(e: YaReadyEvent<ymaps.Polygon>) {
    this.polygon = e;
  }

  public onPolylineReady(e: YaReadyEvent<ymaps.Polyline>) {
    this.polyline = e;
  }

  public onRouteReady(e: YaReadyEvent<ymaps.multiRouter.MultiRoute>){
    this.route = e;
  }
}
