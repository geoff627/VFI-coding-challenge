import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Annotation } from 'src/app/components/annotator/annotation.model';
import { AnnotationService } from '../../services/annotation.service';

@Component({
  selector: 'app-edit-annotation',
  templateUrl: './edit-annotation.component.html',
  styleUrls: ['./edit-annotation.component.scss']
})
export class EditAnnotationComponent implements OnInit {
	annotationId: number;
	annotationToEdit: Annotation;
	editAnnotationForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private annotationSvc: AnnotationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
		this.annotationId = +this.route.snapshot.paramMap.get("id");
		this.annotationToEdit = this.annotationSvc.getAnnotationById(this.annotationId);
		this.editAnnotationForm = this.formBuilder.group({
			annotation: ['', []]
		});
		if(this.annotationToEdit) {
			this.editAnnotationForm.controls['annotation'].setValue(this.annotationToEdit.annotation);
		}
	}

	saveEdit() {
		if(!this.editAnnotationForm.valid || !this.editAnnotationForm.touched) {
			return;
		}
		this.annotationToEdit.annotation = this.editAnnotationForm.controls['annotation'].value;
		this.annotationSvc.editAnnotation(this.annotationToEdit);
		this.router.navigateByUrl('home');
	}

	handleDelete() {
		this.annotationToEdit.annotation = this.editAnnotationForm.controls['annotation'].value;
		this.annotationSvc.deleteAnnotation(this.annotationToEdit);
		this.router.navigateByUrl('home');
	}

}
