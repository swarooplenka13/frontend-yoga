import { HttpClient } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, finalize } from 'rxjs';
import { threadId } from 'worker_threads';
import { EmployeeprofilComponent } from '../employeeprofil/employeeprofil.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-employjobs',
  templateUrl: './employjobs.component.html',
  styleUrls: ['./employjobs.component.css']
})
export class EmployjobsComponent implements OnInit {

  jobs: any = [];
  dat: any = new Set();
  details: any;
  id: any;
  matc: any;
  show: boolean | false;
  name: any;
  email: any;
  CompanyName: any;
  address: any;
  desc: any;
  email1: any;
  other: any;
  role: any;
  type: any;
  applied: Boolean | false;
  userDetails: any;
  shup: Boolean | false;
  downloadurl: any;
  path: string;
  shw: Boolean | false;
  i: Boolean | false;
  alone: Number
  attached: Number
  attracted: Number
  compound: Number
  entitled: Number
  free: Number
  happy: Number
  hated: Number
  loved: Number
  negative: Number
  neutral: Number
  positive: Number
  bsubject = new BehaviorSubject<string>("s");
  bsubject1 = new BehaviorSubject<string>("s");
  link: any;
  rs: any;
  achievement: any
  active: any
  agreeableness: any
  conscientiousness: any
  cooperative: any
  disciplined: any
  emotionally_aware: any
  extraversion: any
  imaginative: any
  intellectual: any
  neuroticism: any
  openness: any
  trusting: any
  appl: Boolean = false;
  constructor(public user: UserService, private route: ActivatedRoute, private http: HttpClient, private router: Router, private af: AngularFireStorage, private ep: EmployeeprofilComponent) {
  }

