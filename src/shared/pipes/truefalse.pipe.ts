import { Injector, Pipe, PipeTransform } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Pipe({
    name: 'truefalse'
})
export class TrueFalsePipe extends AppComponentBase implements PipeTransform {

    constructor(injector: Injector) {
        super(injector);
    }

    transform(value: boolean): string {
        if (value == true) {
            return 'done'
        }
        else {
            return '';
        }
    }
}
