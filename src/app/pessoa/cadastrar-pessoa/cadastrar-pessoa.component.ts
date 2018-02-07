import { Component, OnInit } from '@angular/core'
import { PessoaService } from '../pessoa.service'
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Pessoa } from '../shared/pessoa.model'
import {ActivatedRoute, Router} from '@angular/router'
import {IMyDpOptions} from 'mydatepicker';

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
  
  public maskCPF = [/[0-9]/, /\d/, /\d/, '.', /[0-9]/, /\d/, /\d/ ,'.', /[0-9]/, /\d/, /\d/,'-',/[0-9]/, /\d/]
  public maskDataNascimento = [/[0-9]/, /\d/, '/', /[0-9]/, /\d/ ,'/', /[0-9]/, /\d/, /\d/,/[\d]/]

  public acao: String = "Cadastrar"
  public btn: String = "Cadastrar"

  public myDatePickerOptions: IMyDpOptions = {dateFormat: 'dd/mm/yyyy'}

  private subs: any
  public loading = false

  constructor(
              private fb: FormBuilder,
              private pessoaService: PessoaService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs = this.route.params.subscribe(params =>{
      this.id = params['id']
    })

    this.formPessoa = new FormGroup({
      nome: new FormControl(null , [ Validators.required]),
      email: new FormControl(null, [ Validators.required, Validators.email]),
      dataNascimento: new FormControl(null, [ Validators.required]),
      cpf: new FormControl(null, [ Validators.required, Validators.minLength(14)]),
      telefones: new FormArray([
        this.initTelefones(), 
      ]),
    }) 

    if (this.id){
      this.btn = "Atualizar"
      this.acao = "Editar"
      this.loading = true
      this.pessoaService.buscarPessoaPorId(this.id).subscribe(
        pessoa =>{
          this.pessoa = pessoa
          console.log(pessoa.dataNascimento)
          this.loading = false
          this.pessoa = pessoa
          this.formPessoa.patchValue({
            nome: pessoa.nome,
            email: pessoa.email,
            dataNascimento: {
              date:  pessoa.dataNascimento,
              jsdate: pessoa.dataNascimento
              },
            cpf: pessoa.cpf,
            telefones: pessoa.telefones
          })
          console.log()
          this.setTelefones()
        },erro => {
          this.loading = false
          console.log(erro);
         }
      )
      
    }

    
  }

 

  public cadastrarPessoa(){

    if(this.id){
      console.log(this.formPessoa.controls['telefones'].value)
      this.pessoa = new Pessoa(
        this.id,
        this.formPessoa.controls['nome'].value,
        this.formPessoa.controls['cpf'].value,
        this.formPessoa.controls['dataNascimento'].value.jsdate,
        this.formPessoa.controls['email'].value,
        this.formPessoa.controls['telefones'].value
      )
      
      this.pessoaService.atualizarPessoa(this.pessoa).subscribe(
        res => {
          this.formPessoa.reset();
          this.router.navigate(['/pessoa'])
        })
    }else{   
      this.pessoa = new Pessoa(
        null,
        this.formPessoa.controls['nome'].value,
        this.formPessoa.controls['cpf'].value,
        this.formPessoa.controls['dataNascimento'].value.jsdate,
        this.formPessoa.controls['email'].value,
        this.formPessoa.controls['telefones'].value
          
      )

      this.pessoaService.cadastrarPessoa(this.pessoa).subscribe(
        res=>{
        this.formPessoa.reset();
        this.router.navigate(['/pessoa'])
      })
    }
    
  }


  //FUNÇÕES DO ARRAYFORM DE TELEFONES

  initTelefones(){
    return new FormGroup({
      id: new FormControl(null,[]),
      ddd: new FormControl(null,[ Validators.required, Validators.maxLength(2)]),
      numero: new FormControl(null,[ Validators.required, Validators.maxLength(9)])
    });
  }

  adicionarTelefone(){
    const control = <FormArray>this.formPessoa.controls['telefones']
    control.push(this.initTelefones());
  }

  removerTelefone(i: number){
    const control = <FormArray>this.formPessoa.controls['telefones']
    control.removeAt(i);
  }

  getTelefones(formPessoa){
    return formPessoa.get('telefones').controls
  }

  setTelefones(){
    let control = <FormArray>this.formPessoa.controls.telefones;
    let telefones = this.pessoa.telefones.slice(1, this.pessoa.telefones.length)
    telefones.forEach(tel => {
      control.push(this.fb.group({id:tel.id, ddd: tel.ddd,numero: tel.numero}))
    })
  }

 

  
}
