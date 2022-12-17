import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-applied',
  templateUrl: './applied.component.html',
  styleUrls: ['./applied.component.css']
})
export class AppliedComponent implements OnInit {
  id:any;
  jobs:any=[];
  constructor(private user:UserService,private route:ActivatedRoute,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    console.log(this.user.usermail);
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    var send={
       resume: this.id
    }
    this.http.post('http://localhost:3000/employee/applyget',send).subscribe((res) => {
      this.jobs = res;
      console.log(res);
    })
  }
 clapp(){
   this.router.navigateByUrl('/employeeprofile')
 }
 view(val:any){
  location.replace(`https:bit.ly/${val}`);
}
}
