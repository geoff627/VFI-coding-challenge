import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from "rxjs/operators";
import { Annotation } from './annotation.model';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.scss']
})
export class AnnotatorComponent implements OnInit, AfterViewInit {
	enabledClass = 'annotate-enabled';
	@ViewChild('annotator') annotatorElem: ElementRef;
  constructor() { }

  ngOnInit() {
	}

	ngAfterViewInit(): void {
		this.annotatorElem.nativeElement;
		fromEvent(document, 'selectionchange').pipe(
			debounceTime(1500), //only listen after the user has selected and paused
			map(e => document.getSelection()),
			filter(selection => {
				const {anchorNode: {parentElement: {className}}} = selection; //get class name of parent
				return !className ? false : className.includes(this.enabledClass); //only continue if the highlighted text has the annotation enabled class
			}),
			map(selection => {
				return {
					selectedText: selection.anchorNode.textContent.substring(
						selection.focusOffset,
						selection.anchorOffset)
				} as Annotation;
			})
		).subscribe((annotation: Annotation) => {
				const annot = annotation;

			});
	}

}
