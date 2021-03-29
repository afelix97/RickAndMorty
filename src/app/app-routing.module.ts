import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", loadChildren: () => import('./@pages/home/home.module').then(home => home.HomeModule) },
  { path: "error", loadChildren: () => import('./@pages/errors/errors.module').then(errors => errors.ErrorsModule) },
  { path: "**", redirectTo: "error/404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
