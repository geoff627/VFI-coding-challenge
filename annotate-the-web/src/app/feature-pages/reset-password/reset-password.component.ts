import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	resetForm: FormGroup;
	showPasswordEqualError = false;
  constructor(private formBuilder: FormBuilder, private authSvc: AuthenticateService) { }

  ngOnInit() {
		this.resetForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			oldPassword: ['', [Validators.required]],
			newPassword: ['', [Validators.required]]
		});
	}

	reset() {

		this.showPasswordEqualError = false;
		if(!this.resetForm.valid || !this.resetForm.touched) {
			return;
		} else if (this.resetForm.controls['oldPassword'].value === this.resetForm.controls['newPassword'].value) {
			this.showPasswordEqualError = true;
			return;
		} else {
			this.authSvc.resetPassword({
				email: this.resetForm.controls['email'].value,
				password: this.resetForm.controls['newPassword'].value
			})
		}
	}

}
