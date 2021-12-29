import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {
  
  public intervalSubs!:Subscription;
  constructor() {

    this. intervalSubs = this.retornaIntervalo()
    .subscribe(valor => console.log(valor))
    


    // this.retornaObservable().pipe(retry(1))
    //     .subscribe( resp => console.log('interval:', resp),
    //                 error => console.log(error),
    //                 () => console.log('obs$ completado.'))
  }

  
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }


retornaIntervalo(): Observable<number>{
   return interval(100)
          .pipe(       // Permite usar operadores
            //take(10),  // Son la cantidad de veces que se quiere hacer retry
            map(valor => valor +1), // mapea el valor que se recibe
            filter( valor => valor % 2 === 0) // filtra la data de acuerdo a condición del predicado
          );
}

  retornaObservable():Observable<number>{
    let i = 0;
    const obs$ = new Observable<number>( observer => {

        setInterval( () => {
          
          observer.next(i)

          if(i === 3){
            i=1;
            observer.error('Error: i llegó a 3');
          }
  
          if(i === 4){
            observer.complete();
          }


        },1000);

       

    });

    return obs$;
  }
}
