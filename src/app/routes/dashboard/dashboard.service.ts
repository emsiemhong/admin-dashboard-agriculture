import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseURL = environment.apiUrl; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/users`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/categories`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/products`);
  }

  getTotalUsers(): Observable<any> {
    return this.http.get<any[]>(`${this.baseURL}/totalUsers`);
  }

  getTotalProducts(): Observable<any> {
    return this.http.get<any[]>(`${this.baseURL}/totalProducts`);
  }

  getTotalCategories(): Observable<any> {
    return this.http.get<any[]>(`${this.baseURL}/totalCategories`);
  }
}
