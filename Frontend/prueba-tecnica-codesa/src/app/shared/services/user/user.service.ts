import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as ENV } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpClient: HttpClient) { }

  public getUsers(name?: string) {
    let params = new HttpParams();
    if (name) params = params.append('name', name);
    return this.httpClient.get(ENV.API.USER, { params: params });
  }

  public updateUser(id: string, data: any) {
    return this.httpClient.put(`${ENV.API.USER}/${id}`, data);
  }

  public saveUser(data: any) {
    return this.httpClient.post(ENV.API.USER, data);
  }

  public deleteUser(id: any) {
    return this.httpClient.delete(`${ENV.API.USER}/${id}`);
  }
}
