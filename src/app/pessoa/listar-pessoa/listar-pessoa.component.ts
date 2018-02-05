import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../shared/pessoa.model'
import { PessoaService } from '../pessoa.service'


@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.css'],
  providers:[ PessoaService ]
})
export class ListarPessoaComponent implements OnInit {

  public pessoas: Array<Pessoa>

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.pessoaService.listarPessoas().subscribe(
      pessoas => {
        this.pessoas = pessoas;
      },
      err => {
        console.log(err);
      }
 
    );
  }

}
