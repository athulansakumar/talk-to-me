import { NgModule } from '@angular/core';
import {MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatListModule, MatSnackBarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';


import { LoginService } from './login.service';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    RouterModule.forChild(
      [{ path: '',  component: LoginComponent }],
    )
  ],
  providers: [ LoginService ],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
