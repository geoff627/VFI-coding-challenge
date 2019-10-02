import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotatorComponent } from './../components/annotator/annotator.component';

@NgModule({
  declarations: [AnnotatorComponent],
  imports: [
    CommonModule
	],
	exports: [AnnotatorComponent]
})
export class ComponentModule { }
