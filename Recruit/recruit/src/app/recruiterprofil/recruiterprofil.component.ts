import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { BehaviorSubject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recruiterprofil',
  templateUrl: './recruiterprofil.component.html',
  styleUrls: ['./recruiterprofil.component.css']
})
export class RecruiterprofilComponent implements OnInit {

  userDetails:any;
  em:any;
  bsubject =new BehaviorSubject<string>("s");
  show:Boolean|false;
  sentsh:Boolean|false;
  sentdata:any=[];
  constructor(public userService:UserService,private router:Router,private http:HttpClient) { }
  ngOnInit(): void {
    this.userService.getUserProfile1().subscribe(
      res => {
        if(res)
        this.userDetails = res['user'];
        this.bsubject.next(this.userDetails['email']);
        this.bsubject.subscribe( d=> {
          this.em=d;
          this.userService.em=d;
        });
        this.userService.name=this.userDetails['name'];
        console.log(this.userDetails['name']);
        console.log(this.userDetails)
      }
    );
  }
  onLogout(){
    this.userService.deleteToken1();
    this.router.navigate(['/home']);
  }
  onPost()
  {
    console.log(this.em);
    this.router.navigate(['/recruiter/fill'])
  }
  view()
  {
    this.router.navigate(['/view/jobs']);
  }
  get email()
  {
   return this.userService.job1.get('email');
  }
  get name()
  {
   return this.userService.job1.get('name');
  }
  initializeFormGroup() {
    this.userService.job1.setValue({
      name:'',
      email:'',     
    });
  }
  onClear() {
    this.userService.logi.reset();
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  }
  sh()
  {
    this.show=true;
  }
  up(){
    console.log(this.userDetails)
    this.show=true;
    this.userService.job1.controls['name'].setValue(this.userDetails['name']);
    this.userService.job1.controls['email'].setValue(this.userDetails['email']);
  }
  close()
  {
     this.show=false;
     this.initializeFormGroup();
  }
  send:any;
  Submit()
  {
    alert("hi");
    if (this.userService.job1.valid) {
        this.send={
            name:this.userService.job1.value.name,
            email:this.userService.job1.value.email,
            password:this.userDetails['password'],
            salt:this.userDetails['salt'],
            post:this.userDetails['post']
       }
      // console.log(this.userService.job1.value.first)
      this.userService.update2(this.send).subscribe(
        (res:any) => {
          if(res){
          console.log(res)
          this.resetForm();
          this.router.navigate(['/recruiterprofile']);
          }
        }
      );
    
    }
  }
  sent(){
    this.sentsh=true;
    var send={
      mail:this.userDetails['email']
    }
    this.http.post("http://localhost:3001/recruiter/otp",send).subscribe(r=>{
      this.sentdata=r['sent'];
      console.log(r['sent'])
    })
  }
  csent(){
    this.sentsh=false;
  }
  sview(val:any)
  {
    location.replace(`https:bit.ly/${val}`);
  }
}
