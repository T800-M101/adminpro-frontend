import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class SearchesService {

  constructor(private http: HttpClient) { }

  get token():string {
    return  localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }



  transformUsers( response:any[]): User[] {
    return response.map(
      user => new User(user.name, user.email,'', user.img, user.google, user.role, user.uid)
    )
  }



  search(type: 'users' | 'medicas' | 'hospitals', term:string){
    // create url  http://localhost:3000/api/todo/users/term_to_search
    const url = `${base_url}/todo/${type}/${term}`;

    return this.http.get<any[]>(url, this.headers)
               .pipe(
                map( (resp:any) => {
                  switch (type) {
                    case 'users':
                      return this.transformUsers(resp.data);



                    default:
                      return [];
                      break;
                  }
                  })
              );
  }
}
