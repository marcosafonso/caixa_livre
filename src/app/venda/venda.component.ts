import { Venda } from './../../models/venda';
import { Cliente } from './../../models/cliente';
import { Vendedor } from './../../models/vendedor';
import { AppComponent } from './../app.component';
import { VendaService } from './venda.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  venda: Venda = new Venda;
  vendedores: Vendedor[] = [];
  selectedVendedor = null;

  clientes: Cliente[] = []; 
  selectedCliente = null;
  
  modo_edicao: boolean = false;

  form_erro_venda = {id: null, data_criacao: null, vendedor: null,
                     cliente: null, situacao: null, valor_total: null, valor_comissao_total: null}
  
  // variavel define mensagem de finaliza (1 sucesso, 2 erro, 0 nao finalizada ainda)
  msg_finaliza_venda: number = 0;
  // info final da venda
  final_info: string = '';

  constructor(private route: ActivatedRoute,
              private api: VendaService,
              private router: Router,
              private AppComponent: AppComponent) { }

    vendas: any;
    
    criaVenda(){ 
      this.venda.vendedor = this.selectedVendedor;
      this.venda.cliente = this.selectedCliente;
      this.api.saveNewVenda(this.venda).subscribe(
        (data) => {
          console.log("Criado.")
          this.modo_edicao = true;
          this.venda = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.form_erro_venda = error.error;
          console.log("Aconteceu um erro no cadastro venda.", error.message);
        }
      )
    };

    finalizaVenda(){ 
      this.venda.situacao = 2; // Finalizada 
      this.api.updateVenda(this.venda, this.venda.id).subscribe(
        (data) => {
          console.log("Finalizado.");
          this.msg_finaliza_venda = 1;
          this.final_info = 'A venda foi realizada com sucesso.'
          // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          // this.router.navigate(['venda']));
        },
        (error: HttpErrorResponse) => {
          this.msg_finaliza_venda = 2;
          this.final_info = 'Não foi possível realizar a venda. Tente novamente.'
          console.log("Aconteceu um erro no finaliza venda.", error.message);
        }
      )
    };

    cancelaVenda(){ 
      if(confirm("Você quer realmente cancelar esta venda?")) {
        this.venda.situacao = 3; // Cancelada 
        this.api.updateVenda(this.venda, this.venda.id).subscribe(
          (data) => {
            console.log("Cancelada.")
            // this.modo_edicao = true;
            // this.venda = data;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['venda']));
          },
          (error) => {
            console.log("Aconteceu um erro no cancela venda.", error.message);
          }
        )
      }
    };


    loadVendas(){
      this.api.getAllVendas().subscribe(
        data => {
          this.vendas = data;
        },
        error => {
          console.log("Aconteceu um erro na consulta.", error.message);
        }
      )
    };

    loadVendedores(){
      this.api.getAllVendedores().subscribe(
        data => {
          this.vendedores = data;
        },
        error => {
          console.log("Aconteceu um erro na consulta vendedor.", error.message);
        }
      )
    };

    loadClientes(){
      this.api.getAllClientes().subscribe(
        data => {
          this.clientes = data;
        },
        error => {
          console.log("Aconteceu um erro na consulta cliente.", error.message);
        }
      )
    };

  
  comeca_nova_venda(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['venda']));
  }

  ngOnInit(): void {
    this.loadVendas();
    this.loadVendedores();
    this.loadClientes();

  }

}
