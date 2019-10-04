import { Component, OnInit } from '@angular/core';
import { AnnotationService } from 'src/app/services/annotation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private annotateSvc: AnnotationService) { }

  ngOnInit() {
		this.annotateSvc.refreshAnnotationsList();
  }

}
