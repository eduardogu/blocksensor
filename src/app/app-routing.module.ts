import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataViewComponent } from './data-view/data-view.component';
import { DataDetailComponent } from './data-detail/data-detail.component';
import { SensorViewComponent } from './sensor-view/sensor-view.component';
import { SettingsViewComponent } from './settings-view/settings-view.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
   { path: '', redirectTo: '/index', pathMatch: 'full'},
   { path: 'index', component: ProfileComponent},
   { path: 'data', redirectTo: 'data/list/1', pathMatch: 'full'},
   { path: 'data/list/:page', component: DataViewComponent},
   { path: 'data/:sensorId', component: DataDetailComponent},
   { path: 'sensors', component: SensorViewComponent},
   { path: 'settings', component: SettingsViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
