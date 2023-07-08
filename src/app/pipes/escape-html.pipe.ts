import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'escapeHtml'
})
export class EscapeHtmlPipe implements PipeTransform {

  transform(data: string): string | null {
        return new DOMParser().parseFromString(data, "text/html").documentElement.textContent;;
  }

}
