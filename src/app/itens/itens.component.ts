import { AppComponent } from './../app.component';
import { ItensService } from './itens.service';
import { ProdutoServico } from './../../models/produto';
import { Item } from './../../models/item';
import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {

  @Input('id_venda')
  parent_id: number = 0;
  
  item: Item = new Item;
  itens_vendas: Item[] = [];
  totalizador_itens: number = 0;

  produtos_servicos: ProdutoServico[] = []; 
  selectedProdutoServico: number = 0;
  selectedDeleteItem: number = 0;
  totalizador_item: number = 0;

  constructor(private route: ActivatedRoute,
              private api: ItensService,
              private router: Router,
              private AppComponent: AppComponent) { }

  criaItemVenda(){ 
    this.item.venda = this.parent_id; // TODO como fazer
    this.item.produto_servico = this.selectedProdutoServico;

    this.api.saveNewItemVenda(this.item).subscribe(
      data => {
        console.log("Criado Item Novo.");
        this.item = new Item;
        this.loadVendaItemCompleto();
        
      },
      error => {
        console.log("Aconteceu um erro no cadastro Item.", error.message);
      }
    )
  };

  loadProdutos(){
    this.api.getAllProdutos().subscribe(
      data => {
        this.produtos_servicos = data;
      },
      error => {
        console.log("Aconteceu um erro na consulta produto.", error.message);
      }
    )
  };

  loadVendaItemCompleto(){
    this.api.getVendaItemCompleto(this.parent_id).subscribe(
      data => {
        this.itens_vendas = data.list_itens;
        this.totalizador_item = this.itens_vendas.map(a => +a.total).reduce(function(a, b)
        {
          return a + b;
        });
        
      },
      error => {
        console.log("Aconteceu um erro na consulta produto.", error.message);
      }
    )
  };

  deleteItemVenda(id_item: number){ 
    console.log("eu sei");
    console.log(id_item);
    console.log("eu nao sei");
    this.api.deleteItemVenda(id_item).subscribe(
      data => {
        console.log("Deletado Item.");
        this.item = new Item;
        this.loadVendaItemCompleto();
          
      },
      error => {
        console.log("Aconteceu um erro no delete Item.", error.message);
      }
    )
  };
  

  ngOnInit(): void {
    console.log("cheguei aqui")
    console.log(this.parent_id)
    console.log("input enter....")
    this.loadProdutos();
  }

}
