import { SubMenu } from "./submenu";

export class Menu {
    label!: string;
    link!: string;
    icon!: string;
    items!: SubMenu[];
    hidden!: boolean;    
}