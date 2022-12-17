import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-twofactorauthr',
  templateUrl: './twofactorauthr.component.html',
  styleUrls: ['./twofactorauthr.component.css']
})
export class TwofactorauthrComponent implements OnInit {
 otp1:any;
 userd:any=[];
 otp:any;
  constructor(private http:HttpClient,private userservice:UserService,private router:Router) { }

  ngOnInit(): void {
    console.log(this.userservice.rmail)
    this.send();
  }
  send(){
    this.http.post('http://localhost:3001/recruiter/otp',{mail:this.userservice.rmail}).subscribe(r=>{
     this.userd=r;
     console.log(this.userd)
     if(r){
      var newuser={
        email: this.userd['email'],
         fullName: this.userd['fullName'],
         password:this.userd['password'],
         post:this.userd['post'],
        otp: Math.floor((Math.random() * 10000) + 1)
       }
       this.http.post("http://localhost:3001/recruiter/two",newuser).subscribe(r=>{
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
  })
}
c(){
  this.http.post('http://localhost:3001/recruiter/otp',{mail:this.userservice.rmail}).subscribe(r=>{
        console.log(r);
         this.userd=r;
         this.otp=r['otp'];
       if(this.otp1==r['otp']){
        this.http.post('http://localhost:3001/recruiter/update',this.userd).subscribe(r=>{
          console.log(r);
          this.router.navigateByUrl('/recruiterprofile');
        })
       }
      else{
        console.log(this.userd)
        alert("wrong otp Entered try again by Logging Again")
        this.userservice.deleteToken1();
        this.router.navigateByUrl('/recruiterlogin');
      }
  })
}
a(){
  alert("Otp has been resent...");
  this.send();
}
}
