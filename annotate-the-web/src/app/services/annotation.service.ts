import { Injectable } from '@angular/core';
import { Annotation } from '../components/annotator/annotation.model';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
	annotationListStorageKey = 'storedAnnotations';
	listOfAnnotations: Array<Annotation> = [];
	private annotationListSubject = new BehaviorSubject<Array<Annotation>>([]);
	annotationListChanges$ = this.annotationListSubject.asObservable();
	constructor() {
		if(!this.listOfAnnotations || this.listOfAnnotations.length === 0) {
			this.listOfAnnotations = this.getAnnotationListFromLocalStorage();
			if(this.listOfAnnotations.length > 0) {
				this.notifyAnnotationListChange();
			}
		}
	}

	addAnnotation(annotation: Annotation) {
		if(!annotation) {return;}
		this.listOfAnnotations.push(annotation);
		this.saveAnnotationListToLocalStorage(this.listOfAnnotations);
		this.notifyAnnotationListChange();
	}

	getAnnotationById(annotationId: number): Annotation {
		return this.listOfAnnotations.find(a => a.id === annotationId)
	}

	editAnnotation(editedAnnotation: Annotation): void {
		this.listOfAnnotations = this.listOfAnnotations.map(a => a.id !== editedAnnotation.id ? a : {...editedAnnotation});
		this.saveAnnotationListToLocalStorage(this.listOfAnnotations);
		this.notifyAnnotationListChange();
	}

	deleteAnnotation(annotationToDelete: Annotation): void{
		this.listOfAnnotations = this.listOfAnnotations.filter(a => a.id !== annotationToDelete.id);
		this.saveAnnotationListToLocalStorage(this.listOfAnnotations);
		this.notifyAnnotationListChange();
	}

	notifyAnnotationListChange() {
		this.annotationListSubject.next([...this.listOfAnnotations]);
	}

	saveAnnotationListToLocalStorage(list: Array<Annotation>) {
		localStorage.setItem(this.annotationListStorageKey, JSON.stringify([...list]));
	}

	getAnnotationListFromLocalStorage(): Array<Annotation> {
		const localListString = localStorage.getItem(this.annotationListStorageKey);
		const localList: Array<Annotation> = JSON.parse(localListString);
		const returnedList = !localList ? [] : [...localList];
		return returnedList;
	}
}
