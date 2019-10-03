import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { AnnotatorComponent } from './../components/annotator/annotator.component';
import { InlineAnnotateComponent } from './inline-annotate/inline-annotate.component';
import { AnnotationListComponent } from './annotation-list/annotation-list.component';
import { AuthenticateBannerComponent } from './authenticate-banner/authenticate-banner.component';

@NgModule({
  declarations: [AnnotatorComponent, InlineAnnotateComponent, AnnotationListComponent, AuthenticateBannerComponent],
  imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule
	],
	exports: [AnnotatorComponent, InlineAnnotateComponent, AnnotationListComponent, AuthenticateBannerComponent]
})
export class ComponentModule { }
