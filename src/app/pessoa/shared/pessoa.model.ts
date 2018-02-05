import { Data } from "@angular/router/src/config";
import { Telefone } from './telefone.model'

export class Pessoa{

    constructor(
        public id: number,
        public nome: string,
        public cpf: string,
        public dataNascimento: Data,
        public email: string,
        public telefones: Array<Telefone>){}
}