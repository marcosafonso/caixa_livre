import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendaComponent } from './venda/venda.component';
import { FormsModule } from '@angular/forms';
import { ItensComponent } from './itens/itens.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {LOCALE_ID} from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    VendaComponent,
    ItensComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule  
  ],
  providers: [
    // {provide: LOCALE_ID,
    // useValue: "pt-BR"
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
