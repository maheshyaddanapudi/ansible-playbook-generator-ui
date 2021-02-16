import { HttpClient, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandDetailsDTO } from '../model/commandDetailsDTO';
import { CommandRef } from '../model/commandRef';
import { ModuleRef } from '../model/moduleRef';
import { SubModuleRef } from '../model/subModuleRef';
import { Configuration } from '../configuration';
export declare class AnsibleCommandDetailerControllerService {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    constructor(httpClient: HttpClient, basePath: string, configuration: Configuration);
    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes);
    /**
     * ALL Modules List
     * Get the list all Ansible Modules available
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    getAllModules(observe?: 'body', reportProgress?: boolean): Observable<Array<ModuleRef>>;
    getAllModules(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ModuleRef>>>;
    getAllModules(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ModuleRef>>>;
    /**
     * Command Details
     * Get Command details with Input and Output parameters by Module &amp; Sub Module Names, Command
     * @param moduleName
     * @param command
     * @param subModuleName
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    getCommandDetailsByModuleNameAndSubModuleNameAndCommand(moduleName: string, command: string, subModuleName?: string, observe?: 'body', reportProgress?: boolean): Observable<CommandDetailsDTO>;
    getCommandDetailsByModuleNameAndSubModuleNameAndCommand(moduleName: string, command: string, subModuleName?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CommandDetailsDTO>>;
    getCommandDetailsByModuleNameAndSubModuleNameAndCommand(moduleName: string, command: string, subModuleName?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CommandDetailsDTO>>;
    /**
     * Commands List
     * Get the list all Commands available or by Module &amp; Sub Module Names
     * @param moduleName
     * @param subModuleName
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    getCommandsByModuleNameAndSubModuleName(moduleName?: string, subModuleName?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<CommandRef>>;
    getCommandsByModuleNameAndSubModuleName(moduleName?: string, subModuleName?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<CommandRef>>>;
    getCommandsByModuleNameAndSubModuleName(moduleName?: string, subModuleName?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<CommandRef>>>;
    /**
     * Sub Modules List
     * Get the list all Sub Modules available or by Module Name
     * @param moduleName
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    getSubModulesByModuleName(moduleName?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<SubModuleRef>>;
    getSubModulesByModuleName(moduleName?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<SubModuleRef>>>;
    getSubModulesByModuleName(moduleName?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<SubModuleRef>>>;
}
