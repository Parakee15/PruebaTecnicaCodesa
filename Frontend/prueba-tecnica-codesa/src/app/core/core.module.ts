import { NgModule, Optional, SkipSelf } from "@angular/core"; import { HttpClientModule } from '@angular/common/http';
import { AlertService } from './services/alert.service';


@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AlertService
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        this.throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
        if (parentModule) {
            throw new Error(`${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`);
        }
    }
}