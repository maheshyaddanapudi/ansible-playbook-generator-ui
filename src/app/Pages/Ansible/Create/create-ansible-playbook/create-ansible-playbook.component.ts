import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Play } from 'src/app/Modals/Request/Play';
import { Task } from 'src/app/Modals/Request/Task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnsibleCommandDetailerControllerService, CommandDetailsDTO, CommandRef, InputFieldRef, ModuleRef, SubModuleRef } from 'src/app/Services/Rest/ansible-docs-boot';
import { IntermediatePlay } from 'src/app/Modals/Display/IntermediatePlay';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { IntermediateVar } from 'src/app/Modals/Display/IntermediateVar';
import { PlaybookRequestService } from 'src/app/Services/Rest/ansible-playbook-json2yaml';

@Component({
  selector: 'app-create-ansible-playbook',
  templateUrl: './create-ansible-playbook.component.html',
  styleUrls: []
})
export class CreateAnsiblePlaybookComponent implements OnInit {

  public show_loading: boolean

  public plays: Play[] = []
  public intermediate_plays_list: IntermediatePlay[] = []

  public show_add_play_form: boolean

  public error_message: string

  public modules_list: ModuleRef[] = []
  public sub_modules_list: SubModuleRef[] = []
  public commands_list: CommandRef[] =[]

  public master_commands_list: CommandRef[] =[]

  public current_play_name: string
  public current_play_gather_facts: boolean = true
  public current_play_hosts: string
  public current_play_vars: IntermediateVar[] = []
  public current_play_var_key: string
  public current_play_var_value: string
  public current_module_selected: ModuleRef
  public current_sub_module_selected: SubModuleRef
  public current_command_selected: CommandRef
  public current_command_details_selected: CommandDetailsDTO
  public is_current_command_selected_optional: boolean
  public current_command_selected_register: string
  public is_current_command_selected_no_log: boolean
  public edit_task_name_selected: boolean
  public task_name_selected: string
  public current_command_selected_delegate_to: string
  public current_command_selected_become: string
  public current_command_selected_become_method: string
  public current_command_selected_with_items: string
  public current_command_selected_when: string

  public selected_commands_list: CommandDetailsDTO[] = []

  public should_validate_register_output_variable_name: boolean = true
  public hide_overall_summary: boolean
  public hide_plays_detailed_view: boolean

  public register_output_variable_name_validation_error: string
  public current_play_composition_validation_error: string
  public current_play_variable_name_validation_error: string

  public response_yaml: any


  constructor(private playbookRequestService: PlaybookRequestService, private ansibleCommandDetailerControllerService: AnsibleCommandDetailerControllerService, private modalService: NgbModal) {
    
   }

  async ngOnInit() {

    this.show_loading = true

    await this.ansibleCommandDetailerControllerService.getAllModules().toPromise().then((modules: ModuleRef[]) => {
      this.modules_list = modules
    }).catch((err_response: HttpErrorResponse) => {

      this.error_message = err_response.message
      console.log('Response Code - ', err_response.status)
      console.log('Response Status - ', err_response.statusText)
      console.log('Response Error - ', err_response.error)
  })
  
    this.show_loading = false
    //this.set_master_commands_list()
  }

  async set_master_commands_list(){
    await this.ansibleCommandDetailerControllerService.getCommandsByModuleNameAndSubModuleName().toPromise().then((commands: CommandRef[]) => {
      this.commands_list = this.master_commands_list = commands
    }).catch((err_response: HttpErrorResponse) => {
  
      this.error_message = err_response.message
      console.log('Response Code - ', err_response.status)
      console.log('Response Status - ', err_response.statusText)
      console.log('Response Error - ', err_response.error)
  })
  }


  toggle_show_add_play_form(show_add_play_form: boolean){
    this.show_add_play_form = show_add_play_form;
    if(show_add_play_form)
    {
      this.current_play_name = 'Play_'+(this.intermediate_plays_list.length+1)
      this.hide_overall_summary = true
      this.hide_plays_detailed_view = true
    }
    else{
      this.current_play_name = undefined
      this.hide_overall_summary = false
      this.hide_plays_detailed_view = false
    }
  }

