import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { RecruiterprofilComponent } from '../recruiterprofil/recruiterprofil.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recruiterform',
  templateUrl: './recruiterform.component.html',
  styleUrls: ['./recruiterform.component.css']
})
export class RecruiterformComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean | undefined;
  serverErrorMessages: string | undefined;
  users:any;
  send:any;
  download:any;
  downloadurl: string;
  chdow!:string;
  valid!:boolean|false;
  sett!:boolean|false;
  data:any=[];
  em!:string;
  show:Boolean|false;
  constructor(public userservice: UserService,private router:Router,private af:AngularFireStorage,private s:RecruiterprofilComponent,private http:HttpClient) { }

  ngOnInit() {
    this.initializeFormGroup();
    this.populate();
    console.log(this.userservice.name);
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  }
  initializeFormGroup() {
    this.userservice.job.setValue({
      CompanyName:'',
        email:'',
        role:'',
        address:'',
        type:'',
        other:'',
        desc:'',
    });
  }
  onClear() {
    this.userservice.logi.reset();
    this.initializeFormGroup();
  }
  populate()
  {
    this.userservice.job.controls['email'].setValue(this.userservice.em);
    this.userservice.job.controls['CompanyName'].setValue(this.userservice.name);
  }
  Submit() {
    this.userservice.getshort(this.downloadurl).subscribe((res:any)=>{
       console.log(res);
    })
    if (this.userservice.job.valid) {
      this.send={
        CompanyName:this.userservice.job.value.CompanyName,
        email:this.userservice.job.value.email,
        role:this.userservice.job.value.role,
        address:this.userservice.job.value.address,
        type:this.userservice.job.value.type,
        other:this.userservice.job.value.other,
        desc:this.download,
      }
      console.log(this.userservice.job.value.email)
      this.userservice.postjob1(this.send).subscribe((res:any)=>{
        console.log(res);
      })
      this.userservice.postjob(this.send).subscribe(
         (res:any) => {
          if(res){
          this.showSucessMessage = true;
          console.log(res);
           this.data=res.response;
           console.log(this.data)
          //  console.log(this.data[8].email);
          setTimeout(() => this.showSucessMessage = false, 4000);
          if(this.userservice.isLoggedIn1())
          this.router.navigate(['/recruiterprofile'])
          else
          this.router.navigate(['/recruiterlogin']);
          this.resetForm();
          }
          else
            this.serverErrorMessages = 'Duplicate email address Found...';
        }
      );
    
    }
    else{
      alert("Invalid details Entered");
    }
  }
  get email()
  {
   return this.userservice.job.get('email');
  }
  get CompanyName()
  {
   return this.userservice.job.get('CompanyName');
  }
  get other()
  {
   return this.userservice.job.get('other');
  }
  get role()
  {
   return this.userservice.job.get('role');
  }
  get address()
  {
   return this.userservice.job.get('address');
  }
  get type()
  {
   return this.userservice.job.get('type');
  }
  path:string;
  upload($event:any){
    this.path=$event.target.files[0];
    this.senddata();
    this.show=true;
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
