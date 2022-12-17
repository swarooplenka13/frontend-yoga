import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-employeelogin',
  templateUrl: './employeelogin.component.html',
  styleUrls: ['./employeelogin.component.css']
})
export class EmployeeloginComponent implements OnInit {
  constructor(private userService: UserService,private router : Router,private http:HttpClient) { }

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  error!: string;
  userd:any=[];
  otp:number;
  bsubject =new BehaviorSubject<string>("s");
  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/employeeprofile');
  }

  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe({
      next:(res:any)=>{
       if(res)
       {
        console.log(res);
        this.userService.usermail=res['email'];
        this.userService.setToken(res['token']);  
        this.router.navigateByUrl('/employee/two/factor/authentication')
       }
    },
    error: (err)=>{
      this.error=err['error']['message'];
      console.log(err)
    }
  });
  }
 els(){
  this.error="";
 }

}
