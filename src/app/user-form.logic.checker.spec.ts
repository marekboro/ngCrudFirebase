import { LogicCheck } from './user-form.logic.checker';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms'
import { FormBuilder } from '@angular/forms'
import { UserFormComponent} from "./user-form.component"




describe('', () => {
let formControl : FormControl;
let logic;
// let userFormComponent: UserFormComponent = new UserFormComponent();

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            declarations: [UserFormComponent
            ],
            imports: [LogicCheck]
        }).compileComponents();


        // let fb: FormBuilder;
        // let userFormComponent = fb.group({
        //     intext: ""
        // })
        // let formControl: FormControl = new FormControl();
        // let logic = LogicCheck.verifyLogic(formControl);



    })
    it('should eval to true if 2 equal valuse are on both sides of the equal sign', () => {
        // let logic = LogicCheck.verifyLogic(formControl);
        expect(logic("")).toBeTruthy()

    })
})