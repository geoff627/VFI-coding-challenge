import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { ComponentModule } from '../components/component.module'
import { HomeComponent } from './home/home.component';
import { EditAnnotationComponent } from './edit-annotation/edit-annotation.component';
// import { AnnotatorComponent } from './../components/annotator/annotator.component';

const routes: Routes = [
	{
		path: "home",
		component: HomeComponent,
	},
	{
		path: ":id/edit",
		component: EditAnnotationComponent,
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
  declarations: [HomeComponent, EditAnnotationComponent],
  imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		ComponentModule
  ]
})
export class FeaturePagesModule { }
