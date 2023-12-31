import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HikeComponent } from './main/hike/hike.component';
import { BikeComponent } from './main/bike/bike.component';
import { WakeComponent } from './main/wake/wake.component';
import { ErrorLogComponent } from './error-log/error-log.component';

const routes: Routes = [
  { path: "hike", component: HikeComponent },
  { path: "bike", component: BikeComponent },
  { path: "wake", component: WakeComponent },
  { path: "error", component: ErrorLogComponent }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
