import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	resetForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
		this.resetForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			oldPassword: ['', [Validators.required]],
			newPassword: ['', [Validators.required]]
		});
	}

	reset() {
		debugger;
	}

}
