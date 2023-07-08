import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBtnHover]'
})
export class BtnHoverDirective {
  @HostBinding('style.backgroundColor') bgColor!: string;
  @HostBinding('style.color') color!: string;
  
  @Input()
  resultMode?: boolean = false;

  @HostListener('mouseover') onMouseOver() {
    
    if(!this.resultMode) {
      this.bgColor = 'green'
      this.color = 'white'
    }  
    //this.el.nativeElement.style.backgroundColor = 'green';
    //this.el.nativeElement.style.color = 'white';
  }

  @HostListener('mouseleave') onMouseLeave() {
    if(!this.resultMode) {
      this.color = 'green'
      this.bgColor = ''
    } 
      
    //this.el.nativeElement.style.backgroundColor = '';
    //this.el.nativeElement.style.color = 'green';
  }

}
