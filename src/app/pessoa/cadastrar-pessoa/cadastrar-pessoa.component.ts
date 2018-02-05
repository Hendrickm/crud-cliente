import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pessoa } from '../shared/pessoa.model'

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.css'],
  providers: [ PessoaService ]
})

export class CadastrarPessoaComponent implements OnInit {

  public pessoa: Pessoa
  public formPessoa: FormGroup = new FormGroup({
    'nome': new FormControl(null , [ Validators.required]),
    'email': new FormControl(null, [ Validators.required, Validators.email]),
    'dataNascimento': new FormControl(null, [ Validators.required]),
    'cpf': new FormControl(null, [ Validators.required])
  }) 

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
  }

  public cadastrarPessoa(){
    console.log(this.formPessoa.value)
  }

}
