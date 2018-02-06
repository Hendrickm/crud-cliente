import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
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
        this.pessoas = pessoas
      },
      erro => {
        console.log(erro)
      }
 
    )
  }

  public redirecionarCadastro(){
    console.log("as")
    this.router.navigate(['/cadastrar-pessoa'])
  }

  public redirecionarEdicao(pessoa: Pessoa){
    this.router.navigate(['/editar-pessoa/'+pessoa.id])
  }


  public deletarPessoa(pessoa: Pessoa){
    this.pessoaService.deletarPessoa(pessoa.id)
      .subscribe(res => {
        this.listarPessoas()
        this.router.navigate(['/pessoa'])
        console.log('Pessoas Excluida')
      })

  }

}
