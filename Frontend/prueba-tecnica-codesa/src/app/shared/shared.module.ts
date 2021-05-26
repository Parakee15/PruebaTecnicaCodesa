import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlErrorComponent } from './form-control-error/form-control-error.component';
import { UserService } from './services/user/user.service';
import { RolService } from './services/rol/rol.service';



@NgModule({
  declarations: [
    FormControlErrorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormControlErrorComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    UserService,
    RolService
  ]
})
export class SharedModule { }