  get_object_keys_count(obj)
  {
    return Object.keys(obj).length
  }

  reset_composition(){
    this.response_yaml = undefined
    this.plays = []
    this.intermediate_plays_list = []
    this.show_add_play_form = false

    this.should_validate_register_output_variable_name = true
    this.hide_overall_summary = false
    this.hide_plays_detailed_view = false

    this.register_output_variable_name_validation_error = undefined
    this.reset_all_selections()
    this.selected_commands_list = []
  }

  async select_module(selected_module: ModuleRef){
    if(this.current_module_selected && this.current_module_selected.moduleName != selected_module.moduleName)
    {
      this.current_module_selected = selected_module
      this.current_sub_module_selected = undefined
      this.current_command_selected = undefined
      this.current_command_details_selected = undefined
      this.current_command_selected_register = undefined
      this.commands_list = []
      await this.get_sub_modules_list_by_module_selected();
      if(!this.sub_modules_list || this.sub_modules_list.length == 0){
        await this.get_commands_list_by_module_selected();
      }
    }
    else if(!this.current_module_selected){
      this.current_module_selected = selected_module
      this.current_sub_module_selected = undefined
      this.current_command_selected = undefined
      this.current_command_details_selected = undefined
      this.current_command_selected_register = undefined
      this.commands_list = []
      await this.get_sub_modules_list_by_module_selected();
      if(!this.sub_modules_list || this.sub_modules_list.length == 0){
        await this.get_commands_list_by_module_selected();
      }
    }
  }

  async select_sub_module(selected_sub_module: SubModuleRef){
    if(this.current_sub_module_selected && this.current_sub_module_selected.subModuleName != selected_sub_module.subModuleName){
      this.current_sub_module_selected = selected_sub_module
      this.current_command_selected = undefined
      this.current_command_details_selected = undefined
      this.current_command_selected_register = undefined
      await this.get_commands_list_by_module_and_sub_module_selected();
    }
    else if(!this.current_sub_module_selected)
    {
      this.current_sub_module_selected = selected_sub_module
      this.current_command_selected = undefined
      this.current_command_details_selected = undefined
      this.current_command_selected_register = undefined
      await this.get_commands_list_by_module_and_sub_module_selected();
    }
  }

