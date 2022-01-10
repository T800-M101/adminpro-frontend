import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url:string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _hideModal:boolean = true;
  public type!:'users' | 'medics' | 'hospitals';
  public id!:string;
  public img:string = 'no-img';

  // emiting the img to update the user list on user component
  public onUpdateImg:EventEmitter<string> = new EventEmitter<string>();

  get hideModal(){
    return this._hideModal;
  }

  openModal(type: 'users' | 'medics' | 'hospitals', id:any , img:any){
    this._hideModal = false;
    this.type = type;
    this.id = id;


    // Buil url http://localhost:3000/api/upload/users/61c4f73906c3b8561ffb62e3
    if(img.includes('https')){
      this.img = img;
    }else {
       this.img = `${base_url}/upload/${type}/${img}`;
    }


  }

  closeModal(){
    this._hideModal = true;
  }
  constructor() { }
}
