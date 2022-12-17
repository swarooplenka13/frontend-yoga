// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/employee',
  api: 'http://localhost:3001/recruiter',
  job: 'http://localhost:3002/jobs',
  firebaseConfig: {
    apiKey: "AIzaSyCspFJtvbw13KUFM_JuU9_mD1B-tchamgk",
    authDomain: "angularwt.firebaseapp.com",
    databaseURL: "https://angularwt-default-rtdb.firebaseio.com",
    projectId: "angularwt",
    storageBucket: "angularwt.appspot.com",
    messagingSenderId: "340432414978",
    appId: "1:340432414978:web:cb7eb88a10f1be0064ba1b",
    measurementId: "G-4EV4QTQY3Y"
},
 short:'http://localhost:5501/getdata'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
