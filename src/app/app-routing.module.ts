import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HotComponent} from './hot/hot.component';
import {ColdComponent} from './cold/cold.component';


const routes: Routes = [
  { path: 'hot', component: HotComponent },
  { path: 'cold', component: ColdComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
