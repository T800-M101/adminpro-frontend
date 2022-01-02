import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  
})
export class ProfileComponent implements OnInit {

  public profileForm!:FormGroup;
  public user!:User;
  public imageUpload!:File;
  public imgTemp!:any;



  constructor(private userService:UserService, private fileUploadService: FileUploadService) {
    this.user = this.userService.user;
   }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email,[Validators.required, Validators.email]) 
    });
  
  }

  updateProfile(){
    
    this.userService.updateProfile(this.profileForm.value)
                    .subscribe( resp => {
                      // This updates the user because an object is passed by reference
                      const { name, email} = this.profileForm.value;
                       this.user.name = name;
                       this.user.email = email;

                       Swal.fire('Saved','The changes were saved.','success');
                    }, (err) =>{
                      Swal.fire('Error',err.error.msg,'error');
                    })

  }

  uploadImg(event:any){
    
    this.imageUpload = event.target.files[0];
    if(!event.target.files[0]){
       this.imgTemp = null
       return
    } 

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
     
      this.imgTemp = reader.result;
    }
  }

  changeImg(){
    this.fileUploadService.updatePicture(this.imageUpload,'users',this.user.uid)
                          .then( img => {
                            this.user.img = img;
                            Swal.fire('Saved','The photo was saved.','success');
                          }).catch(err => {
                            console.log(err)
                            Swal.fire('Error','image could not be uploaded.','error');
                          });
  }

}
