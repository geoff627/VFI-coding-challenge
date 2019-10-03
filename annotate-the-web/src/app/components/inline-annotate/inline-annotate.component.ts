import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-inline-annotate',
  templateUrl: './inline-annotate.component.html',
  styleUrls: ['./inline-annotate.component.scss']
})
export class InlineAnnotateComponent implements OnInit {
	addAnnotationForm: FormGroup;
	showAddNote = false;
	@Output() annotationNote: EventEmitter<string> = new EventEmitter<string>();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
		this.addAnnotationForm = this.formBuilder.group({
			note: ["", [Validators.required]],
		});
	}

	handleBubbleClick() {
		this.showAddNote = true;
	}

	addAnnotationNote() {
		this.annotationNote.emit(this.addAnnotationForm.get("note").value);
	}

}
