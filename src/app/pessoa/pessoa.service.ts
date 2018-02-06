import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import { Pessoa } from './shared/pessoa.model'
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { error } from 'selenium-webdriver';

 

@Injectable()
export class PessoaService {

  private urlApi = 'http://127.0.0.1:8084/crudpessoa/webresources/pessoa'

  constructor(private http: Http) { }

  public cadastrarPessoa(pessoa: Pessoa): Observable<Pessoa>{
    let headers: Headers = new Headers()

        headers.append('Content-type', 'application/json')

        return this.http.post(`${this.urlApi}/`, pessoa)
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        /*
        return this.http.post(
            `${this.urlApi}/`,
            JSON.stringify(pessoa),
            new RequestOptions({ headers: headers })
        )
        .map((resposta: Response) => resposta.json() )
  s*/
    
  }

  public listarPessoas(): Observable<Pessoa[]>  {
    return this.http.get(this.urlApi)
      .map((res:Response) => res.json())
      .catch((erro:any) => Observable.throw(erro.json().error || 'Erro no Servidor'));
  }

  public buscarPessoaPorId(id: number): Observable<Pessoa>{

    return null
  }

  public atualizarPessoa(pessoa: Pessoa): Observable<Pessoa>{

    return null
  }

  public deletarPessoa(id: number): Observable<boolean>{

    return null
  }

}
