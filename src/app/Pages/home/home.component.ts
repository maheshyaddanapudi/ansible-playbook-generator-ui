import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnsibleCommandDetailerControllerService } from 'src/app/Services/Rest/ansible-docs-boot';
import { PlaybookRequestService } from 'src/app/Services/Rest/ansible-playbook-json2yaml';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  public error_message: string

  public sample_play_request_json: any = [{
    "name": "Play_1",
    "gather_facts": true,
    "hosts": "localhost",
    "vars": {
        "var_1": "Hello World"
    },
    "modules": [
      {
        "name": "Task_1",
        "module": "shell",
        "ignore_errors": true,
        "input_fields": {
          "free_form": "echo {{var_1}}"
        }
      }
    ]
  }]

  public show_loading: boolean

  constructor(private playbookRequestService: PlaybookRequestService, private ansibleCommandDetailerControllerService: AnsibleCommandDetailerControllerService) { }

  async ngOnInit() {

    this.show_loading = true

    await this.ansibleCommandDetailerControllerService.getAllModules().toPromise().then(()=>{

      console.log('Verified Ansible Docs Boot Connectivity Successfully !!!')

    }).catch((err_response: HttpErrorResponse) => {

      console.log('UNABLE to Verify Ansible Docs Boot Connectivity !!!')

      this.error_message = "UNABLE to Verify Ansible Docs Boot Connectivity !!! ==> "+err_response.message
      console.log('Response Code - ', err_response.status)
      console.log('Response Status - ', err_response.statusText)
      console.log('Response Error - ', err_response.error)
    })

    if(!this.error_message){

      await this.playbookRequestService.generateYamlPost(this.sample_play_request_json).toPromise().then((response: any) => {
        console.log('response', response)
      }).catch((err_response: HttpErrorResponse) => {
  
        if(err_response.status == 200)
        {
          let response_yaml: string = err_response.error.text
          //console.log(response_yaml)
          console.log('Verified Ansible Playbook Json2Yaml Connectivity Successfully !!!')
        }
        else{
          console.log('UNABLE to Verify Ansible Playbook Json2Yaml Connectivity !!!')
          this.error_message = "UNABLE to Verify Ansible Playbook Json2Yaml Connectivity !!! ==> "+err_response.message
          console.log('Response Code - ', err_response.status)
          console.log('Response Status - ', err_response.statusText)
          console.log('Response Error - ', err_response.error.text)
        }
      })

    }

    this.show_loading = false
    
  }

}
