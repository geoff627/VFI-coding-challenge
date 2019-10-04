import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { AnnotationService } from 'src/app/services/annotation.service';

@Component({
  selector: 'app-authenticate-banner',
  templateUrl: './authenticate-banner.component.html',
  styleUrls: ['./authenticate-banner.component.scss']
})
export class AuthenticateBannerComponent implements OnInit {
	isUserLoggedIn = false;
	currentUserEmail = '';
  constructor(private authSvc: AuthenticateService, private annotateSvc: AnnotationService) { }

  ngOnInit() {
		this.authSvc.userEmailChange$
			.subscribe((currentUserEmail: string) => {
				this.isUserLoggedIn = !currentUserEmail ? false : true;
				this.currentUserEmail = currentUserEmail;
			});
	}

	handleLogoutClick() {
		this.authSvc.logout();
		this.annotateSvc.clearInMemoryAnnotations();
	}

}
