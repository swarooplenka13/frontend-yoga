import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from './user.mode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    cpassword:'',
  };
  email:any;
  em:any;
  resume:any;
  name:any;
  el:any;
  usermail:any;
  rmail:any;
  logi=new FormGroup({
    first: new FormControl('',Validators.required),
    last: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    cpassword: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    Postalcode: new FormControl('',Validators.required),
    City: new FormControl('',Validators.required),
    Country:new FormControl('',Validators.required),
    resume:new FormControl(''),
    phone:new FormControl('',[Validators.required, Validators.minLength(10)]),
  })
  logi1=new FormGroup({
    first: new FormControl('',Validators.required),
    last: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    Postalcode: new FormControl('',Validators.required),
    City: new FormControl('',Validators.required),
    Country:new FormControl('',Validators.required),
    resume:new FormControl(''),
    phone:new FormControl('',[Validators.required, Validators.minLength(10)]),
  })
  job=new FormGroup({
   CompanyName: new FormControl('',Validators.required),
   email: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
    role: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    desc:new FormControl(''),
    other:new FormControl('')
  })
  job1=new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
   })
   info:any;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  noAuthHeader1 = { headers: new HttpHeaders({ 'NoAuth1': 'True' }) };
  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user:any){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }
  postUser1(user: any){
    return this.http.post(environment.api+'/register',user,this.noAuthHeader1);
  }
   getjobs(val:any)
   {
     return this.http.get(environment.api+'/view',{params:val});
   }
   sjobs(val:any)
   {
     return this.http.get(environment.apiBaseUrl+'/view',{params:val});
   }
  login(authCredentials:any) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }
  
  login1(authCredentials:any) {
    return this.http.post(environment.api + '/authenticate', authCredentials,this.noAuthHeader1);
  }
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }
  getUserProfile1() {
    return this.http.get(environment.api + '/recruiterProfile');
  }
  getjobs1(){
    return this.http.get('http://localhost:3002/jobs/showjobs');
  }
  getshort(val:any)
  {
    return this.http.post(environment.apiBaseUrl+'/getdata',val);
  }
 update(val:any)
 {
   return this.http.post(environment.apiBaseUrl+'/data',val);
 }
 update1(val:any)
 {
   return this.http.post(environment.apiBaseUrl+'/resdata',val);
 }
 update3(val:any)
 {
   return this.http.post(environment.apiBaseUrl+'/two',val);
 }
 update2(val:any)
 {
   return this.http.post('http://localhost:3001/recruiter/update',val);
 }
 delete(val:any)
 {
  return this.http.post('http://localhost:3001/recruiter/delete',val)
 }
 mail1(val:any)
 {
   return this.http.post('http://localhost:3002/jobs/sendmail',val);
 }
 mail2(val:any)
 {
   return this.http.post('http://localhost:3002/jobs/sendmail1',val);
 }
 mail3(val:any)
 {
   return this.http.post('http://localhost:3002/jobs/sendmail2',val);
 }
 otp(val:any)
 {
   return this.http.post('http://localhost:3002/jobs/otp',val);
 }
 otp1(val:any)
 {
   return this.http.post('http://localhost:3002/jobs/otp1',val);
 }
 postjob(val:any)
 {
   return this.http.post(environment.api+'/data',val,this.noAuthHeader1);
 }
 postjob1(val:any)
 {
   return this.http.post(environment.job+'/avljobs',val,this.noAuthHeader1);
 }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setToken1(token: string) {
    localStorage.setItem('tokenr', token);
  }
   
  getToken() {
    return localStorage.getItem('token');
  }
  getToken1() {
    return localStorage.getItem('tokenr');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
  deleteToken1() {
    localStorage.removeItem('tokenr');
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  getUserPayload1() {
    var token = this.getToken1();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  } 
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
  isLoggedIn1() {
    var userPayload = this.getUserPayload1();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
