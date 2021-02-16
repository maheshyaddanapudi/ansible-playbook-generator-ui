import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Play } from 'src/app/Modals/Request/Play';

@Injectable({
  providedIn: 'root'
})
export class AnsiblePlaybookJson2yamlService {

  private baseURL: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/yaml'
    })
  } 

  constructor(private http: HttpClient) {

    this.baseURL = environment.ANSIBLE_PLAYBOOK_JSON2YAML_BASE_URL + '/generate-yaml';

   }

   async request_yaml(plays: Play[])
   {
     console.log('Requesting ...', (JSON.stringify(plays)));

     return await this.http.post(this.baseURL,JSON.stringify(plays), this.httpOptions).toPromise();
   }
}
