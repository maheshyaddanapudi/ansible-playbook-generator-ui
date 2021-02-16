import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAnsiblePlaybookComponent } from './Pages/Ansible/Create/create-ansible-playbook/create-ansible-playbook.component';
import { HomeComponent } from './Pages/home/home.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "create-ansible-playbook", component: CreateAnsiblePlaybookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
