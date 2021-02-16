export interface Task{
    name: string;
    module: string;
    become: string;
    become_method: string;
    input_fields: any;
    delegate_to: string;
    ignore_errors: boolean;
    no_log: boolean;
    with_items: string;
    when: string;
    register: string;
}