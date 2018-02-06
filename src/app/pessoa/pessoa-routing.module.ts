import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarPessoaComponent } from './cadastrar-pessoa/cadastrar-pessoa.component'
import { ListarPessoaComponent } from './listar-pessoa/listar-pessoa.component'

const routes: Routes = [
  {path: '', component: ListarPessoaComponent},
  {path: 'pessoa', component: ListarPessoaComponent},
  {path: 'cadastrar-pessoa', component: CadastrarPessoaComponent},
  {path: 'editar-pessoa/:id', component: CadastrarPessoaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
