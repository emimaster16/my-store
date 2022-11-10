import { Product, CreateProductDto } from '../models/produc.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError } from 'rxjs';
import { checkTime } from '../interceptors/time.interceptor';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urlApi: string = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) {

  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.urlApi}`, { params, context: checkTime() }).pipe(
      retry(3),
      map(products => products.map(item => {
        console.log("IVA: " + .19 * item.price);

        return {
          ...item,
          taxes: (.19 * item.price)
        }
      }))
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.urlApi}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == HttpStatusCode.Conflict) {
            return throwError('Algo esta fallando en el servidor');
          }
          if (error.status == HttpStatusCode.NotFound) {
            return throwError('Producto no encontrado');
          }
          if (error.status == HttpStatusCode.Unauthorized) {
            return throwError('No estas permitido');
          }
          return throwError('Opps algo salio mal');
        })
      );
  }

  create(dto: CreateProductDto) {
    return this.http.post<Product>(this.urlApi, dto);
  }

  update(id: string, dto: any) {
    return this.http.put<Product>(`${this.urlApi}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.urlApi}/${id}`);

  }
}
