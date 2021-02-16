import { Task } from "./Task";

export interface Play{
    name: string;
    hosts: string;
    gather_facts: boolean;
    vars: any[];
    modules: Task[];
}