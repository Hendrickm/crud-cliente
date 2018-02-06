import { PipeTransform, Pipe } from '@angular/core'

@Pipe({
    name: 'idade'
})
export class IdadePipe implements PipeTransform{

    

    transform(dataNascimento: Date): number{
        
        let date: Date = new Date(dataNascimento)
        console.log(dataNascimento)
        console.log(date)
        let ageDifMs = Date.now() - date.getTime()
        let ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
       
        
        
    }

}