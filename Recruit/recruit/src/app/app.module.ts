import { NgModule ,Component, OnInit, Input, ViewChild} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeloginComponent } from './employeelogin/employeelogin.component';
import { RecruiterloginComponent } from './recruiterlogin/recruiterlogin.component';
import { EmployeeprofilComponent } from './employeeprofil/employeeprofil.component';
import { RecruiterprofilComponent } from './recruiterprofil/recruiterprofil.component';
import { EmployeesignupComponent } from './employeesignup/employeesignup.component';
import { RecruitersignupComponent } from './recruitersignup/recruitersignup.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import { AuthInterceptor } from 'src/app/auth.interceptor';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { Auth1Guard } from './auth1.guard';
import {Auth1Interceptor} from 'src/app/auth.interceptor';
import { AngularFireModule } from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import {CommonModule } from '@angular/common';
import { RecruiterformComponent } from './recruiterform/recruiterform.component';
import { RecjobsComponent } from './recjobs/recjobs.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { EmployjobsComponent } from './employjobs/employjobs.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FpeComponent } from './fpe/fpe.component';
import { FprComponent } from './fpr/fpr.component';
import { InvalidComponent } from './invalid/invalid.component';
import { TwofactorauthemployeeComponent } from './twofactorauthemployee/twofactorauthemployee.component';
import { AppliedComponent } from './applied/applied.component';
import { TwofactorauthrComponent } from './twofactorauthr/twofactorauthr.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeloginComponent,
    RecruiterloginComponent,
    EmployeeprofilComponent,
    RecruiterprofilComponent,
    EmployeesignupComponent,
    RecruitersignupComponent,
    RecruiterformComponent,
    RecjobsComponent,
    NavComponent,
    FooterComponent,
    FpeComponent,
    FprComponent,
    EmployjobsComponent,
    InvalidComponent,
    TwofactorauthemployeeComponent,
    AppliedComponent,
    TwofactorauthrComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule


  ],
  providers: [
AuthGuard,UserService,Auth1Guard,
{
  provide: HTTP_INTERCEPTORS,
  useClass: Auth1Interceptor,
  multi: true
},
{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}  ,
EmployeeprofilComponent,
RecruiterformComponent,
RecruiterprofilComponent,
RecruiterloginComponent,
EmployjobsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
