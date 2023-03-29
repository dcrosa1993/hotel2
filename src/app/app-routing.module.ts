import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'store', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () =>
      import('./features/features-routing.module').then(
        (mod) => mod.FeaturesRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
