import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DataViewComponent } from './data-view/data-view.component';
import { DataDetailComponent } from './data-detail/data-detail.component';
import { SensorViewComponent } from './sensor-view/sensor-view.component';
import { SettingsViewComponent } from './settings-view/settings-view.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DataViewComponent,
    SensorViewComponent,
    SettingsViewComponent,
    DataDetailComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
