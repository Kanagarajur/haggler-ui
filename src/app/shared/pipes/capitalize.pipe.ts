import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize'
})

export class CapitalizePipe implements PipeTransform {
    transform(value: any): string {
        if(typeof value === 'undefined')
            return typeof(value);
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}