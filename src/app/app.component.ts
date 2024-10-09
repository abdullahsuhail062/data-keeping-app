import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';  // Import FormsModule
import { RouterOutlet } from '@angular/router';
HttpResponse
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, ReactiveFormsModule,MatButtonModule,MatInputModule,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  errorMessage: string =''
  signUpForm: FormGroup
  usernameError: any
  emailError: any
  passwordError: any
  
  constructor(private http: HttpClient){
    this.signUpForm = new FormGroup({username: new FormControl('',[Validators.required, Validators.minLength(3)]), email: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@example\.com$'),Validators.email]),password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$')])})}

  submitForm(){
    const username = this.signUpForm.get('username')?.value
    const email = this.signUpForm.get('email')?.value   
    const password = this.signUpForm.get('password')?.value
      this.http.post('https://server-app-chi.vercel.app/api/registerUser',{username,email,password},{responseType: 'json'}).
      subscribe({next: (response)=> {{console.log(response);}
      },error: (err)=>{
        console.log(err);
        
        if (err.username) {
          this.usernameError = err.username
        this.signUpForm.get('username')?.setErrors({ serverError: err.username });
        }
        if (err.email) {
          this.emailError = err.email
        this.signUpForm.get('email')?.setErrors({ serverError: err.email });  
        }
        if (err.password) {
          this.passwordError = err.password
         this.signUpForm.get('password')?.setErrors({ serverError: err.password });
        }
        if (!err.username || !err.email|| !password){
          console.log('An unexpected error occurred', err); 
        }}})}}
    

   
  
  
  


  
  


      

  


