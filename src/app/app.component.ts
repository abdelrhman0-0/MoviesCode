import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movies';
  scrolling:boolean=false;
  prev:any= window.pageYOffset;
  
  scroll(){

  }
}
