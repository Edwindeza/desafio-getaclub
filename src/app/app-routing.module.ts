import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegistroComponent } from './features/registro/registro.component';

const routes: Routes = [
  { path: 'registro', component: RegistroComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'registro'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
