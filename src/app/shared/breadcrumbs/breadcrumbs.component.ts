import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public title:string = '';

  public tituloSubs$!:Subscription;
  constructor(private router:Router) { 

    this.tituloSubs$ = this.getArgumentosRuta()
    .subscribe( ({title}) => {
      this.title = title;
      document.title = `Adminpro - ${title}`;
});
  
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }



  ngOnInit(): void {
  }

  getArgumentosRuta(){
    return this.router.events
        .pipe(
          filter( (event:any) => event instanceof ActivationEnd),
          filter( (event:ActivationEnd) => event.snapshot.firstChild == null),
          map((event:ActivationEnd) => event.snapshot.data)
          );
        
  }

}
