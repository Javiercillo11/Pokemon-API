import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.value;

        const hasUpperCase = /[A-Z]/.test(password)
        const hasNumber = /\d/.test(password);

        if(!hasUpperCase || !hasNumber){
            return {customPassword: true};
        }
        return null;
    }
}