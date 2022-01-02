import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url:string = environment.base_url; 

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // The constructor must be syncronous always because it must return an instance
  constructor() { }

  // This method will use pure vanilla javascript
  async updatePicture(file:File, type:'users'| 'medics' |'hospitals', id:any){

       try {
        // 1. receive arguments to update a picture  and create url of backend endpoint
        const url = `${base_url}/upload/${type}/${id}`;

        const formData = new FormData();
        formData.append('image',file);

        const resp = await fetch(url, {
          method: 'PUT',
          headers: {
            'x-token': localStorage.getItem('token') || ''
          },
          body: formData
        });

       const data = await resp.json();
        if(data.ok){
          return data.fileName
        }else {
          return false;
        }
       
      

       } catch (error) {
         console.log(error);
         false;
       }
  }


}
