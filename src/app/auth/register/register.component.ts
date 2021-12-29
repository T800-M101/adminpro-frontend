import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    // name: [valor por defecto, validaciones],{validaciones personaizadas}
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: [false, Validators.required],
  },{
    validators: this.equalPasswords('password','password2')
  });

  constructor(private fb:FormBuilder, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
  }

  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    // If form is invalid stop the post
    if(this.registerForm.invalid) return

    // If the form is valid make the post
    this.userService.createUser(this.registerForm.value)
        .subscribe( resp => {
         
           // Navigate to Dashboard
           this.router.navigateByUrl('/');



        }, (err) => {
          Swal.fire('Error',err.error.msg,'error');
        })
    
  }

  fieldInvalid(field:string):boolean {

    if(this.registerForm.get(field)!.invalid && this.formSubmitted){

      return true;
    }else {
      return false;
    }
  }


  acceptTerms():boolean{
    return !this.registerForm.get('terms')!.value && this.formSubmitted;
  }

  passwordsUnmatched():boolean{
     const pass1 = this.registerForm.get('password')?.value;
     const pass2 = this.registerForm.get('password2')?.value;

     if((pass1 !== pass2) && this.formSubmitted){
       return true;
     }else{
       return false;
     }
  }


  equalPasswords(pass1:string, pass2:string){
     return (formGroup: FormGroup) => {
         const pass1Control = formGroup.get(pass1);
         const pass2Control = formGroup.get(pass2);
// if passwords match we set error as null to pass it to the validator. Otherwise,
// we pass an object {notEqual} with a property with the value true
         if(pass1Control?.value === pass2Control?.value){
              pass2Control?.setErrors(null);
         }else {
           pass2Control?.setErrors({ notEqual: true })
         }
     }
     
  }

}
