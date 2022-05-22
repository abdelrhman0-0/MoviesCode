import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error:string = '';

  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null ,[Validators.required]),
    password:new FormControl(null,[Validators.required])
  })
  constructor(public _AuthService:AuthService,public _Router:Router,
    private _ToastrService:ToastrService) { }



  pressSubmit(loginFormData:FormGroup){
    if(loginFormData.valid){
      this._AuthService.login(loginFormData.value).subscribe((res)=>{
        if(res.message === 'success'){
          this._Router.navigate(['home']);
          localStorage.setItem('userToken',res.token);
          this._AuthService.saveUserData();
          this._ToastrService.success('You Logged In','Have Fun')
        }else{
          this.error= res.message;
          this._ToastrService.error('Try again',this.error)
        }
      })
    }
      
    
    
    
  }

  ngOnInit(): void {
  }

}