  async select_command(command: CommandRef){

    if(this.current_command_selected && this.current_command_selected.command != command.command){

      this.current_command_selected = command
      this.current_command_details_selected = undefined

      if(this.current_sub_module_selected){
        this.show_loading = true
        await this.ansibleCommandDetailerControllerService.getCommandDetailsByModuleNameAndSubModuleNameAndCommand(this.current_module_selected.moduleName, command.command, this.current_sub_module_selected.subModuleName).toPromise().then((command_details: CommandDetailsDTO) =>{
          this.current_command_details_selected = command_details
          this.task_name_selected = 'Task_'+(this.selected_commands_list.length+1)
          this.current_command_selected_register = undefined
        }).catch((err_response: HttpErrorResponse) => {
  
          this.error_message = err_response.message
          console.log('Response Code - ', err_response.status)
          console.log('Response Status - ', err_response.statusText)
          console.log('Response Error - ', err_response.error)
        })
        this.show_loading = false
      }
      else{
        this.show_loading = true
        await this.ansibleCommandDetailerControllerService.getCommandDetailsByModuleNameAndSubModuleNameAndCommand(this.current_module_selected.moduleName, command.command).toPromise().then((command_details: CommandDetailsDTO) =>{
          this.current_command_details_selected = command_details
          this.task_name_selected = 'Task_'+(this.selected_commands_list.length+1)
          this.current_command_selected_register = undefined
        }).catch((err_response: HttpErrorResponse) => {
  
          this.error_message = err_response.message
          console.log('Response Code - ', err_response.status)
          console.log('Response Status - ', err_response.statusText)
          console.log('Response Error - ', err_response.error)
        })
        this.show_loading = false
      }
    }
    else if(!this.current_command_selected)
    {
      this.current_command_selected = command
      this.current_command_details_selected = undefined
      if(this.current_sub_module_selected){
        this.show_loading = true
        await this.ansibleCommandDetailerControllerService.getCommandDetailsByModuleNameAndSubModuleNameAndCommand(this.current_module_selected.moduleName, command.command, this.current_sub_module_selected.subModuleName).toPromise().then((command_details: CommandDetailsDTO) =>{
          this.current_command_details_selected = command_details
          this.task_name_selected = 'Task_'+(this.selected_commands_list.length+1)
          this.current_command_selected_register = undefined
        }).catch((err_response: HttpErrorResponse) => {
  
          this.error_message = err_response.message
          console.log('Response Code - ', err_response.status)
          console.log('Response Status - ', err_response.statusText)
          console.log('Response Error - ', err_response.error)
        })
        this.show_loading = false
      }
      else{
        this.show_loading = true
        await this.ansibleCommandDetailerControllerService.getCommandDetailsByModuleNameAndSubModuleNameAndCommand(this.current_module_selected.moduleName, command.command).toPromise().then((command_details: CommandDetailsDTO) =>{
          this.current_command_details_selected = command_details
          this.task_name_selected = 'Task_'+(this.selected_commands_list.length+1)
          this.current_command_selected_register = undefined
        }).catch((err_response: HttpErrorResponse) => {
  
          this.error_message = err_response.message
          console.log('Response Code - ', err_response.status)
          console.log('Response Status - ', err_response.statusText)
          console.log('Response Error - ', err_response.error)
        })
        this.show_loading = false
      }
    }

    if(!this.current_module_selected && this.current_command_details_selected)
    {
      this.current_module_selected = this.current_command_details_selected.command.moduleRef
    }
    if(!this.current_sub_module_selected && this.current_command_details_selected && this.current_command_details_selected.command.subModuleRef)
    {
      this.current_sub_module_selected = this.current_command_details_selected.command.subModuleRef
    }
  }

  get_selected_value_from_obj(object: any, item: string): string
  {
    if(item == 'Module')
    {
      return object.moduleName
    }
    if(item == 'Sub-Module')
    {
      if(object && object.subModuleName)
      {
        return object.subModuleName 
      }
      else
      {
        return 'Select'
      }
    }
    if(item == 'Command')
    {
      if(object && object.command)
      {
        return object.command
      }
      else
      {
        return 'Select'
      }
    }
  }

  get_selected_value(item: string): string{
    if(item == 'Module')
    {
      if(this.current_module_selected)
      {
        return this.current_module_selected.moduleName
      }
      else if(this.modules_list && this.modules_list.length > 0 ){
        return 'Select'
      }
      else {
        return null
      }
    }
    if(item == 'Sub-Module')
    {
      if(this.current_sub_module_selected)
      {
        return this.current_sub_module_selected.subModuleName
      }
      else if(this.sub_modules_list && this.sub_modules_list.length > 0){
        return 'Select'
      }
      else {
        return null
      }
    }
    if(item == 'Command')
    {
      if(this.current_command_selected)
      {
        return this.current_command_selected.command
      }
      else if(this.commands_list && this.commands_list.length > 0){
        return 'Select'
      }
      else {
        return null
      }
    }
    
    return 'Select'
  }

  async get_sub_modules_list_by_module_selected(){
    this.show_loading = true
    await this.ansibleCommandDetailerControllerService.getSubModulesByModuleName(this.current_module_selected.moduleName).toPromise().then((sub_modules: SubModuleRef[]) => {
      this.sub_modules_list = sub_modules
    }).catch((err_response: HttpErrorResponse) => {

      this.error_message = err_response.message
      console.log('Response Code - ', err_response.status)
      console.log('Response Status - ', err_response.statusText)
      console.log('Response Error - ', err_response.error)
    })
    this.show_loading = false
  }

