import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-authenticate-banner',
  templateUrl: './authenticate-banner.component.html',
  styleUrls: ['./authenticate-banner.component.scss']
})
export class AuthenticateBannerComponent implements OnInit {
	isUserLoggedIn = false;
	currentUserEmail = '';
  constructor(private authSvc: AuthenticateService) { }

  ngOnInit() {
		this.authSvc.userEmailChange$
			.subscribe((currentUserEmail: string) => {
				this.isUserLoggedIn = !currentUserEmail ? false : true;
				this.currentUserEmail = currentUserEmail;
			});
	}

	handleLogoutClick() {
		this.authSvc.logout();
	}

}
