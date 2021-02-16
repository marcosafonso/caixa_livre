import { AppComponent } from './../app.component';
import { ItensService } from './itens.service';
import { ProdutoServico } from './../../models/produto';
import { Item } from './../../models/item';
import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  selectedProdutoServico = null;
  selectedDeleteItem: number = 0;
  totalizador_item: number = 0;

  form_item_erro = {id: null, venda: null, produto_servico: null, quantidade: null,
                    total: null, total_comissao: null};

  constructor(private route: ActivatedRoute,
              private api: ItensService,
              private router: Router,
              private AppComponent: AppComponent) { }

  /**
   * Cria o novo item para a venda, chamando a api.
   * Atualiza os dados da venda caso sucesso.
   * Carrega erro de response se houver.
   */
  criaItemVenda(){
    this.item.venda = this.parent_id; // TODO como fazer
    this.item.produto_servico = this.selectedProdutoServico;

    this.api.saveNewItemVenda(this.item).subscribe(
      (data) => {
        console.log("Criado Item Novo.");
        this.item = new Item;
        this.loadVendaItemCompleto();
        this.resetItem();
      },
      (error: HttpErrorResponse) => {
        this.form_item_erro = error.error;
        console.log("Aconteceu um erro no cadastro Item.", error.message);
      }
    )
  };

  /**
   * Limpar os campos após criar item venda.
   */
  resetItem() {
    this.item = new Item;
    this.selectedProdutoServico = null;
    this.form_item_erro = {id: null, venda: null, produto_servico: null, quantidade: null,
      total: null, total_comissao: null};
  }

  /**
   * Carrega os dados para o ng-select de produto_servico
   */
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

  /**
   * Carrega todos os dados da venda com seus itens.
   * Os campos foreign key vem com dados do próprio objeto para informar todos os detalhes da venda.
   */
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

  /**
   * Deleta Item selecionado para exclusão da venda.
   * @param id_item - item que será possivelmente excluído
   */
  deleteItemVenda(id_item: number){ 

    if(confirm("Você quer realmente deletar este item?"+' id: '+id_item)) {
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
    }
  };

  ngOnInit(): void {
    this.loadProdutos();
  }

}
