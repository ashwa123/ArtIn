import { ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms'


export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('password').value === formGroup.get('confirmpassword').value)
      return null;
    else
      return {passwordMismatch: true};
  };