  async get_commands_list_by_module_and_sub_module_selected(){
    this.show_loading = true
    await this.ansibleCommandDetailerControllerService.getCommandsByModuleNameAndSubModuleName(this.current_module_selected.moduleName, this.current_sub_module_selected.subModuleName).toPromise().then((commands: CommandRef[]) => {
      this.commands_list = commands
    }).catch((err_response: HttpErrorResponse) => {

      this.error_message = err_response.message
      console.log('Response Code - ', err_response.status)
      console.log('Response Status - ', err_response.statusText)
      console.log('Response Error - ', err_response.error)
    })
    this.show_loading = false
  }

  async get_commands_list_by_module_selected(){
    this.show_loading = true
    await this.ansibleCommandDetailerControllerService.getCommandsByModuleNameAndSubModuleName(this.current_module_selected.moduleName,).toPromise().then((commands: CommandRef[]) => {
      this.commands_list = commands
    }).catch((err_response: HttpErrorResponse) => {

      this.error_message = err_response.message
      console.log('Response Code - ', err_response.status)
      console.log('Response Status - ', err_response.statusText)
      console.log('Response Error - ', err_response.error)
    })
    this.show_loading = false
  }

  toggle_current_command_selected_optional(){
    this.is_current_command_selected_optional = !this.is_current_command_selected_optional
  }

  openLarge(content) {
    this.modalService.open(content, {
      backdrop : 'static',
      keyboard : false,
      size: 'xl',
      windowClass: 'myCustomModalClass'
    });
  }

  async confirm_task_addition(){
    let command_details: CommandDetailsDTO = {
      command: this.current_command_selected,
      inputFields: this.current_command_details_selected.inputFields,
      outputFields: this.current_command_details_selected.outputFields,
      optional: this.is_current_command_selected_optional,
      no_log: this.is_current_command_selected_no_log,
      delegate_to: this.current_command_selected_delegate_to,
      task_name: this.task_name_selected,
      become: this.current_command_selected_become,
      become_method: this.current_command_selected_become_method,
      with_items: this.current_command_selected_with_items,
      when: this.current_command_selected_when,
      register: this.current_command_selected_register
    }

    await this.selected_commands_list.push(command_details)

    this.reset_all_selections(true)
  }

  reset_all_selections(avoid_vars_reset?: boolean){
    this.show_loading = true
    this.current_module_selected = undefined
    this.sub_modules_list = []
    this.current_sub_module_selected = undefined
    this.current_command_selected = undefined
    this.current_command_details_selected = undefined
    this.is_current_command_selected_optional = false
    this.edit_task_name_selected = false
    this.task_name_selected = undefined
    this.is_current_command_selected_no_log = false
    this.current_command_selected_register = undefined
    this.current_command_selected_become = undefined
    this.current_command_selected_become_method = undefined
    this.current_command_selected_delegate_to = undefined
    this.current_command_selected_when = undefined
    this.current_command_selected_with_items = undefined
    this.commands_list = this.master_commands_list
    if(!avoid_vars_reset)
    {
      this.current_play_vars = []
      this.current_play_var_key = undefined
      this.current_play_var_value = undefined
    }
    this.show_loading = false
  }

  toggle_edit_task_description_selected(toggle: boolean){
    this.edit_task_name_selected = toggle
  }

  toggle_current_command_selected_no_log(){
    this.is_current_command_selected_no_log = !this.is_current_command_selected_no_log
  }

  toggle_selected_command_no_log(play_index: number, task_index: number){
    if(play_index > -1){
      this.intermediate_plays_list[play_index].commands_list[task_index].no_log = !this.intermediate_plays_list[play_index].commands_list[task_index].no_log 
    }
    else{
      this.selected_commands_list[task_index].no_log = !this.selected_commands_list[task_index].no_log
    }
  }

