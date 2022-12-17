import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-fpr',
  templateUrl: './fpr.component.html',
  styleUrls: ['./fpr.component.css']
})
export class FprComponent implements OnInit {

  user:any;
  show:Boolean|false;
  otp:any;
  otp1:any;
  pass:any;
  cpass:any;
  userd:any;
  shp:Boolean|false;
 constructor(private http:HttpClient,private userservice:UserService,private router:Router) { }

 ngOnInit(): void {
 }
 find()
 {
    this.http.post('http://localhost:3001/recruiter/otp',{mail:this.user}).subscribe(r=>{
     this.userd=r;
     console.log(this.userd)
     if(r){
      this.show=true;
      var newuser={
        email: this.userd['email'],
         fullName: this.userd['fullName'],
         password:this.userd['password'],
         post:this.userd['post'],
        otp: Math.floor((Math.random() * 10000) + 1)
       }
       this.http.post("http://localhost:3001/recruiter/updata",newuser).subscribe(r=>{
        console.log(r);
        this.otp=r['otp']
        console.log(this.otp)
        var s={
          mail:this.userd['email'],
          otp:r['otp']
        }
        console.log(r['otp'])
        this.userservice.otp(s).subscribe(r=>{
          console.log(r);
        })
      })
     
     }
     else{
       this.shp=true;
     } 
     var startTime = new Date().getTime();
      var interval = setInterval(() =>{
        if(new Date().getTime() - startTime >180000){
        this.otp=0;
        console.log(this.otp)
        clearInterval(interval);
        alert("Otp has been expired")
        this.router.navigate(['/recruiterlogin'])
        return;
      }
     }, 2000);
    })
 }
 
 password()
 {
   if(this.otp==this.otp1)
   {
     console.log(this.otp1)
     if(this.pass===this.cpass){
       var send={
         email: this.userd['email'],
         fullName: this.userd['fullName'],
         password:this.cpass,
         post:this.userd['post'],
         otp:0
       }
       this.http.post("http://localhost:3001/recruiter/updata",send).subscribe(r=>{
         console.log(r);
         this.router.navigate(['/recruiterlogin'])
       })
     }
     else{
       alert("Passwords dont match");
     }
   }
   else{
     alert("wrong otp entered");
     console.log(this.otp1);
   }
 }
}