import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup = new FormGroup({
    first_name:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    last_name:new FormControl(null , [Validators.required,Validators.minLength(3)]),
    age:new FormControl(null , [Validators.required,Validators.min(16),Validators.max(70), Validators.pattern(/^(\d+)$/)]),
    email:new FormControl(null ,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-zA-z])(\w+){8,}/)])
  })

  error:string = '';
  constructor(private _AuthService:AuthService,public _Router:Router) { }


  pressSubmit(registerForm:FormGroup){
    if(registerForm.valid){
      this._AuthService.register(registerForm.value).subscribe((res)=>{
        if(res.message === 'success'){
          this._Router.navigate(['login']);
        }else{
          this.error= res.errors.email.message
        }
      })
    }
    
    
  }
 

  ngOnInit(): void {
  }

}
