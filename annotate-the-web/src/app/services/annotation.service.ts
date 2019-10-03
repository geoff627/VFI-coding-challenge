import { Injectable } from '@angular/core';
import { Annotation } from '../components/annotator/annotation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
	listOfAnnotations: Array<Annotation> = [];
	constructor() { }

	addAnnotation(annotation: Annotation) {
		if(!annotation) {return;}
		//TODO: If signed in, add user's name to annotation
		this.listOfAnnotations.push(annotation);
	}

	getListOfAnnotations(): Observable<Array<Annotation>> {
		return new Observable<Array<Annotation>>(observer => {
			observer.next(this.listOfAnnotations);
		});
	}
}
