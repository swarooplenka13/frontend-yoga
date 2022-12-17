import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-twofactorauthemployee',
  templateUrl: './twofactorauthemployee.component.html',
  styleUrls: ['./twofactorauthemployee.component.css']
})
export class TwofactorauthemployeeComponent implements OnInit {
  otp1:number;
  userd:any;
  otp:number;
  constructor(private userService: UserService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    
    console.log(this.userService.usermail)
    this.send();
  }
  send(){
    this.http.post('http://localhost:3000/employee/fpe',{mail:this.userService.usermail}).subscribe(r=>{
      this.userd=r;
      console.log(this.userd)
      if(r){
       var newuser={
        City: this.userd['City'],
        Country: this.userd['Country'],
        password:this.userd['password'],
        Postalcode: this.userd['Postalcode'],
        address: this.userd['address'],
        email: this.userd['email'],
        fullName: this.userd['fullName'],
        last: this.userd['last'],
        phone: this.userd['phone'],
        resume:this.userd['resume'],
        otp: Math.floor((Math.random() * 10000) + 1)
       }
       this.userService.update3(newuser).subscribe(r=>{
        console.log(r);
        this.otp=r['otp']
        console.log(this.otp)
        var s={
          mail:this.userd['email'],
          otp:r['otp']
        }
        console.log(r['otp'])
        this.userService.otp(s).subscribe(r=>{
          console.log(r);
        })
      })
    }
  })
  }
  c(){
      this.http.post('http://localhost:3000/employee/fpe',{mail:this.userService.usermail}).subscribe(r=>{
        console.log(r);
         this.userd=r;
         this.otp=r['otp'];
       if(this.otp1==r['otp']){
        this.http.post('http://localhost:3000/employee/resdata',this.userd).subscribe(r=>{
          console.log(r);
          this.router.navigateByUrl('/employeeprofile');
        })
       }
      else{
        console.log(this.userd)
        alert("wrong otp Entered try again by Logging Again")
        this.userService.deleteToken();
        this.router.navigateByUrl('/employeelogin');
      }
  })
}
a(){
  alert("Otp has been resent...");
  this.send();
}
}
