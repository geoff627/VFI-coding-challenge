import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map, tap, delay } from "rxjs/operators";
import { Annotation } from './annotation.model';
import { AnnotationService } from '../../services/annotation.service';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.scss']
})
export class AnnotatorComponent implements OnInit, AfterViewInit {
	currentAnnotation: Annotation;
	enabledClass = 'annotate-enabled';
	showAddAnnotationControl = false;

  constructor(private annotationSvc: AnnotationService) { }

  ngOnInit() {
  }

	ngAfterViewInit(): void {
		fromEvent(document, 'selectionchange').pipe(
			debounceTime(1500), //only listen after the user has selected and paused
			map(e => document.getSelection()),
			filter(selection => {
				const {anchorNode: {parentElement: {className}}} = selection; //get class name of parent
				return !className ? false : className.includes(this.enabledClass); //only continue if the highlighted text has the annotation enabled class
			}),
			map(selection => {
				const {anchorNode: {parentElement}} = selection;
				return {
					id: new Date().getUTCSeconds(),
					selectedText: selection.anchorNode.textContent.substring(
						selection.focusOffset,
						selection.anchorOffset),
					topPosition: parentElement.offsetTop,
					leftPosition: parentElement.offsetLeft,
					date: new Date()
				} as Annotation;
			}),
			filter((selectedAnnotation: Annotation) => !!selectedAnnotation.selectedText),
			tap(a => {
				this.showAddAnnotationControl = true;
			}),
			delay(60)
		).subscribe((annotation: Annotation) => {
				this.currentAnnotation = annotation;
				const annotateCtrl = document.getElementById('inline-annotation-control');
				annotateCtrl.style.left = `${annotation.leftPosition + 20}px`;
				annotateCtrl.style.top = `${annotation.topPosition}px`;
			});
	}

	handleAddAnnotationClick(annotationNote: string) {
		this.currentAnnotation.annotation = annotationNote;
		this.annotationSvc.addAnnotation(this.currentAnnotation);
		this.resetUi();
	}

	resetUi() {
		this.showAddAnnotationControl = false;
		this.currentAnnotation = null;
	}

}
