import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ComponentModule } from '../components/component.module'
import { HomeComponent } from './home/home.component';
// import { AnnotatorComponent } from './../components/annotator/annotator.component';

const routes: Routes = [
	{
		path: "home",
		component: HomeComponent,
	},
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "**",
		redirectTo: "home",
		pathMatch: "full",
	}
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ComponentModule
  ]
})
export class FeaturePagesModule { }
