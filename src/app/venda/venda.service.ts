import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  baseUrl = 'http://127.0.0.1:8000/adm/';
  constructor(private http: HttpClient) { }

  getAllVendas() : Observable<any> {
    return this.http.get(this.baseUrl + 'lista_venda');
  }

  getVenda(id: number) : Observable<any> {
    return this.http.get(this.baseUrl + 'lista_venda/' + id + '/');
  }

  saveNewVenda(venda: any) : Observable<any> {
    return this.http.post(this.baseUrl + 'venda/', venda);
  }

  updateVenda(venda: any, id: number) : Observable<any> {
    return this.http.put(this.baseUrl + 'venda/' + id + '/', venda);
  }


  // métodos para usar em select inputs
  getAllVendedores() : Observable<any> {
    return this.http.get(this.baseUrl + 'vendedor');
  }

  getAllClientes() : Observable<any> {
    return this.http.get(this.baseUrl + 'cliente');
  }

  
}

// export class ClienteService {

//   baseUrl = 'https://swapi.dev/api/';

//   constructor(private http: HttpClient) { }

//   getAllPessoas() : Observable<any> {
//     return this.http.get(this.baseUrl + 'people/');
//   };
// }