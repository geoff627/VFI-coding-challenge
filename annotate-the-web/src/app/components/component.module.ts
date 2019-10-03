import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { AnnotatorComponent } from './../components/annotator/annotator.component';
import { InlineAnnotateComponent } from './inline-annotate/inline-annotate.component';
import { AnnotationListComponent } from './annotation-list/annotation-list.component';

@NgModule({
  declarations: [AnnotatorComponent, InlineAnnotateComponent, AnnotationListComponent],
  imports: [
		CommonModule,
		ReactiveFormsModule
	],
	exports: [AnnotatorComponent, InlineAnnotateComponent, AnnotationListComponent]
})
export class ComponentModule { }
