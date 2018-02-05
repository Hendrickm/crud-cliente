import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Pessoa } from './shared/pessoa.model'
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { error } from 'selenium-webdriver';

 

@Injectable()
export class PessoaService {

  private urlApi = 'http://localhost:8084/crudpessoa/webresources/pessoa'

  constructor(private http: Http) { }

  public listarPessoas(): Observable<Pessoa[]>  {
    return this.http.get(this.urlApi)
      .map((res:Response) => res.json())
      .catch((erro:any) => Observable.throw(erro.json().error || 'Erro no Servidor'));

  }

}
