import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  num1:number = 10;
  num2:number = 20;
  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise(( resolve, reject) => {
          
    //    const res = this.num1 + this.num2;
    //    if(true){

    //      resolve(res);
    //    }else  {
    //      reject('algo salió mal');
    //    }
    // });

    // promesa
    //    .then( ( suma ) => {
    //   console.log(suma);
    // })
    //    .catch(error => {
    //      console.log(error);
    //    });

    //   console.log('Fin del ngInit');
    this.getUsuarios().then( usuarios => {
      console.log('La info es:', usuarios)
    })
  }

getUsuarios(){

  return  new Promise( (resolve, reject) => {
    
    fetch('https://reqres.in/api/users')
      .then( resp  => resp.json())
      .then( body => resolve(body.data));
  }); 

  
}
}
