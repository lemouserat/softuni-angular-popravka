import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';

export interface IUpdateUserDto extends Pick<IUser, 'username' | 'email' | 'equipment'> {
  profilePicture?: File
}

export interface CreateUserDto { username: string, email: string, password: string}

@Injectable()
export class UserService {

  constructor( private httpClient: HttpClient) {
  }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
  }

  updateProfiles$(newUser: IUpdateUserDto): Observable<IUser> {
    const formData = new FormData();
    formData.set('username', newUser.username)
    formData.set('email', newUser.email)
    formData.set('equipment', newUser.equipment)

    if(newUser.profilePicture){
      formData.append('profilePicture', newUser.profilePicture)
    }
    
    return this.httpClient.put<IUser>(`${environment.apiUrl}/users/profile`, formData, {withCredentials: true})
  }
}

