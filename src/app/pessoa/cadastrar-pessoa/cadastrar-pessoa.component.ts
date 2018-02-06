import { Component, OnInit } from '@angular/core'
import { PessoaService } from '../pessoa.service'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Pessoa } from '../shared/pessoa.model'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.css'],
  providers: [ PessoaService ]
})

export class CadastrarPessoaComponent implements OnInit {

  public pessoa: Pessoa
  public formPessoa: FormGroup

  

  constructor(private pessoaService: PessoaService, private router: Router,) { }

  ngOnInit() {
    this.formPessoa = new FormGroup({
      nome: new FormControl(null , [ Validators.required]),
      email: new FormControl(null, [ Validators.required, Validators.email]),
      dataNascimento: new FormControl(null, [ Validators.required]),
      cpf: new FormControl(null, [ Validators.required]),
      telefones: new FormArray([
        this.initTelefones(), 
      ]),
      
    }) 
  }

  public cadastrarPessoa(){
    this.pessoa = new Pessoa(
      null,
      this.formPessoa.controls['nome'].value,
      this.formPessoa.controls['cpf'].value,
      this.formPessoa.controls['dataNascimento'].value,
      this.formPessoa.controls['email'].value,
      this.formPessoa.controls['telefones'].value
    )

    this.pessoaService.cadastrarPessoa(this.pessoa)
      .subscribe()
      
    this.formPessoa.reset();
    this.router.navigate(['/pessoa']);
      
  }

  initTelefones(){
    return new FormGroup({
      ddd : new FormControl(null,[ Validators.required]),
      numero : new FormControl(null,[ Validators.required])
    });
  }

  adicionarTelefone(){
    const control = <FormArray>this.formPessoa.controls['telefones'];
    control.push(this.initTelefones());
  }

  removerTelefone(i: number){
    const control = <FormArray>this.formPessoa.controls['telefones'];
    control.removeAt(i);
  }

  getTelefones(formPessoa){
    return formPessoa.get('telefones').controls;
  }


  

}
