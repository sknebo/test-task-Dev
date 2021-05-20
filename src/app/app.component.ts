import { Component } from '@angular/core';
import { data_MKAD } from './data/MKAD';

import { YaReadyEvent } from 'angular8-yandex-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  
  //Переменные, хранящие состояние объектов карты
  private polygon!: YaReadyEvent;
  private polyline!: YaReadyEvent;
  private route!: YaReadyEvent;

  //Переменные расчетов
  public routeDistance: any; //Длина пути
  public routeDuration: any; //Время пути
  public pointAddress: any; //Адрес стартовой точки

  //Показывать ли сообщение с данными
  public showMessage: boolean = false;

  //Координаты маршрута и координаты метки
  public routeCoords: any[] = [];
  public coords: number[] = [];

  //Массив с координатами каждого километра МКАД для генерации полигона
  private mkad_points = data_MKAD;

  //Первичные особенности полигона
  public polygonFeature = {
    geometry: {
      type: "Polygon",
      coordinates: [
        this.mkad_points
      ],
    },
  };

  //Первичные особенности линии воздушного пути
  public polylineFeature = {
    geometry: {
      type: "LineString",
      coordinates: []
    }
  };

  //Опции линии воздушного пути
  public polylineOptions = {
    strokeWidth: 5,
    strokeColor: "#3d6dd4",
    strokeStyle: 'shortdash'
  };

  //Модель маршрутизации
  public routeModel = {
    params: {
      results: 1 //Прокладывается только один путь
    }
  }

  //Параметры маршрутизации
  public routeOptions = {
    wayPointVisible: false //Скрыть метки старта и финиша
  }

  constructor() {
    this.mkad_points.forEach(point => {
      point.reverse(); //Так как в массиве входных данных координаты изменены местами, приводим их к нужному виду
    });
  }

  //Метод, вызывающийся при отрисовке карты
  public onReady(e: YaReadyEvent<ymaps.Map>) {
    e.target.events.add('click', (e) => { //Слушаем клик по карте
      this.coords = <[]>e.get('coords'); //Получаем координаты клика
      this.getAddress(this.coords); //Получаем адрес метки
      let closest = this.polygon.target.geometry?.getClosest(this.coords).position; //Ищем ближайшую метку МКАД
      this.routeCoords = [ //Задаем начало и конец маршрутв
        this.coords,
        closest
      ]
      this.polyline.target.geometry?.setCoordinates([ //Задаем начало и конец воздушного пути
        this.coords,
        closest
      ]);
      this.showMessage = true; //Отображаем сообщение
    })
  }

  //Метод получения адреса. TypeScript ругается на отсутсвие в ymaps метода geocode - особенности типизации
  private getAddress(coords: number[]) {
    ymaps.geocode(coords).then((res: { geoObjects: { get: (arg0: number) => any; }; }) => {
        var firstGeoObject = res.geoObjects.get(0);
        let address = firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas();
        let address1 = firstGeoObject.getThoroughfare() || firstGeoObject.getPremise();
        if (!address) {
          this.pointAddress = address1;
        }
        else{
          this.pointAddress = address;
        }
    });
  }

  //Метод, вызывающийся при отрисовке полигона - сохраняет его состояние
  public onPolygonReady(e: YaReadyEvent<ymaps.Polygon>) {
    this.polygon = e;
  }

  //Метод, вызывающийся при отрисовке линии - сохраняет ее состояние
  public onPolylineReady(e: YaReadyEvent<ymaps.Polyline>) {
    this.polyline = e;
  }

  //Метод, вызывающийся при отрисовке маршрута - сохраняет его состояние
  public onRouteReady(e: YaReadyEvent<ymaps.multiRouter.MultiRoute>){
    this.route = e;
  }

  //Метод вызывается при обновлении маршрута. Сохраняет дистанцию и время пути
  public updateRoute(e: YaReadyEvent<ymaps.multiRouter.MultiRoute>){
    let props = e.target.getActiveRoute()?.properties;
    this.routeDistance = props?.get('distance', { value: 0, text: 'Не определено' });
    this.routeDuration = props?.get('duration', { value: 0, text: 'Не определено' });
  }
}
