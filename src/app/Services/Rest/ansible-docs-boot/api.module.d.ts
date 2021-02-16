import { ModuleWithProviders } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
export declare class ApiModule {
    static forRoot(configurationFactory: () => Configuration): ModuleWithProviders;
    constructor(parentModule: ApiModule, http: HttpClient);
}
