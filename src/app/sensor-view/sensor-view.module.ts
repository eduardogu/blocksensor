import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { SensorDetailComponent } from './sensor-detail/sensor-detail.component';



@NgModule({
  declarations: [SensorListComponent, SensorDetailComponent],
  imports: [
    CommonModule
  ]
})
export class SensorViewModule { }
