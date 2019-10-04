import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	resetForm: FormGroup;
	showPasswordEqualError = false;
	showResetFailError = false;
  constructor(private formBuilder: FormBuilder, private authSvc: AuthenticateService, private router: Router) { }

  ngOnInit() {
		this.resetForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			oldPassword: ['', [Validators.required]],
			newPassword: ['', [Validators.required]]
		});
	}

	reset() {
		this.showPasswordEqualError = false;
		this.showResetFailError = false;
		if(!this.resetForm.valid || !this.resetForm.touched) {
			return;
		} else if (this.resetForm.controls['oldPassword'].value === this.resetForm.controls['newPassword'].value) {
			this.showPasswordEqualError = true;
			return;
		} else {
			this.authSvc.resetPassword({
				email: this.resetForm.controls['email'].value.trim(),
				password: this.resetForm.controls['oldPassword'].value.trim()
			}, this.resetForm.controls['newPassword'].value.trim()).subscribe(res => {
				if(!res) {
					this.showResetFailError = true;
				} else {
					this.router.navigateByUrl('home');
				}
			})
		}
	}

}