  toggle_selected_command_optional(play_index: number, task_index: number){
    if(play_index > -1){
      this.intermediate_plays_list[play_index].commands_list[task_index].optional = !this.intermediate_plays_list[play_index].commands_list[task_index].optional 
    }
    else{
      this.selected_commands_list[task_index].optional = !this.selected_commands_list[task_index].optional
    }
  }

  delete_task(play_index: number, task_index: number){

    if(play_index > -1){
      this.intermediate_plays_list[play_index].commands_list.splice(task_index, 1)
    }
    else{
      this.selected_commands_list.splice(task_index, 1)
    }

  }

  validate_register_output_variable_name(play_index: number, task_index: number, register_output_var_name: string){

    console.log('Validation request recieved', register_output_var_name)

    this.register_output_variable_name_validation_error = undefined

    if(this.should_validate_register_output_variable_name)
    {
      console.log('Validatiing', register_output_var_name)
      if(play_index > -1){

        console.log('Validating in Selected Plays', register_output_var_name)
        let task_counter = 0;
        this.intermediate_plays_list[play_index].commands_list.forEach((selected_command: CommandDetailsDTO) =>{
          if(selected_command.register && selected_command.register == register_output_var_name && task_counter != task_index)
          {
            this.register_output_variable_name_validation_error = 'Duplicate variable found for: '+ register_output_var_name
          }
          task_counter = task_counter + 1
        })
      }
      else{
        console.log('Validating in Current Play', register_output_var_name)
        let task_counter = 0;
        this.selected_commands_list.forEach((selected_command: CommandDetailsDTO) =>{
          if(selected_command.register && selected_command.register == register_output_var_name && task_counter != task_index)
          {
            this.register_output_variable_name_validation_error = 'Duplicate variable found for: '+ register_output_var_name
          }
          task_counter = task_counter + 1
        })
      }
    }
  }

  toggle_hide_overall_summary(){
    this.hide_overall_summary = !this.hide_overall_summary
  }

  toggle_hide_plays_detailed_view(){
    this.hide_plays_detailed_view = !this.hide_plays_detailed_view
  }

