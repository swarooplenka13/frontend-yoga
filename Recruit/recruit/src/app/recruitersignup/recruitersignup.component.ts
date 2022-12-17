import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recruitersignup',
  templateUrl: './recruitersignup.component.html',
  styleUrls: ['./recruitersignup.component.css']
})
export class RecruitersignupComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean | false;
  error: string | undefined;

  constructor(public userService: UserService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if(form.value.cpassword==form.value.password){
      var send={
        fullName:form.value.fullName ,
        email:form.value.email,
        password:form.value.password,
      }
    this.userService.postUser1(send).subscribe({
      next:(res:any)=>{
      if(res){
        this.showSucessMessage = true;
        alert("details saved Successfully")
        this.router.navigate(['/recruiterlogin'])
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        }
    },
    error: (err)=>{
      console.log(err['error']);
      this.error=err['error'];
    }
  })
}else{
  alert("Passwords not Matched..")
}
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      cpassword:'',
    };
    form.resetForm();
  }

els(){
  this.error="";
}
}
