import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { SearchesService } from '../../../services/searches.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public fromRecord:number = 0;
  public loading:boolean = true;
  public imgSubs!:Subscription;


  constructor(private userService:UserService,
              private searchesService:SearchesService,
              private modalImagenService:ModalImagenService) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
     this.loadUsers();

      //Subscribing to observable that is emited by the modalImagenService
     this.imgSubs = this.modalImagenService.onUpdateImg
          .pipe(delay(100))
          .subscribe( img => this.loadUsers());



  }

  loadUsers(){
    this.loading = true;
    this.userService.loadUsers(this.fromRecord).subscribe( ({totalRecords, users}) => {
      this.totalUsers = totalRecords;
      this.users = users;
      this.usersTemp = users;
    this.loading = false;


    });
  }


  changePage(value:number){
     this.fromRecord += value;

     if(this.fromRecord < 0){
      this.fromRecord = 0;
     } else if(this.fromRecord > this.totalUsers){
      this.fromRecord -= value;
     }

     this.loadUsers();
  }



  search(term:string){

    if(term.length === 0){
        this.users = [...this.usersTemp];
        return
    }

     this.searchesService.search('users',term)
         .subscribe( users => {
           this.users = users;
         })
  }

  deleteUser(user:User){
    if(this.userService.uid === user.uid){

      Swal.fire('Error','You cannot erase yourself!', 'error');
      return;
    }


    Swal.fire({
      title: 'Erase user?',
      text: `You are about to erase ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user)
            .subscribe( resp => {
              this.loadUsers();

              Swal.fire(
                'user deleted!',
                `${user.name} was deleted.`,
                'success'
              )
            });


      }
    })

  }
   changeRole(user:User){
       this.userService.saveUser(user)
           .subscribe( resp => {
             console.log(resp);
           })
   }

   openModal(user:User){
     this.modalImagenService.openModal('users',user.uid, user.img)
     console.log(user)
   }
}
