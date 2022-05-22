import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';






@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged:boolean=false;
  headerOffset:any;


  constructor(private _AuthService:AuthService) { }


  logOut(){
    this._AuthService.logOut();
  }
  hide(){
    let navElementsCont=document.getElementById('navbarSupportedContent');
    let headerOffset=window.innerHeight;
    document.documentElement.scrollTop=headerOffset;

    if (navElementsCont?.classList.contains('show')){
      navElementsCont.classList.remove('show');
    }
  }
  

  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue() != null){
      this.isLogged = true;
      }else{
        this.isLogged= false;
      }
    })
    
  }

}
