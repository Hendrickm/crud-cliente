import { PipeTransform, Pipe } from '@angular/core'

@Pipe({
    name: 'idade'
})
export class IdadePipe implements PipeTransform{

    

    transform(dataNascimento: string): number{
        //let idade = 10
        let date: Date = new Date(dataNascimento)
        console.log(dataNascimento)
        console.log(date.getFullYear())
        
        var ageDifMs = Date.now() - date.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
        
        
    }

}