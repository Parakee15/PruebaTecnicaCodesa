import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as ENV } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(public httpClient: HttpClient) {

  }
  public getRoles() {
    return this.httpClient.get(ENV.API.ROL);
  }
}
