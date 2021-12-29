import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators'; // Dispara efecto secundario en el observable
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2:any;

  constructor(private http:HttpClient, private router:Router, private ngZone: NgZone) { 
    this.googleInit();
  }


googleInit(){

  return new Promise<void>( resolve => {
    gapi.load('auth2', () =>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '894250130484-avqi6sjobl0ltbvj9p3emd9fjb5e33re.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        
      });

      resolve();

  });

  });
}



  logout(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then( () =>  {

      this.ngZone.run( () => {

        this.router.navigateByUrl('/login');
      });
      
    });
  }

  validateToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers:{
        'x-token':token
      }
    }).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token)
      }),
      map( resp => true),
      catchError( error => of(false)) // el of retorna un nuevo observable
    );
  }

  createUser(formData: RegisterForm){
    // The post petition requires 2 arguments: 1. the route 2. the data
    // WE return the petition in order to subscribe to the observable
    return this.http.post(`${base_url}/users`, formData)
                    .pipe(
                      tap( (resp:any) => {
                        localStorage.setItem('token',resp.token)
                      })
                    );
  }


  login(formData: LoginForm){
   
    return this.http.post(`${base_url}/login`, formData)
                    .pipe(
                      tap( (resp:any) => {
                         localStorage.setItem('token',resp.token)
                      })
                    );
  }

  loginGoogle(token:any){
   
    return this.http.post(`${base_url}/login/google`, {token})
                    .pipe(
                      tap( (resp:any) => {
                         localStorage.setItem('token',resp.token)
                      })
                    );
  }


}
