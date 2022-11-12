import { environment } from './../../environments/environment';
import { Category } from './../models/produc.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private urlApi: string = `${environment.API_URL}/api/categories`;

  constructor(private http: HttpClient) {

  }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params.set('limit', limit);
      params.set('offset', offset);
    }
    return this.http.get<Category[]>(this.urlApi, { params })
  }
}
