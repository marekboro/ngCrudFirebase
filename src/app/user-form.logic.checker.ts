import {FormBuilder, FormControl} from '@angular/forms'          // import form control to get access to input.

export class LogicCheck {

    static verifyLogic(formControl: FormControl){   // create a method and use dependancy injection to inject FormControl
        
        
        let input:string = formControl.value ? formControl.value : "no value provided";       // retrieve input in string form for manipulation.
        console.log(input);
        // this first test will be looking for an equality sign, and if finds separates either side into two strings
        // then tries to identify if its possible to make something numerical from these and evaluate for comparison
        if(input.indexOf('=')>=0 && input.indexOf("=")===input.lastIndexOf("=")){   // only one '=' allowed
        console.log(input.indexOf("="));
            let sides:string[] = input.split("=");
            if(sides[0]===sides[1]){
                // formControl.parent;
                return {verifyLogic:true}
                // return true
            }
        }
        return null;
    }


} 