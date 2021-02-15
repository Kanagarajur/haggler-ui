import { Pipe, PipeTransform } from '@angular/core';

/**
 *  This class will convert string to ###-###-#### phone format
 */
@Pipe({ name: 'phoneNumber' })
export class PhoneNumberPipe implements PipeTransform {

  /**
   *  Format number or string to phone number format ###-###-####
   */
  transform(value: number | string = ''): string {
    let newVal = value.toString().replace(/[^0-9]/g, '');

    let result = '';
    if (newVal.length >= 3) {
      result = newVal.slice(0, 3);
    }
    else {
      result = newVal;
    }

    if (newVal.length > 3) {
      result += '-' + newVal.slice(3, 6);
    }

    if (newVal.length > 6) {
      result += '-' + newVal.slice(6, 10);
    }

    return result;
  }

}
