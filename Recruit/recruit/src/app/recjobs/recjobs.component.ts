import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-recjobs',
  templateUrl: './recjobs.component.html',
  styleUrls: ['./recjobs.component.css']
})
export class RecjobsComponent implements OnInit,AfterViewInit {
  constructor(private userservice:UserService,private router:Router,private http:HttpClient) { }
  dat:any=[];
  appliedData:any=[];
  show:Boolean|false;
  role:any;
  c1:any;
  sx:any;
  name:any;
  mail:any;
  cmp:any;
  email:any;
  res:any;
  shp:Boolean|false;
  open: Boolean|false;
  role1:any;
  type1:any;
  sal:any;
  rmail:any;
  ngOnInit(): void {
    console.log(this.userservice.em)
    var send={
      email:this.userservice.em
    };
    this.userservice.getjobs(send).subscribe(
       r=>{ 
        this.dat=r['post'];
        this.rmail=r['email'];
        console.log(r)
      }
      );
    }
    ngAfterViewInit(): void {
    }
    cn:any;
    add:any;
    r:any;
    t:any;
    d:any;
    o:any;
    m:any;
    delete(cmp:any,r:any,add:any,t:any,d:any,o:any,m:any)
    {
      this.cn=cmp;
      this.r=r;
      this.add=add
      this.t=t
      this.d=d
      this.o=o
      this.m=m
      console.log(this.m)
      var newuser ={
        CompanyName:this.cn,
        role:this.r,
        email:this.m,
        address:this.add,
        type:this.t,
        other:this.o,
        desc:this.d,
    };
    if(confirm("Do you want delete this job")){
    this.userservice.delete(newuser).subscribe(r=>{
      console.log(r);
      this.router.navigate(['/recruiterprofile']);
    })
    this.http.post("http://localhost:3002/jobs/delete",{role:this.r}).subscribe(r=>{
      console.log(r);
    })
  }
    }
    send()
    {
      var s={
         name:this.name,
         message:this.c1,
         company:this.cmp,
         role:this.role,
         mail:this.mail,
      }
      var sent={
        name:this.name,
        res:this.res,
        mail:this.mail,
        role:this.role1,
        type:this.type1,
        sal:this.sal,
        email:this.email
      }
      console.log(this.email)
      this.userservice.mail2(s).subscribe(r=>{
        console.log(r);
      })
      this.http.post("http://localhost:3001/recruiter/sent",sent).subscribe(r=>{
        console.log(r);
      })
      var s1={
        name:this.cmp,
        subject:"List of shortlisted applicants",
        email:this.mail,
        empname:this.name,
        resume:this.res,
        mail:this.email
      }
      this.userservice.mail3(s1).subscribe(r=>{
        console.log(r);
      })
      alert("mail sent successfully")
      this.open=false;
    }
    getapp(val:any,n:any,e:any){
      // localhost:3002/jobs/view
      console.log(val)
      this.role=val;
      this.shp=true;
      this.cmp=n
      this.email=e;
      this.http.get("http://localhost:3002/jobs/view").subscribe((r)=>{
         console.log(r)
         r['applied'].filter((elem:any)=>{
            if(elem.role===val)
            {
              console.log(elem.Name+" "+elem.email+" "+elem.Resume)
              var job={
                name:elem.Name,
                mail:elem.Email,
                res:elem.Resume,
                match:elem.match,
                role:elem.role,
                type:elem.type,
                sal:elem.other,
                achievement: Math.round(elem.achievement*100),
                active: Math.round(elem.active*100),
                agreeableness: Math.round(elem.agreeableness*100),
                conscientiousness: Math.round(elem.conscientiousness*100),
                cooperative: Math.round(elem.cooperative*100),
                disciplined: Math.round(elem.disciplined*100),
                emotionally_aware: Math.round(elem.emotionally_aware*100),
                extraversion: Math.round(elem.extraversion*100),
                imaginative: Math.round(elem.imaginative*100),
                intellectual: Math.round(elem.intellectual*100),
                neuroticism: Math.round(elem.neuroticism*100),
                openness: Math.round(elem.openness*100),
                trusting: Math.round(elem.trusting*100),
                positive:elem.positive,
                negative:elem.negative,
                neutral:elem.neutral,
                compound:elem.compound
              }
              this.appliedData.push(job);
            }
         })
      })
      this.show=true;
    }
    close()
    {
      this.show=false;
      this.shp=false;
      console.log(this.appliedData)
    }
    c()
    {
      this.sx=false;
    }
    view(val:any)
    {
      location.replace(`https:bit.ly/${val}`);
    }
    v(val:any)
    {
      location.replace(`https:bit.ly/${val}`);
    }
    dash()
    {
      this.router.navigate(['/recruiterprofile']);
    }
    shv(val1:any,val2:any,val3:any,role:any,type:any)
    {
      this.sx=true;
      this.name=val1;
      this.res=val3;
      this.mail=val2
      this.role1=role;
      this.type1=type;
      this.open=true;
      console.log(val3)
    }
    cl(){
      this.open=false;
      // this.shp=
    }
  }
