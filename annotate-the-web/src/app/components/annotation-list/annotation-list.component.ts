import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnotationService } from '../../services/annotation.service';
import { Annotation } from '../annotator/annotation.model';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.scss']
})
export class AnnotationListComponent implements OnInit {
	listOfAnnotations: Array<Annotation> = [];
  constructor(private annotationSvc: AnnotationService, private router: Router) { }

  ngOnInit() {
		this.annotationSvc.annotationListChanges$
			.subscribe(list => {
				this.listOfAnnotations = !list ? [] : [...list];
			})
	}

	handleAnnotationClick(annotation: Annotation) {
		this.router.navigateByUrl(`/${annotation.id}/edit`);
	}

}
