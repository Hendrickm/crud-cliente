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

  public id: number
  public pessoa: Pessoa
  public formPessoa: FormGroup
  
  public acao: String = "Cadastrar"
  public btn: String = "Cadastrar"

  private subs: any

  constructor(
              private pessoaService: PessoaService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs = this.route.params.subscribe(params =>{
      this.id = params['id']

      this.btn = "Atualizar"
      this.acao = "Editar"
    })

    this.formPessoa = new FormGroup({
      nome: new FormControl(null , [ Validators.required]),
      email: new FormControl(null, [ Validators.required, Validators.email]),
      dataNascimento: new FormControl(null, [ Validators.required]),
      cpf: new FormControl(null, [ Validators.required]),
      telefones: new FormArray([
        this.initTelefones(), 
      ]),
    }) 

    if (this.id){
      this.pessoaService.buscarPessoaPorId(this.id).subscribe(
        pessoa =>{
          console.log(pessoa.telefones)
          this.formPessoa.patchValue({
            nome: pessoa.nome,
            email: pessoa.email,
            dataNascimento: pessoa.dataNascimento,
            cpf: pessoa.cpf,
            telefones: pessoa.telefones
          })
        },erro => {
          console.log(erro);
         }
      )

      console.log(this.formPessoa.controls.telefones)
    }

    
  }

  public cadastrarPessoa(){

    if(this.id){
      this.pessoa = new Pessoa(
        this.id,
        this.formPessoa.controls['nome'].value,
        this.formPessoa.controls['cpf'].value,
        this.formPessoa.controls['dataNascimento'].value,
        this.formPessoa.controls['email'].value,
        this.formPessoa.controls['telefones'].value
      )

      this.pessoaService.atualizarPessoa(this.pessoa)
      .subscribe()

    }else{   
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
    }
    
      
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
