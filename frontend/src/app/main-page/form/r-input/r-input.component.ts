import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule} from "@angular/forms";
import {SendService} from "../../../services/send.service";

@Component({
  selector: 'app-r-input',
  standalone: true,
    imports: [
        NgForOf,
        RadioButtonModule,
        FormsModule
    ],
  templateUrl: './r-input.component.html',
  styleUrl: './r-input.component.css'
})
export class RInputComponent {
    public  value = 1;
    public values = [1,2,3,4,5];
    private service : SendService;

    constructor(service: SendService) {
        this.service = service;
        service.r = this.value;
    }

    @Output()
  public eventGetValue = new EventEmitter<number>();
  getValue(value : number){
    this.eventGetValue.emit(value);
    this.service.r = value;
  }
}
