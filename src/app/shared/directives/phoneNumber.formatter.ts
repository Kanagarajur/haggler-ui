import { isValidKey } from '../helpers/validKey';
import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Attribute } from '@angular/core';
import { PhoneNumberPipe } from '../pipes/phonenumber.pipe';

//istanbul ignore next
/**
 *  This firective will format the input value on text input to ###-###-####
 *  Doesn't allow alpha char and only allows numerics and dash char
 *
 *  Usage:
 *  ```html
 *  <input type="text" data-phone-input-format-dir />
 *  ```
 */
@Directive({ selector: '[data-phone-input-format-dir]' })
export class PhoneInputFormatDirective {
    @Input('actualValue') actualValue: string="";
    @Output('actualValueChange') actualValueChange: EventEmitter<any> = new EventEmitter(false);

    constructor(private _elementRef: ElementRef,
        private _phoneNbr: PhoneNumberPipe
    ) {
    }

    ngOnInit() {
        this.formatValue('', true);
    }

    @HostListener('blur', ['$event'])
    onBlur(event: any) {
        this.formatValue('', true);
        this.maskValue();
    }

    @HostListener('focus', ['$event'])
    onFocus(event: any) {
        let ss = this._elementRef.nativeElement.selectionStart;
        let se = this._elementRef.nativeElement.selectionEnd;
        this._elementRef.nativeElement.value = (this.actualValue || '');
        this._elementRef.nativeElement.selectionStart = (ss);
        this._elementRef.nativeElement.selectionEnd = (se);
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: any) {
        let key = event.keyCode;

        if (isValidKey(event, false, false)) {
            if (!event.ctrlKey && !event.shiftKey && key !== 8 && key !== 46 && key !== 37 && key !== 39 && key !== 9) {
                setTimeout(() => {
                    this.formatValue();
                }, 10);
            }
        }
        else {
            event.preventDefault();
            return;
        }

    }

    //istanbul ignore next
    @HostListener('paste', ['$event'])
    onPaste(event: any) {
        setTimeout(() => {
            this.formatValue();
        }, 10);
    }

    //istanbul ignore next
    @HostListener('cut', ['$event'])
    onCut(event: any) {
        setTimeout(() => {
            this.formatValue();
        }, 10);
    }

    private formatValue(value?: string, forceFormat: boolean = false) {
        let val = (value || this._elementRef.nativeElement.value || '');
        if ((val.match(/-/g) || []).length >= 2 && !forceFormat) {
            return;
        }

        let ss = this._elementRef.nativeElement.selectionStart;
        let se = this._elementRef.nativeElement.selectionEnd;
        if (this._elementRef.nativeElement.value.length > ss && (ss === se) && !forceFormat) {
            this._elementRef.nativeElement.value = val;
            this._elementRef.nativeElement.selectionStart = (ss);
            this._elementRef.nativeElement.selectionEnd = (ss);
        }
        else {
            this._elementRef.nativeElement.value = this._phoneNbr.transform(val);
        }
    }

    private maskValue() {
        this.actualValue = this._elementRef.nativeElement.value;
        this.actualValueChange.emit(this.actualValue);
        /*if (this._maskOnBlur) {
            this._elementRef.nativeElement.value = (this.actualValue || '').replace(/[0-9]/g, '#');
        }*/
    }
}
