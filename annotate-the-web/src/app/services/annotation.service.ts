import { Injectable } from '@angular/core';
import { Annotation } from '../components/annotator/annotation.model';
import { BehaviorSubject } from 'rxjs';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
	annotationListStorageKey = 'storedAnnotations';
	listOfAnnotations: Array<Annotation> = [];
	fullListOfAnnotations: Array<Annotation> = [];
	private annotationListSubject = new BehaviorSubject<Array<Annotation>>([]);
	annotationListChanges$ = this.annotationListSubject.asObservable();

	constructor(private authSvc: AuthenticateService) {
		if(authSvc.isLoggedIn) {
			if(!this.listOfAnnotations || this.listOfAnnotations.length === 0) {
				this.refreshAnnotationsList();
			}
		}
	}

	addAnnotation(annotation: Annotation) {
		if(!annotation) {return;}
		if(this.authSvc.isLoggedIn()) {
			annotation.email = this.authSvc.getCurrentUserEmail();
			this.listOfAnnotations.push(annotation);
			this.fullListOfAnnotations.push(annotation);
			this.saveAnnotationListToLocalStorage(this.fullListOfAnnotations);
			this.notifyAnnotationListChange();
		}
	}

	getAnnotationById(annotationId: number): Annotation {
		return this.fullListOfAnnotations.find(a => a.id === annotationId)
	}

	editAnnotation(editedAnnotation: Annotation): void {
		this.fullListOfAnnotations = this.fullListOfAnnotations.map(a => a.id !== editedAnnotation.id ? a : {...editedAnnotation});
		this.saveAnnotationListToLocalStorage(this.fullListOfAnnotations);
		this.refreshAnnotationsList();
	}

	deleteAnnotation(annotationToDelete: Annotation): void{
		this.fullListOfAnnotations = this.fullListOfAnnotations.filter(a => a.id !== annotationToDelete.id);
		this.saveAnnotationListToLocalStorage(this.fullListOfAnnotations);
		this.refreshAnnotationsList();
	}

	notifyAnnotationListChange() {
		this.annotationListSubject.next([...this.listOfAnnotations]);
	}

	saveAnnotationListToLocalStorage(list: Array<Annotation>) {
		localStorage.setItem(this.annotationListStorageKey, JSON.stringify([...list]));
	}

	refreshAnnotationsList() {
		this.fullListOfAnnotations = this.getAnnotationListFromLocalStorage();
		this.listOfAnnotations = this.getAnnotationsByUserFromLocalStorage(this.authSvc.getCurrentUserEmail());
		this.notifyAnnotationListChange();
	}

	clearInMemoryAnnotations() {
		this.listOfAnnotations.splice(0);
		this.fullListOfAnnotations.splice(0);
		this.notifyAnnotationListChange();
	}

	private getAnnotationsByUserFromLocalStorage(userEmail: string) {
		return this.getAnnotationListFromLocalStorage().filter(a => a.email === userEmail);
	}

	private getAnnotationListFromLocalStorage(): Array<Annotation> {
		const localListString = localStorage.getItem(this.annotationListStorageKey);
		const localList: Array<Annotation> = JSON.parse(localListString);
		const returnedList = !localList ? [] : [...localList];
		return returnedList;
	}
}
