import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user/user.service';
import { RolService } from '../../shared/services/rol/rol.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public formSearchByName: FormGroup;
  public formUser: FormGroup;
  public userList: Array<any>;
  public rolesList: Array<any>;
  public headerTable: Array<any>;

  constructor(private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _rolService: RolService,
    private _alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initializer();
    this.buildForm();
    this.getRoles();
    this.getUsers();
  }

  private initializer(): void {
    this.headerTable = [
      { head: 'Id usuario', key: 'id_usuario' },
      { head: 'Nombre', key: 'nombre' },
      { head: 'Rol', key: 'rol_desc' },
      { head: 'Activo', key: 'activo_desc' }
    ];
  }

  private buildForm(): void {
    this.formSearchByName = this._formBuilder.group({
      name: [null]
    });

    this.formUser = this._formBuilder.group({
      id_user: [{ value: null, disabled: true }],
      name: [null, [Validators.required]],
      rol: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  public getUsers(name?: string) {
    this._userService.getUsers(name).subscribe((res: any) => {
      console.log('getUser res ->', res);
      this.userList = res.data.map((user: any) => {
        user.activo_desc = user.activo == 1 ? 'Si' : 'No';
        user.rol_desc = user.rol.nombre;
        return user;
      });
    });
  }

  private getRoles(): void {
    this._rolService.getRoles().toPromise().then((res: any) => {
      console.log('getRoles res ->', res);
      this.rolesList = res.data.map((item: any) => ({ value: item.id_rol, label: item.nombre }));
    }).catch((err) => {
      console.log('getRoles err ->', err);
    });
  }

  public onSubmitSearch() {
    console.log('this.formSearchByName', this.formSearchByName);
    let formData = this.formSearchByName.value;
    this.getUsers(formData.name?.trim());
  }

  private validateForm(form: FormGroup): boolean {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      control.markAsTouched();
      control.updateValueAndValidity();
    });
    return form.valid;
  }

  public viewUser(user: any) {
    this.formUser.patchValue({
      id_user: user.id_usuario,
      name: user.nombre,
      rol: user.rol.id_rol,
      status: user.activo
    });
  }

  public updateUser(idUser: string, jsonData: any) {
    this._userService.updateUser(idUser, jsonData).toPromise().then((res: any) => {
      console.log('updateUser res ->', res);
      this.formUser.reset();
      this.getUsers();
      this._alertService.openSwal({
        title: 'Información',
        text: res.msg,
        icon: 'success'
      });
    }).catch((err) => {
      console.log('updateUser err ->', err);
      this._alertService.openSwal({
        title: 'Error',
        text: err.error.msg,
        icon: 'error'
      });
    });
  }

  public editUser() {
    if (!this.validateForm(this.formUser)) return;
    let formData = this.formUser.getRawValue();
    let jsonData = {
      nombre: formData.name,
      activo: formData.status,
      rol: { id_rol: formData.rol },
    };
    this.updateUser(formData.id_user, jsonData);
  }

  private saveUser(jsonData: any) {
    this._userService.saveUser(jsonData).toPromise().then((res: any) => {
      console.log('saveUser res ->', res);
      this.formUser.reset();
      this.getUsers();
      this._alertService.openSwal({
        title: 'Información',
        text: res.msg,
        icon: 'success'
      });
    }).catch((err) => {
      console.log('saveUser err ->', err);
      this._alertService.openSwal({
        title: 'Error',
        text: err.error.msg,
        icon: 'error'
      });
    });
  }

  public saveNewUser() {
    if (!this.validateForm(this.formUser)) return;
    let formData = this.formUser.value;
    let jsonData = {
      nombre: formData.name,
      activo: formData.status,
      rol: { id_rol: formData.rol },
    };
    this.saveUser(jsonData);
  }

  public deleteUser(id: string) {
    this._userService.deleteUser(id).toPromise().then((res: any) => {
      console.log('deleteUser res ->', res);
      this.formUser.reset();
      this.getUsers();
      this._alertService.openSwal({
        title: 'Información',
        text: res.msg,
        icon: 'success'
      });
    }).catch((err) => {
      console.log('deleteUser err ->', err);
      this._alertService.openSwal({
        title: 'Error',
        text: err.error.msg,
        icon: 'error'
      });
    });
  }
}



