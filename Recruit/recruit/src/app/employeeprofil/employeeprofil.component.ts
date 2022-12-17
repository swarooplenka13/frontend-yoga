import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-employeeprofil',
  templateUrl: './employeeprofil.component.html',
  styleUrls: ['./employeeprofil.component.css']
})
export class EmployeeprofilComponent implements OnInit {

  userDetails:any;
  downloadurl:any;
  sub:any;
  check:Boolean=false;
  showSucessMessage: boolean | undefined;
  serverErrorMessages: string | undefined;
  users:any;
  send:any;
  res:string[]; 
  show:boolean|false;
  resume:any;
  link:any;
  shu:Boolean|false;
  applied:Boolean=false;
  showres:Boolean=false;
  constructor(public userservice:UserService,private router:Router,private af:AngularFireStorage,private http:HttpClient) { 
  }
  ngOnInit(): void {
    this.userservice.getUserProfile().subscribe(
      (res:any) => {
        if(res)
        this.userDetails = res['user'];
        // console.log(res['user']);
        this.resume=this.userDetails['resume'];
        this.link=`https://bit.ly/${this.resume}`;
        console.log(this.userDetails['password']);
      },
      );  
  }
  onup()
  {
    this.check=true;
    this.populate();
  }
  close(){
    this.initializeFormGroup();
  }
  chex()
  {
    this.check=false; 
  }
  populate()
  {
    this.userservice.logi1.controls['first'].setValue(this.userDetails['fullName']);
    this.userservice.logi1.controls['last'].setValue(this.userDetails['last']);
    this.userservice.logi1.controls['email'].setValue(this.userDetails['email']);
    this.userservice.logi1.controls['address'].setValue(this.userDetails['address']);
    this.userservice.logi1.controls['phone'].setValue(this.userDetails['phone']);
    this.userservice.logi1.controls['City'].setValue(this.userDetails['City']);
    this.userservice.logi1.controls['Country'].setValue(this.userDetails['Country']);
    this.userservice.logi1.controls['Postalcode'].setValue(this.userDetails['Postalcode']);
  }
  onLogout(){
    this.userservice.deleteToken();
    this.router.navigate(['/home']);
  }
  clup()
  {
    this.shu=false;
  }
  shup()
  {
    this.shu=true;
  }
  Submit() {
    if (this.userservice.logi1.valid) {
      if(!this.downloadurl)
      {
        this.send={
          fullName:this.userservice.logi1.value.first,
          last:this.userservice.logi1.value.last,
          email:this.userservice.logi1.value.email,
          password:this.userDetails['password'],
          address:this.userservice.logi1.value.address,
          Postalcode:this.userservice.logi1.value.Postalcode,
          City:this.userservice.logi1.value.City,
          Country:this.userservice.logi1.value.Country,
          resume:this.resume,
          phone:this.userservice.logi1.value.phone,
          saltSecret:this.userDetails['saltSecret']
        }
      }
      else{
      this.send={
        fullName:this.userservice.logi1.value.first,
        last:this.userservice.logi1.value.last,
        email:this.userservice.logi1.value.email,
        password:this.userDetails['password'],
        address:this.userservice.logi1.value.address,
        Postalcode:this.userservice.logi1.value.Postalcode,
        City:this.userservice.logi1.value.City,
        Country:this.userservice.logi1.value.Country,
        resume:this.downloadurl,
        phone:this.userservice.logi1.value.phone,
        saltSecret:this.userDetails['saltSecret']
      }
    }
      console.log(this.userservice.logi1.value.first)
      this.userservice.update1(this.send).subscribe(
        (res:any) => {
          if(res){
          this.showSucessMessage = true;
          console.log(res)
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.check=false;
          this.resetForm();
          this.router.navigate(['/employeeprofile']);
          }
          else
            this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      );
    
    }
  }

  initializeFormGroup() {
    this.userservice.logi1.setValue({
      first:'', 
      last:'',       
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
    this.userservice.logi1.reset();
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  }
  get email()
  {
   return this.userservice.logi1.get('email');
  }
  get phone()
  {
   return this.userservice.logi1.get('phone');
  }
  get first()
  {
   return this.userservice.logi1.get('first');
  }
  get last()
  {
   return this.userservice.logi1.get('last');
  }
  get password()
  {
   return this.userservice.logi1.get('password');
  }
  get address()
  {
   return this.userservice.logi1.get('address');
  }
  get post()
  {
   return this.userservice.logi1.get('Postalcode');
  }
  get City()
  {
   return this.userservice.logi1.get('City');
  }
  get Country()
  {
   return this.userservice.logi1.get('Country');
  } 
  path:string;
  upload($event:any){
    this.path=$event.target.files[0];
    this.showres=true;
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
          this.downloadurl=d;
          var base={
            url:this.downloadurl
          }
          this.userservice.getshort(base).subscribe((res:any)=>{
            this.downloadurl=res.url;
            console.log(this.downloadurl);
         })
        });
      })
    ).subscribe();
     
  } 
  shapplied :any=[];
  app(){
    // this.applied=true;
    // this.http.post('http://localhost:3000/employee/fpe',{mail:this.userDetails['email']}).subscribe(r=>{
    //   this.shapplied=r;
    //   console.log(this.shapplied['applied'])
    // })
    if(!this.downloadurl)
    this.router.navigateByUrl(`/employee/applied/${this.resume}`)
    else
    {
      this.router.navigateByUrl(`/employee/applied/${this.downloadurl}`)
    }
  }
  apply(){
    var send={
      email:this.userDetails['email']
    };
    console.log(this.userDetails['email']);
    this.userservice.sjobs(send).subscribe(r=>{
      this.router.navigate([`apply/jobs/${r['resume']}`]);
      console.log(r['resume']);
    })
      // 3N7rdfR "$2a$10$qotCAXQ3Rv.GwPsk.zP.oOIY5j67hiA6ESEanG4GWR4HlInj769rW"
    }
  }
 
