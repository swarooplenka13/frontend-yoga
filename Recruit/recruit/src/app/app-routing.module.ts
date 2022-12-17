import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppliedComponent } from './applied/applied.component';
import { AuthGuard } from './auth.guard';
import { Auth1Guard } from './auth1.guard';
import { EmployeeloginComponent } from './employeelogin/employeelogin.component';
import { EmployeeprofilComponent } from './employeeprofil/employeeprofil.component';
import { EmployeesignupComponent } from './employeesignup/employeesignup.component';
import { EmployjobsComponent } from './employjobs/employjobs.component';
import { FpeComponent } from './fpe/fpe.component';
import { FprComponent } from './fpr/fpr.component';
import { HomeComponent } from './home/home.component';
import { InvalidComponent } from './invalid/invalid.component';
import { RecjobsComponent } from './recjobs/recjobs.component';
import { RecruiterformComponent } from './recruiterform/recruiterform.component';
import { RecruiterloginComponent } from './recruiterlogin/recruiterlogin.component';
import { RecruiterprofilComponent } from './recruiterprofil/recruiterprofil.component';
import { RecruitersignupComponent } from './recruitersignup/recruitersignup.component';
import { TwofactorauthemployeeComponent } from './twofactorauthemployee/twofactorauthemployee.component';
import { TwofactorauthrComponent } from './twofactorauthr/twofactorauthr.component';

const routes: Routes = [
  {
    path:'home',component:HomeComponent
  },
  {
    path:'',redirectTo:'/home',pathMatch:'full'
  },
  {
    path:'employeelogin',component:EmployeeloginComponent
  },
  {
    path:'employeesignup',component:EmployeesignupComponent
  },
  {
    path:'employeeprofile',component:EmployeeprofilComponent,canActivate:[AuthGuard]
  },
  {
    path:'recruiterlogin', component:RecruiterloginComponent
  },
  {
    path:'recruitersignup',component:RecruitersignupComponent,
  },
  {
    path:'recruiterprofile',component:RecruiterprofilComponent,canActivate:[Auth1Guard]
  },
  {
    path:'recruiter/fill',component:RecruiterformComponent
  },
  {
    path:'view/jobs',component:RecjobsComponent
  },
  {
    path:'apply/jobs/:id',component:EmployjobsComponent
  },
  {
    path:'employee/forgot/password',component:FpeComponent
  },
  {
    path:'recruiter/forgot/password',component:FprComponent
  },
  {
    path:'employee/two/factor/authentication',component:TwofactorauthemployeeComponent
  },
  {
   path:"employee/applied/:id",component: AppliedComponent
  },
  {
    path:'recruiter/two/factor/authentication',component:TwofactorauthrComponent
  },
  {
    path:"**",component:InvalidComponent
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled',
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
