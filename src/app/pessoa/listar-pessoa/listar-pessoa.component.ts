import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Pessoa } from '../shared/pessoa.model'
import { PessoaService } from '../pessoa.service'
import {ActivatedRoute, Router} from '@angular/router'
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.css'],
  providers:[ PessoaService ]
})
export class ListarPessoaComponent implements OnInit {

  public pessoas: Array<Pessoa>

  public formBusca: FormGroup

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit() {
    this.listarPessoas()

      this.formBusca = new FormGroup({
        nomeBusca: new FormControl(null),
        cpfBusca: new FormControl(null)
      })
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

  public buscarPessoas(){
    let nome: string = this.formBusca.controls['nomeBusca'].value
    let cpf : string = this.formBusca.controls['cpfBusca'].value
    if(nome || cpf){
      this.pessoaService.buscarPessoa(nome, cpf).subscribe(
        pessoas => {
          this.pessoas = pessoas
        },
        erro => {
          console.log(erro)
        }
      )
    }else{
      this.listarPessoas()
    }
    
    
  }

  public redirecionarCadastro(){
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
