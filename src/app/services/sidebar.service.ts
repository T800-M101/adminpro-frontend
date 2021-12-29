import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[] = [
     {
       title:'Dashboard', 
       icon:'mdi mdi-gauge',
       submenu: [
         {title:'Main', url:'/'},
         {title:'Graphics', url:'grafica1'},
         {title:'Promesas', url:'promesas'},
         {title:'ProgressBar', url:'progress'},
         {title:'Rxjs', url:'rxjs'},
       ]
      }

  ];

  constructor() { }
}
