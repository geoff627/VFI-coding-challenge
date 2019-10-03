import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { AnnotatorComponent } from './../components/annotator/annotator.component';
import { InlineAnnotateComponent } from './inline-annotate/inline-annotate.component';

@NgModule({
  declarations: [AnnotatorComponent, InlineAnnotateComponent],
  imports: [
		CommonModule,
		ReactiveFormsModule
	],
	exports: [AnnotatorComponent, InlineAnnotateComponent]
})
export class ComponentModule { }
