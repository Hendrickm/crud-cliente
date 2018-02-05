import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { ListarPessoaComponent } from './listar-pessoa/listar-pessoa.component';
import { CadastrarPessoaComponent } from './cadastrar-pessoa/cadastrar-pessoa.component';

@NgModule({
  imports: [
    CommonModule,
    PessoaRoutingModule
  ],
  declarations: [ListarPessoaComponent, CadastrarPessoaComponent]
})
export class PessoaModule { }
