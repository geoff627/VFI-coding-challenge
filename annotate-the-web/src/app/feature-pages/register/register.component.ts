import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	showInvalidFormMessage = false;
	showAlreadyExistsError = false;
  constructor(private formBuilder: FormBuilder, private authSvc: AuthenticateService, private router: Router) { }

  ngOnInit() {
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		});
	}

	register() {
		this.showInvalidFormMessage = false;
		this.showAlreadyExistsError = false;
		if(!this.registerForm.valid || !this.registerForm.touched) {
			this.showInvalidFormMessage = true;
			return;
		} else {
			this.authSvc.register({
				email: this.registerForm.controls['email'].value.trim(),
				password: this.registerForm.controls['password'].value.trim()
			}).subscribe(response => {
				if(!response) {
					this.showAlreadyExistsError = true;
				} else {
					this.showAlreadyExistsError = false;
					this.router.navigateByUrl('home');
				}
			})
		}
	}

}
