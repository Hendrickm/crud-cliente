import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../shared/pessoa.model'
import { PessoaService } from '../pessoa.service'
import {ActivatedRoute, Router} from '@angular/router'


@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.css'],
  providers:[ PessoaService ]
})
export class ListarPessoaComponent implements OnInit {

  public pessoas: Array<Pessoa>

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit() {
    this.listarPessoas()
  }

  public listarPessoas(){
    this.pessoaService.listarPessoas().subscribe(
      pessoas => {
        this.pessoas = pessoas;
      },
      err => {
        console.log(err);
      }
 
    );
  }


  public deletarPessoa(id: number){
    this.pessoaService.deletarPessoa(id)
      .subscribe(res => {
        this.listarPessoas();
        this.router.navigate(['/pessoa']);
        console.log('Pessoas Excluida');
      })

  }

}