  toggle_should_validate_register_output_variable_name(){
    this.should_validate_register_output_variable_name = !this.should_validate_register_output_variable_name
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selected_commands_list, event.previousIndex, event.currentIndex);
  }

  onDropInsidePlay(play_index: number, event: CdkDragDrop<string[]>) {
    moveItemInArray(this.intermediate_plays_list[play_index].commands_list, event.previousIndex, event.currentIndex);
  }

  reset_current_play_composition(avoid_vars_reset?: boolean){
    this.reset_all_selections(avoid_vars_reset)
    this.current_play_hosts = undefined
    this.selected_commands_list = []
    this.current_play_composition_validation_error = undefined
  }

  cancel_current_play_composition(avoid_vars_reset?: boolean){
    this.reset_current_play_composition(avoid_vars_reset)
    this.toggle_show_add_play_form(false)
  }

  valdate_current_play_composition(){
    this.current_play_composition_validation_error = undefined
    if(!this.current_play_name){
      this.current_play_composition_validation_error = 'Invalid Play Name !!!' 
    }
    else if(!this.current_play_hosts){
      this.current_play_composition_validation_error = 'Invalid Play Hosts !!!' 
    }
    else if(!this.selected_commands_list || this.selected_commands_list.length == 0){
      this.current_play_composition_validation_error = 'Invalid Play Tasks !!!' 
    }
  }

  async save_current_play_composition(){

    this.valdate_current_play_composition();
    

    if(!this.current_play_composition_validation_error){

      let a_play: IntermediatePlay = {
        id: 'Play_'+(this.intermediate_plays_list.length+1),
        name: this.current_play_name,
        hosts: this.current_play_hosts,
        gather_facts: this.current_play_gather_facts,
        vars: this.current_play_vars,
        commands_list: this.selected_commands_list
      }
  
      await this.intermediate_plays_list.push(a_play)
  
      this.cancel_current_play_composition()
    }
  }

  toggle_current_play_gather_facts(flag: boolean){
    this.current_play_gather_facts = flag
  }

  add_to_current_play_vars(){

    let duplicate_found: boolean = false

    this.current_play_vars.forEach((an_intermediate_var: IntermediateVar) => {
      if(an_intermediate_var.key == this.current_play_var_key)
      {
        duplicate_found = true
      }
    })

    if(!duplicate_found)
    {
      let a_var: IntermediateVar = {
        key: this.current_play_var_key,
        value: this.current_play_var_value
      }
      this.current_play_vars.push(a_var)
      this.current_play_var_key = undefined
      this.current_play_var_value = undefined
    }
    else{
      this.current_play_variable_name_validation_error = 'Duplicate variable found for : '+this.current_play_var_key
      let current_play_variable_name_validation_error_timer = setTimeout(()=> {
        this.current_play_variable_name_validation_error = undefined
        clearInterval(current_play_variable_name_validation_error_timer)
      }, 10000)
    }
  }

  delete_from_current_play_vars(delete_index: number){
    this.current_play_vars.splice(delete_index, 1)
  }

  delete_from_play_vars(play_index: number, delete_index: number){
    this.intermediate_plays_list[play_index].vars.splice(delete_index, 1)
  }

  delete_play_from_plays(play_index: number){
    this.intermediate_plays_list.splice(play_index, 1)
  }

  async create_plays_request(){

    this.show_loading = true;

    console.log('Creating Plays Request ...')

    let plays: Play[] = []

    let play_counter: number = 1;

    await this.intermediate_plays_list.forEach((an_intermediate_play: IntermediatePlay) => {

      console.log('Iterating play', play_counter)

      play_counter = play_counter + 1

      let vars: any = {

      }

      let var_counter: number = 1

       an_intermediate_play.vars.forEach((an_intermediate_var: IntermediateVar) => {

        console.log('Iterating Var', var_counter)

        var_counter = var_counter + 1

         vars[an_intermediate_var.key] = an_intermediate_var.value
       })

      let tasks: Task[] = []

      let task_counter: number = 1

      an_intermediate_play.commands_list.forEach(async (command_details: CommandDetailsDTO) => {

        console.log('Iterating Task', task_counter)

        let input_fields: any = {

        }

        await command_details.inputFields.forEach((an_input_field: InputFieldRef) => {
          console.log('Iterating Input Field', an_input_field.fieldName)
          if(an_input_field.value){
            console.log('Adding Input Field Value', an_input_field.value)
            input_fields[an_input_field.fieldName] = an_input_field.value
          }
        })

        let task: Task = {
          name: command_details.task_name,
          module: command_details.command.command,
          become: command_details.become,
          become_method: command_details.become_method,
          delegate_to: command_details.delegate_to,
          ignore_errors: command_details.optional,
          input_fields: input_fields,
          no_log: command_details.no_log,
          register: command_details.register,
          when: command_details.when,
          with_items: command_details.with_items
        }

        task_counter = task_counter + 1

        await tasks.push(task)
      })

      console.log('Creating Play Object ...')

      let play: Play = {
        name: an_intermediate_play.name,
        gather_facts: an_intermediate_play.gather_facts,
        hosts: an_intermediate_play.hosts,
        vars: vars,
        modules: tasks
      }

      console.log('Created Play Object ...', JSON.stringify(play))

      plays.push(play)

    })

    console.log(JSON.stringify(plays))

    await this.playbookRequestService.generateYamlPost(plays).toPromise().then((response: any) => {
      console.log('response', response)
    }).catch((err_response: HttpErrorResponse) => {

      if(err_response.status == 200)
      {
        this.response_yaml = err_response.error.text

        console.log(this.response_yaml)
      }
      else{
        this.error_message = err_response.message
        console.log('Response Code - ', err_response.status)
        console.log('Response Status - ', err_response.statusText)
        console.log('Response Error - ', err_response.error.text)
      }
    })

    this.show_loading = false;
  }

  get_comma_delimited_length(object: string): number{
    return object.split(',').length
  }
}
