import { CommandDetailsDTO } from "src/app/Services/Rest/ansible-docs-boot";
import { IntermediateVar } from "./IntermediateVar";

export interface IntermediatePlay {
    id: string
    name: string
    hosts: string
    gather_facts: boolean
    vars: IntermediateVar[]
    commands_list: CommandDetailsDTO[]
}