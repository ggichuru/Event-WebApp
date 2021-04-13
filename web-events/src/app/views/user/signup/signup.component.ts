import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      console.log(res)
      this.signupForm.reset()
      this.router.navigate(['log-in'])
    })
  }

}
