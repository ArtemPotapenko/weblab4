import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SliderModule} from "primeng/slider";
import {FormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {SendService} from "../../../services/send.service";

@Component({
  selector: 'app-y-input',
  standalone: true,
  imports: [
    SliderModule,
    FormsModule,
    ChipsModule
  ],
  templateUrl: './y-input.component.html',
  styleUrl: './y-input.component.css'
})
export class YInputComponent {

  public value :number = 4;
  @Output()
  public eventGetValue = new EventEmitter<number>();
  private service : SendService;

  constructor(service: SendService) {
    this.service = service;
    this.service.y = this.value;
  }
  getValue(){
    this.eventGetValue.emit(this.value);
    this.service.y = this.value
  }
}
