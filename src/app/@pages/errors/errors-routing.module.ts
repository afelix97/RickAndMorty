import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Err404Component } from './err404/err404.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "404" },
  { path: "404", component: Err404Component },
  { path: "**", redirectTo: "error/404" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