  ngOnInit(): void {
    // this.check();
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get('http://localhost:3001/recruiter/v').subscribe((res) => {
      this.jobs = res;
      console.log(res);
    })
    this.link = `employee/applied/${this.id}`;
    var send = {
      res: this.id
    }
    this.http.get("http://localhost:3000/employee/postdata", { params: send }).subscribe(r => {
      this.name = r['fullName']
      this.email = r['email']
      this.bsubject.next(r['fullName'])
      this.bsubject.subscribe(d => this.name = d)
      this.bsubject1.next(r['email'])
      this.bsubject1.subscribe(d => {
        console.log(d)
        this.user.el = d;
        console.log(this.user.el);
      })
      this.userDetails = r;
      this.email = this.userDetails['email']
    })
    this.http.get("http://localhost:3002/jobs/view").subscribe((r) => {
      console.log(r['applied']);
      var i = 0;
      r['applied'].filter((elem: any) => {
        if (elem.Email === this.email) {
          console.log(elem);
          this.dat.add(elem);
        }
      })
      console.log(this.dat)
    });
  }
  match(d: any, c: any, e: any, r: any, t: any, o: any, a: any) {
    console.log(d);
    this.http.post("http://localhost:3000/employee/fpe", { mail: this.userDetails['email'] }).subscribe(r1 => {
      console.log(r1['applied']);
      for (var i = 0; i < r1['applied'].length; i++) {
        console.log(this.CompanyName + this.role)
        if (r1['applied'][i]['role'] == this.role && r1['applied'][i]['CompanyName'] == this.CompanyName) {
          this.appl = true;
          console.log(this.appl)
          alert("Already applied");
          this.i = false;
          break;
        }
      }
    })
    this.http.get(`http://127.0.0.1:5501/getemotions/${this.id}`).subscribe(res => {
      this.alone = res['alone']
      this.attached = res['attached']
      this.attracted = res['attracted']
      this.compound = res['compound']
      this.entitled = res['entitled']
      this.free = res['free']
      this.happy = res['happy']
      this.hated = res['hated']
      this.loved = res['loved']
      this.negative = res['negative']
      this.neutral = res['neutral']
      this.positive = res['positive']
    })
    this.http.get(`http://127.0.0.1:5500/getdata/${this.id}.${d}`).subscribe(r => {
      this.matc = r['match'];
      this.rs = r['resume'];
      this.http.post('http://localhost:3002/jobs/insights', this.rs).subscribe(res => {
        console.log(res['data']);
        console.log(this.rs);
        /*
         achievement_striving: 0.20169420133851268
          active: 0.2944908485097449
          agreeableness: 0.39001879919607924
          conscientiousness: 0.2632261294349009
          cooperative: 0.5224061862517198
          disciplined: 0.3631586274100369
          emotionally_aware: 0.41996499667749215
          extraversion: 0.41276203341570644
          imaginative: 0.2180482564759007
          intellectual: 0.3379750343602767
          neuroticism: 0.6125830138244732
          openness: 0.6029378921650597
          trusting: 0.4551191382874551
         */
        this.achievement = res['data'][0]['achievement_striving'];
        this.active = res['data'][0]['active'];
        this.agreeableness = res['data'][0]['agreeableness'];
        this.conscientiousness = res['data'][0]['conscientiousness']
        this.cooperative = res['data'][0]['cooperative'];
        this.disciplined = res['data'][0]['disciplined'];
        this.emotionally_aware = res['data'][0]['emotionally_aware'];
        this.extraversion = res['data'][0]['extraversion'];
        this.imaginative = res['data'][0]['imaginative'];
        this.intellectual = res['data'][0]['intellectual'];
        this.neuroticism = res['data'][0]['neuroticism'];
        this.openness = res['data'][0]['openness'];
        this.trusting = res['data'][0]['trusting']
        console.log(100 * (this.achievement))
      })
      console.log(r['match']);
    });
    this.i = true;
    this.show = true;
    console.log(this.userDetails['email'])
    this.CompanyName = c
    this.address = a
    this.desc = d
    this.email1 = e
    this.other = o
    this.role = r
    this.type = t
    console.log(this.dat)



  }
  close() {
    this.show = false;
    this.i = false;
    this.matc=0;
  }
  cr() {
    this.i = false;
  this.matc=0;
  }
  nav() {
    this.router.navigate(['/employeeprofile']);
  }
  logout() {
    this.user.deleteToken();
    this.router.navigate(['/home']);
  }
  apply() {
    var send = {
      res: this.id
    }
    var appliedjob = {
      CompanyName: this.CompanyName,
      email: this.email1,
      role: this.role,
      type: this.type,
      desc: this.desc,
      other: this.other,
      address: this.address,
      Name: this.name,
      Resume: this.id,
      Email: this.userDetails['email'],
      match: this.matc,
      alone: this.alone,
      attached: this.attached,
      attracted: this.attracted,
      compound: this.compound,
      entitled: this.entitled,
      free: this.free,
      happy: this.happy,
      hated: this.hated,
      loved: this.loved,
      negative: this.negative,
      neutral: this.neutral,
      positive: this.positive,
      achievement: this.achievement,
      active: this.active,
      agreeableness: this.agreeableness,
      conscientiousness: this.conscientiousness,
      cooperative: this.cooperative,
      disciplined: this.disciplined,
      emotionally_aware: this.emotionally_aware,
      extraversion: this.extraversion,
      imaginative: this.imaginative,
      intellectual: this.intellectual,
      neuroticism: this.neuroticism,
      openness: this.openness,
      trusting: this.trusting
    }
    var appjob = {
      c: this.CompanyName,
      e: this.email1,
      r: this.role,
      t: this.type,
      d: this.desc,
      o: this.other,
      a: this.address,
      n: this.name,
      res: this.id,
      E: this.userDetails['email'],
      m: this.matc,
      attached: this.attached,
      attracted: this.attracted,
      compound: this.compound,
      entitled: this.entitled,
      free: this.free,
      happy: this.happy,
      hated: this.hated,
      loved: this.loved,
      negative: this.negative,
      neutral: this.neutral,
      positive: this.positive,
      achievement: this.achievement,
      active: this.active,
      agreeableness: this.agreeableness,
      conscientiousness: this.conscientiousness,
      cooperative: this.cooperative,
      disciplined: this.disciplined,
      emotionally_aware: this.emotionally_aware,
      extraversion: this.extraversion,
      imaginative: this.imaginative,
      intellectual: this.intellectual,
      neuroticism: this.neuroticism,
      openness: this.openness,
      trusting: this.trusting

    }
    var mail = {
      name: this.userDetails['fullName'] + this.userDetails['last'],
      mail: this.userDetails['email'],
      company: this.CompanyName,
      role: this.role
    }

         this.applyassist();
  }
  applyassist(){
    var send = {
      res: this.id
    }
    var appliedjob = {
      CompanyName: this.CompanyName,
      email: this.email1,
      role: this.role,
      type: this.type,
      desc: this.desc,
      other: this.other,
      address: this.address,
      Name: this.name,
      Resume: this.id,
      Email: this.userDetails['email'],
      match: this.matc,
      alone: this.alone,
      attached: this.attached,
      attracted: this.attracted,
      compound: this.compound,
      entitled: this.entitled,
      free: this.free,
      happy: this.happy,
      hated: this.hated,
      loved: this.loved,
      negative: this.negative,
      neutral: this.neutral,
      positive: this.positive,
      achievement: this.achievement,
      active: this.active,
      agreeableness: this.agreeableness,
      conscientiousness: this.conscientiousness,
      cooperative: this.cooperative,
      disciplined: this.disciplined,
      emotionally_aware: this.emotionally_aware,
      extraversion: this.extraversion,
      imaginative: this.imaginative,
      intellectual: this.intellectual,
      neuroticism: this.neuroticism,
      openness: this.openness,
      trusting: this.trusting
    }
    var appjob = {
      c: this.CompanyName,
      e: this.email1,
      r: this.role,
      t: this.type,
      d: this.desc,
      o: this.other,
      a: this.address,
      n: this.name,
      res: this.id,
      E: this.userDetails['email'],
      m: this.matc,
      attached: this.attached,
      attracted: this.attracted,
      compound: this.compound,
      entitled: this.entitled,
      free: this.free,
      happy: this.happy,
      hated: this.hated,
      loved: this.loved,
      negative: this.negative,
      neutral: this.neutral,
      positive: this.positive,
      achievement: this.achievement,
      active: this.active,
      agreeableness: this.agreeableness,
      conscientiousness: this.conscientiousness,
      cooperative: this.cooperative,
      disciplined: this.disciplined,
      emotionally_aware: this.emotionally_aware,
      extraversion: this.extraversion,
      imaginative: this.imaginative,
      intellectual: this.intellectual,
      neuroticism: this.neuroticism,
      openness: this.openness,
      trusting: this.trusting

    }
    var mail = {
      name: this.userDetails['fullName'] + this.userDetails['last'],
      mail: this.userDetails['email'],
      company: this.CompanyName,
      role: this.role
    }
    this.user.mail1(mail).subscribe((res) => {
      console.log(res);
      this.ep.applied = true;
      alert("An confirmation was sent to you")
      this.router.navigate([`/employee/applied/${this.id}`]);
    })
    this.http.post("http://localhost:3002/jobs/applied", appliedjob).subscribe((r) => {
      console.log(r);
      alert("successfully applied")
      this.show = false;
    })
    this.http.post("http://localhost:3000/employee/apply", appjob).subscribe((r) => {
      console.log(r);
    })
  }
  rd(val: any) {
    location.href = `https://bit.ly/${val}`
  }
  up() {
    this.shup = true;
  }
  cup() {
    this.shup = false;
  }
  upload($event: any) {
    this.path = $event.target.files[0];
    this.shw = true;
    this.senddata();
  }
  senddata() {
    console.log(this.path);
    const paths = "/files" + Math.random() + this.path;
    const ref = this.af.ref(paths);
    const uploadTask = this.af.upload(paths, this.path);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe((d: any) => {
          this.downloadurl = d;
          var base = {
            url: this.downloadurl
          }
          this.user.getshort(base).subscribe((res: any) => {
            this.downloadurl = res.url;
            console.log(this.downloadurl);
          })
        });
      })
    ).subscribe();

  }

  send: any;
  Submit() {
    this.send = {
      fullName: this.userDetails['fullName'],
      last: this.userDetails['last'],
      email: this.userDetails['email'],
      password: this.userDetails['password'],
      address: this.userDetails['address'],
      Postalcode: this.userDetails['Postalcode'],
      City: this.userDetails['City'],
      Country: this.userDetails['Country'],
      resume: this.downloadurl,
      phone: this.userDetails['phone'],
      saltSecret: this.userDetails['saltSecret']
    }
    this.user.update1(this.send).subscribe(
      (res: any) => {
        console.log(res)
        this.router.navigate([`/apply/jobs/${this.downloadurl}`]);
      }
    );

  }
}
