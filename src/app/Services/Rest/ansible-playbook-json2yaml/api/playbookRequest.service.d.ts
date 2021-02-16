import { HttpClient, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { Play } from 'src/app/Modals/Request/Play';
export declare class PlaybookRequestService {
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
     * Create a new playbook response
     *
     * @param body Playbook Request Post Object
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    generateYamlPost(body: Array<Play>, observe?: 'body', reportProgress?: boolean): Observable<any>;
    generateYamlPost(body: Array<Play>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    generateYamlPost(body: Array<Play>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
}
