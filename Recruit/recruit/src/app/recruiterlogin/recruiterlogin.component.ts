import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recruiterlogin',
  templateUrl: './recruiterlogin.component.html',
  styleUrls: ['./recruiterlogin.component.css']
})
export class RecruiterloginComponent implements OnInit {

 constructor(private userService: UserService,private router : Router) { }

 model ={
   email :'',
   password:''
 };
 emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 error!: string;
 em!:string;
 ngOnInit() {
   if(this.userService.isLoggedIn1())
   this.router.navigateByUrl('/recruiterprofile');
 }

 onSubmit(form : NgForm){
   this.userService.login1(form.value).subscribe({
    next: (res:any)=>{
      if(res)
      {
       this.userService.setToken1(res.token);
       console.log(res.token);
       console.log(res);
       this.userService.rmail=res['email'];
       this.userService.em=form.value.email
       this.router.navigateByUrl('/recruiter/two/factor/authentication')
      }
   },
   error: (err)=>{
    this.error=err['error']['message']
   }
  });
 }
 els(){
  this.error="";
 }

}
