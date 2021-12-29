import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  title = {
    sales:'Sales',
    products:'Products',
    employees:'Departments',
    expenses:'Expenses'
  };

  donaLabels1:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  donaLabels2:string[] = ['Iphones', 'Tablets', 'Game Consoles'];
  donaLabels3:string[] = ['Sales', 'Support', 'Purchasing'];
  donaLabels4:string[] = ['Training', 'Incentives', 'Others'];

  donaChartData1 = [[350, 450, 100]];
  donaChartData2 = [[100, 650, 700]];
  donaChartData3 = [[200, 130, 400]];
  donaChartData4 = [[50, 750, 180]];

  constructor() { }

  ngOnInit(): void {
  }

   
}
