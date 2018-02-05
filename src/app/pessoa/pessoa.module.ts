import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http'


import { PessoaRoutingModule } from './pessoa-routing.module';
import { ListarPessoaComponent } from './listar-pessoa/listar-pessoa.component';
import { CadastrarPessoaComponent } from './cadastrar-pessoa/cadastrar-pessoa.component';
import { IdadePipe } from './shared/idade.pipe'

@NgModule({
  imports: [
    CommonModule,
    PessoaRoutingModule,
    HttpModule,
    
  ],
  declarations: [ListarPessoaComponent, CadastrarPessoaComponent, IdadePipe]
})
export class PessoaModule { }
