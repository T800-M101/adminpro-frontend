import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public imageUpload!:File;
  public imgTemp!:any;
  constructor(public modalImagenService: ModalImagenService, public fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.imgTemp = null;
    this.modalImagenService.closeModal();
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

    const id = this.modalImagenService.id;
    const type = this.modalImagenService.type;
    this.fileUploadService.updatePicture(this.imageUpload,type,id)
                          .then( img => {
                            Swal.fire('Saved','The photo was saved.','success');
                            this.modalImagenService.onUpdateImg.emit(img);
                            this.closeModal();
                          }).catch(err => {
                            console.log(err)
                            Swal.fire('Error','image could not be uploaded.','error');
                          });
  }

}
