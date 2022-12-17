import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { finalize } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-employeesignup',
  templateUrl: './employeesignup.component.html',
  styleUrls: ['./employeesignup.component.css']
})
export class EmployeesignupComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean | undefined;
 error: string | undefined;
  users:any;
  send:any;
  download:any;
  downloadurl: string;
  chdow!:string;
  valid!:boolean|false;
  sett!:boolean|false;
 show:Boolean=false;
 cp:string;
  constructor(public userservice: UserService,private router:Router,private af:AngularFireStorage) { }

  ngOnInit() {
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  }
  initializeFormGroup() {
    this.userservice.logi.setValue({
      first:'', 
      last:'',  
      password:'',      
      email:'',     
      address:'',
      Postalcode:'',
      City:'',
      Country:'',
      phone:'',
      hire:'',
      resume:''
    });
  }
  onClear() {
    this.userservice.logi.reset();
    this.initializeFormGroup();
  }
  Submit() {
    this.userservice.getshort(this.downloadurl).subscribe((res:any)=>{
       console.log(res);
    })
    if (this.userservice.logi.valid) {
      if(this.userservice.logi.value.cpassword==this.userservice.logi.value.password){
      this.send={
        fullName:this.userservice.logi.value.first,
        last:this.userservice.logi.value.last,
        email:this.userservice.logi.value.email,
        password:this.userservice.logi.value.password,
        address:this.userservice.logi.value.address,
        Postalcode:this.userservice.logi.value.Postalcode,
        City:this.userservice.logi.value.City,
        Country:this.userservice.logi.value.Country,
        resume:this.download,
        phone:this.userservice.logi.value.phone,
      }
      console.log(this.userservice.logi.value.first)
      this.userservice.postUser(this.send).subscribe({
       next: (res:any) => {
          if(res){
          this.showSucessMessage = true;
          console.log(res)
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.router.navigate(['/employeelogin'])
          this.resetForm();
          }
        },
       error: (err)=>{
        this.error=err['error'];
       } 
      });
      }
      else{
        alert("Passwords not matched..");
      }
    }
    else{
      alert("Invalid details Entered");
    }
  }
  els(){
    this.error="";
  }
  get email()
  {
   return this.userservice.logi.get('email');
  }
  get phone()
  {
   return this.userservice.logi.get('phone');
  }
  get first()
  {
   return this.userservice.logi.get('first');
  }
  get last()
  {
   return this.userservice.logi.get('last');
  }
  get password()
  {
   return this.userservice.logi.get('password');
  }
  get address()
  {
   return this.userservice.logi.get('address');
  }
  get post()
  {
   return this.userservice.logi.get('Postalcode');
  }
  get City()
  {
   return this.userservice.logi.get('City');
  }
  get Country()
  {
   return this.userservice.logi.get('Country');
  } 
  path:string;
  upload($event:any){
    this.path=$event.target.files[0];
    this.show=true;
    this.senddata();
  }
  senddata(){
     console.log(this.path);
     const paths="/files"+Math.random()+this.path;
     const ref=this.af.ref(paths);
    const uploadTask= this.af.upload(paths,this.path);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe((d: any) => {
          this.downloadurl= d;
          console.log(this.downloadurl);
          var base={
            url:this.downloadurl
          }
          this.userservice.getshort(base).subscribe((res:any)=>{
            this.download=res.url;
            console.log(this.download);
         })
        });
      })
    ).subscribe();
     
  }
}
