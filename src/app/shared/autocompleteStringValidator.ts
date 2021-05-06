import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
    selector: '[autocompleteStringValidator]',
    providers: [{provide: NG_VALIDATORS, 
        useExisting: autocompleteStringValidatorDirective,
         multi: true}]
  })
  export class autocompleteStringValidatorDirective implements Validator {
    @Input('autocompleteStringValidator') validOptions: string[];
  
    validate(control: AbstractControl):  { [key: string]: any } | null  {
        if (this.validOptions.indexOf(control.value) !== -1) {
            return null  /* valid option selected */
        }
        return { 'invalidAutocompleteString': { value: control.value } }
    }
     
  }