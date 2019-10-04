import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	showInvalidFormMessage = false;
	showLoginError = false;
  constructor(private formBuilder: FormBuilder, private authSvc: AuthenticateService, private router: Router) { }

  ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		});
	}

	login() {
		this.showInvalidFormMessage = false;
		this.showLoginError = false;
		if(!this.loginForm.valid || !this.loginForm.touched) {
			this.showInvalidFormMessage = true;
			return;
		} else {
			this.authSvc.login({
				email: this.loginForm.controls['email'].value.trim(),
				password: this.loginForm.controls['password'].value.trim()
			}).subscribe(response => {
				if(!response) {
					this.showLoginError = true;
				} else {
					this.router.navigateByUrl('home');
				}
			})
		}
	}

}
