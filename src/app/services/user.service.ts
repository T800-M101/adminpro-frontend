import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, delay, map, tap } from 'rxjs/operators'; // Dispara efecto secundario en el observable
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoadUsers } from '../interfaces/load-users.interface';

const base_url = environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2:any;
  public user!:User;

  constructor(private http:HttpClient, private router:Router, private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token':this.token
      }
    }
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

    return this.http.get(`${base_url}/login/renew`, {
      headers:{
        'x-token':this.token
      }
    }).pipe(
      map( (resp:any) => {
        const { email, google, name, role, img = '', uid } = resp.user;
        this.user = new User(name, email,'', img, google, role, uid);

        localStorage.setItem('token', resp.token)
        return true;
      }),

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

  updateProfile(data: {email:string, name:string, role:string | undefined}){

    data = {
      ...data,
      role: this.user.role
    }
    

     return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers)
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

  loadUsers(from:number = 0){
    // build url: http://localhost:3000/api/users?from=0
    const url = `${base_url}/users?from=${from}`;

    // url: first objet in get request
    // headers: second object in the get requet
    return this.http.get<LoadUsers>(url, this.headers)
                    .pipe(

                      map( resp => {
                        const users = resp.users.map(
                          user => new User(user.name, user.email,'', user.img, user.google, user.role, user.uid)
                        )
                        return {
                          totalRecords: resp.totalRecords,
                          users
                        }
                      })
                    )


}

deleteUser(user:User){
  // Create the end point http://localhost:3000/api/users/61ba3181a26bff057cbe0b6d

  const url = `${base_url}/users/${user.uid}`;

  return this.http.delete(url, this.headers);
   console.log('elimnando')
}

saveUser(user:User){

  return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers)
}


}
