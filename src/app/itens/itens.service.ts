import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItensService {
  baseUrl = 'http://127.0.0.1:8000/adm/';
  constructor(private http: HttpClient) { }

  getAllItens() : Observable<any> {
    return this.http.get(this.baseUrl + 'lista_item_venda');
  }

  getVendaItemCompleto(id: number) : Observable<any> {
    return this.http.get(this.baseUrl + 'lista_venda/' + id + '/');
  }

  saveNewItemVenda(venda: any) : Observable<any> {
    return this.http.post(this.baseUrl + 'item_venda/', venda);
  }

  deleteItemVenda(id: number) : Observable<any> {
    return this.http.delete(this.baseUrl + 'item_venda/' + id + '/');
  }

  getAllProdutos() : Observable<any> {
    return this.http.get(this.baseUrl + 'produto_servico');
  }

}
