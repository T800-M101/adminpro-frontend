import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {


  porcentaje1: number = 0;
  porcentaje2: number = 0;


 

  constructor() { }

  ngOnInit(): void {
    
  }

  get getPorcentaje1(){
    return `${this.porcentaje1}%`;
  }

  get getPorcentaje2(){
    return `${this.porcentaje2}%`;
  }





}
