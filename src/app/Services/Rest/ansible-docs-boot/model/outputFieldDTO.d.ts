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
 */
export interface OutputFieldDTO {
    outputFieldId?: number;
    commandId?: number;
    parentOutputFieldRef?: number;
    fieldName?: string;
    fieldDescription?: string;
    fieldType?: string;
    returnedAlways?: string;
    refUrl?: string;
    insertTimestamp?: Date;
    updateTimestamp?: Date;
}
