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

    return this.http.post(this.urlApi+'/', pessoa)
      .map((res:Response) => res.json(), new RequestOptions({ headers: headers }))
      .catch((erro: Response) => Observable.throw(erro.json().error || 'Falha no Servidor'));
  }

  public listarPessoas(): Observable<Pessoa[]>  {
    return this.http.get(this.urlApi)
      .map((res:Response) => res.json())
      .catch((erro: Response) => Observable.throw(erro.json().error || 'Falha no Servidor'))
  }

  public buscarPessoaPorId(id: number): Observable<Pessoa>{
    return this.http.get(this.urlApi + "/" + id)
      .map((res: Response) => res.json())
      .catch((erro: Response) => Observable.throw(erro.json().error || 'Falha no Servidor'))
    
  }

  public atualizarPessoa(pessoa: Pessoa): Observable<Pessoa>{

    let headers: Headers = new Headers()
    headers.append('Content-type', 'application/json')

    return this.http.put(this.urlApi, pessoa, new RequestOptions({ headers: headers }))
      .map((res:Response) => res.json())
      .catch((erro:any) => Observable.throw(erro.json().error || 'Server error'));
      
  }

  public deletarPessoa(id: number): Observable<boolean>{
    return this.http.delete(this.urlApi + '/' + id)
      .map((res:Response) => res.json())
      .catch((erro: Response) => Observable.throw(erro.json().error || 'Falha no Servidor'))
  }

}
