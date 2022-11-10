import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  /**
   * Transfort text
   * @param value
   * @returns
   */
  transform(value: string): unknown {
    return value.split('').reverse().join('');
  }

}
