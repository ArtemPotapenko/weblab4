import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SliderModule} from "primeng/slider";
import {RadioButtonModule} from "primeng/radiobutton";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {top} from "@popperjs/core";
import {event} from "jquery";
import {SendService} from "../../../services/send.service";

@Component({
  selector: 'app-x-input',
  standalone: true,
  imports: [
    SliderModule,
    RadioButtonModule,
    NgForOf,
    FormsModule
  ],
  templateUrl: './x-input.component.html',
  styleUrl: './x-input.component.css'
})
export class XInputComponent {
  value :number = 4;
  public values1 = [-4,-3,-2,-1,0];
  private service : SendService;

  constructor(service: SendService) {
    this.service = service;
    this.service.x = this.value;
  }

  @Output()
  public eventGetValue = new EventEmitter<number>();
  getValue(value : number){
    this.eventGetValue.emit(value);
    this.value = value;
    this.service.x = value;
  }
}
