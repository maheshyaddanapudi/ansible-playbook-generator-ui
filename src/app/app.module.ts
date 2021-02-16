import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Pages/Layout/header/header.component';
import { FooterComponent } from './Pages/Layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';  
import { AnsibleCommandDetailerControllerService, ApiModule as AnsibleDocsBootApiModule, BASE_PATH as ANSIBLE_DOCS_BOOT_BASE_URL } from './Services/Rest/ansible-docs-boot';
import { PlaybookRequestService, ApiModule as AnsiblePlaybookJson2YamlApiModule, BASE_PATH as ANSIBLE_PLAYBOOK_JSON2YAML_BASE_URL } from './Services/Rest/ansible-playbook-json2yaml';
import { CreateAnsiblePlaybookComponent } from './Pages/Ansible/Create/create-ansible-playbook/create-ansible-playbook.component'; 
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CreateAnsiblePlaybookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    HttpClientModule,  
    AnsibleDocsBootApiModule, 
    AnsiblePlaybookJson2YamlApiModule,
    NgbModule,
    FormsModule,
    DragDropModule,
    ToastrModule.forRoot(),
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    })
  ],
  providers: [
    { provide: ANSIBLE_DOCS_BOOT_BASE_URL, useValue: environment.ANSIBLE_DOCS_BOOT_BASE_URL }   ,
    AnsibleCommandDetailerControllerService,
    { provide: ANSIBLE_PLAYBOOK_JSON2YAML_BASE_URL, useValue: environment.ANSIBLE_PLAYBOOK_JSON2YAML_BASE_URL }   ,
    PlaybookRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
