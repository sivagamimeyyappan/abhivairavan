import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[cnfrmpaswrd]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: cnfrmpaswrdDirective,
        multi: true
    }]
})
export class cnfrmpaswrdDirective implements Validator{

    @Input () cnfrmpaswrd: string;

    validate(control: AbstractControl): {[key: string]: any}|null{

        const password = control.parent.get(this.cnfrmpaswrd);
        if(password && password.value !== control.value){
            return {'notEqual':true};
        }
        
        return null;
    }
}