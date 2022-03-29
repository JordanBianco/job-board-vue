import { extend } from "vee-validate";
import { required, email, min, alpha, confirmed } from "vee-validate/dist/rules";

// Install rules
extend('email', {
   ...email,
   message: 'Inserisci un indirizzo email valido'
});

extend('required', {
   ...required,
   message: 'Questo campo è obbligatorio'
});

extend('min', {
   validate(value, args) {
     return value.length >= args.length;
   },
   params: ['length'],
   message: 'La lunghezza minima è 8 caratteri' 
}, min);

extend('alpha', {
   ...alpha,
   message: 'Questo campo può contenere solo caratteri alfabetici'
});

extend('confirmed', {
   ...confirmed,
   message: 'La password deve avere lo stesso valore del campo conferma password'
});