import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularYandexMapsModule, YA_CONFIG } from 'angular8-yandex-maps';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularYandexMapsModule
  ],
  providers: [
    {
      provide: YA_CONFIG,
      useValue: {
        apikey: 'f5a2fe0a-b793-40a4-9c0a-ac95af1eab53',
        lang: 'ru_RU',
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
