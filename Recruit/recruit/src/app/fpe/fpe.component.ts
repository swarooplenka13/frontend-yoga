import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-fpe',
  templateUrl: './fpe.component.html',
  styleUrls: ['./fpe.component.css']
})
export class FpeComponent implements OnInit {

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
     this.http.post('http://localhost:3000/employee/fpe',{mail:this.user}).subscribe(r=>{
      this.userd=r;
      console.log(this.userd)
      if(r){
       this.show=true;
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
       this.userservice.update(newuser).subscribe(r=>{
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
          this.otp=-1;
        clearInterval(interval);
        alert("Otp has been expired")
        this.router.navigate(['/employeelogin'])
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
          City: this.userd['City'],
          Country: this.userd['Country'],
          password:this.cpass,
          Postalcode: this.userd['Postalcode'],
          address: this.userd['address'],
          email: this.userd['email'],
          fullName: this.userd['fullName'],
          last: this.userd['last'],
          phone: this.userd['phone'],
          resume:this.userd['resume'],
          otp:0
        }
        this.userservice.update(send).subscribe(r=>{
          console.log(r);
          this.router.navigate(['/employeelogin'])
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
