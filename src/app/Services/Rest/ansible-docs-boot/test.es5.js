var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Inject, Injectable, InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
/**
 * CustomHttpUrlEncodingCodec
 * Fix plus sign (+) not encoding, so sent as blank space
 * See: https://github.com/angular/angular/issues/11058#issuecomment-247367318
 */
var CustomHttpUrlEncodingCodec = /** @class */ (function (_super) {
    __extends(CustomHttpUrlEncodingCodec, _super);
    function CustomHttpUrlEncodingCodec() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} k
     * @return {?}
     */
    CustomHttpUrlEncodingCodec.prototype.encodeKey = function (k) {
        k = _super.prototype.encodeKey.call(this, k);
        return k.replace(/\+/gi, '%2B');
    };
    /**
     * @param {?} v
     * @return {?}
     */
    CustomHttpUrlEncodingCodec.prototype.encodeValue = function (v) {
        v = _super.prototype.encodeValue.call(this, v);
        return v.replace(/\+/gi, '%2B');
    };
    return CustomHttpUrlEncodingCodec;
}(HttpUrlEncodingCodec));
var BASE_PATH = new InjectionToken('basePath');
var COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};
var Configuration = /** @class */ (function () {
    /**
     * @param {?=} configurationParameters
     */
    function Configuration(configurationParameters) {
        if (configurationParameters === void 0) { configurationParameters = {}; }
        this.apiKeys = configurationParameters.apiKeys;
        this.username = configurationParameters.username;
        this.password = configurationParameters.password;
        this.accessToken = configurationParameters.accessToken;
        this.basePath = configurationParameters.basePath;
        this.withCredentials = configurationParameters.withCredentials;
    }
    /**
     * Select the correct content-type to use for a request.
     * Uses {\@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param {?} contentTypes - the array of content types that are available for selection
     * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
     */
    Configuration.prototype.selectHeaderContentType = function (contentTypes) {
        var _this = this;
        if (contentTypes.length == 0) {
            return undefined;
        }
        var /** @type {?} */ type = contentTypes.find(function (x) { return _this.isJsonMime(x); });
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    };
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {\@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param {?} accepts - the array of content types that are available for selection.
     * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
     */
    Configuration.prototype.selectHeaderAccept = function (accepts) {
        var _this = this;
        if (accepts.length == 0) {
            return undefined;
        }
        var /** @type {?} */ type = accepts.find(function (x) { return _this.isJsonMime(x); });
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    };
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param {?} mime - MIME (Multipurpose Internet Mail Extensions)
     * @return {?} True if the given MIME is JSON, false otherwise.
     */
    Configuration.prototype.isJsonMime = function (mime) {
        var /** @type {?} */ jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime != null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    };
    return Configuration;
}());
/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */ /* tslint:disable:no-unused-variable member-ordering */
var AnsibleCommandDetailerControllerService = /** @class */ (function () {
    /**
     * @param {?} httpClient
     * @param {?} basePath
     * @param {?} configuration
     */
    function AnsibleCommandDetailerControllerService(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://localhost:8080';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }
    /**
     * @param {?} consumes string[] mime-types
     * @return {?} true: consumes contains 'multipart/form-data', false: otherwise
     */
    AnsibleCommandDetailerControllerService.prototype.canConsumeForm = function (consumes) {
        var /** @type {?} */ form = 'multipart/form-data';
        for (var _i = 0, consumes_1 = consumes; _i < consumes_1.length; _i++) {
            var consume = consumes_1[_i];
            if (form === consume) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?=} observe
     * @param {?=} reportProgress
     * @return {?}
     */
    AnsibleCommandDetailerControllerService.prototype.getAllModules = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var /** @type {?} */ headers = this.defaultHeaders;
        // to determine the Accept header
        var /** @type {?} */ httpHeaderAccepts = [
            'application/json'
        ];
        var /** @type {?} */ httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        return this.httpClient.request('get', this.basePath + "/api/modules", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    /**
     * @param {?} moduleName
     * @param {?} command
     * @param {?=} subModuleName
     * @param {?=} observe
     * @param {?=} reportProgress
     * @return {?}
     */
    AnsibleCommandDetailerControllerService.prototype.getCommandDetailsByModuleNameAndSubModuleNameAndCommand = function (moduleName, command, subModuleName, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (moduleName === null || moduleName === undefined) {
            throw new Error('Required parameter moduleName was null or undefined when calling getCommandDetailsByModuleNameAndSubModuleNameAndCommand.');
        }
        if (command === null || command === undefined) {
            throw new Error('Required parameter command was null or undefined when calling getCommandDetailsByModuleNameAndSubModuleNameAndCommand.');
        }
        var /** @type {?} */ queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (moduleName !== undefined && moduleName !== null) {
            queryParameters = queryParameters.set('module_name', /** @type {?} */ (moduleName));
        }
        if (subModuleName !== undefined && subModuleName !== null) {
            queryParameters = queryParameters.set('sub_module_name', /** @type {?} */ (subModuleName));
        }
        if (command !== undefined && command !== null) {
            queryParameters = queryParameters.set('command', /** @type {?} */ (command));
        }
        var /** @type {?} */ headers = this.defaultHeaders;
        // to determine the Accept header
        var /** @type {?} */ httpHeaderAccepts = [
            'application/json'
        ];
        var /** @type {?} */ httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        return this.httpClient.request('get', this.basePath + "/api/command-details", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    /**
     * @param {?=} moduleName
     * @param {?=} subModuleName
     * @param {?=} observe
     * @param {?=} reportProgress
     * @return {?}
     */
    AnsibleCommandDetailerControllerService.prototype.getCommandsByModuleNameAndSubModuleName = function (moduleName, subModuleName, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var /** @type {?} */ queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (moduleName !== undefined && moduleName !== null) {
            queryParameters = queryParameters.set('module_name', /** @type {?} */ (moduleName));
        }
        if (subModuleName !== undefined && subModuleName !== null) {
            queryParameters = queryParameters.set('sub_module_name', /** @type {?} */ (subModuleName));
        }
        var /** @type {?} */ headers = this.defaultHeaders;
        // to determine the Accept header
        var /** @type {?} */ httpHeaderAccepts = [
            'application/json'
        ];
        var /** @type {?} */ httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        return this.httpClient.request('get', this.basePath + "/api/command", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    /**
     * @param {?=} moduleName
     * @param {?=} observe
     * @param {?=} reportProgress
     * @return {?}
     */
    AnsibleCommandDetailerControllerService.prototype.getSubModulesByModuleName = function (moduleName, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var /** @type {?} */ queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (moduleName !== undefined && moduleName !== null) {
            queryParameters = queryParameters.set('module_name', /** @type {?} */ (moduleName));
        }
        var /** @type {?} */ headers = this.defaultHeaders;
        // to determine the Accept header
        var /** @type {?} */ httpHeaderAccepts = [
            'application/json'
        ];
        var /** @type {?} */ httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        return this.httpClient.request('get', this.basePath + "/api/sub-modules", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    return AnsibleCommandDetailerControllerService;
}());
AnsibleCommandDetailerControllerService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AnsibleCommandDetailerControllerService.ctorParameters = function () { return [
    { type: HttpClient, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] },] },
    { type: Configuration, decorators: [{ type: Optional },] },
]; };
var APIS = [AnsibleCommandDetailerControllerService];
var ApiModule = /** @class */ (function () {
    /**
     * @param {?} parentModule
     * @param {?} http
     */
    function ApiModule(parentModule, http$$1) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http$$1) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    /**
     * @param {?} configurationFactory
     * @return {?}
     */
    ApiModule.forRoot = function (configurationFactory) {
        return {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    };
    return ApiModule;
}());
ApiModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [],
                exports: [],
                providers: [
                    AnsibleCommandDetailerControllerService
                ]
            },] },
];
/**
 * @nocollapse
 */
ApiModule.ctorParameters = function () { return [
    { type: ApiModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
    { type: HttpClient, decorators: [{ type: Optional },] },
]; };
/**
 * Generated bundle index. Do not edit.
 */
export { APIS, AnsibleCommandDetailerControllerService, BASE_PATH, COLLECTION_FORMATS, Configuration, ApiModule };
//# sourceMappingURL=test.es5.js.map
