import { Routes } from '@angular/router';
import { HikeComponent } from './hike/hike.component';
import { BikeComponent } from './bike/bike.component';
import { WakeComponent } from './wake/wake.component';
import { ErrorLogComponent } from './error-log/error-log.component';

export const routes: Routes = [
  { path: "hike", component: HikeComponent },
  { path: "bike", component: BikeComponent },
  { path: "wake", component: WakeComponent },
  { path: "error", component: ErrorLogComponent }
];
