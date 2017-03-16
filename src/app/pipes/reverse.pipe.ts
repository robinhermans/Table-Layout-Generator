import {Pipe, PipeTransform} from "@angular/core"

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe implements PipeTransform {
  transform(value: Array<any>, args: string[]): any {
    if (!value)
      return value;

    return value.slice().reverse();
  }
}
