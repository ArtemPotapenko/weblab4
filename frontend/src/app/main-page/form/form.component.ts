import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SliderChangeEvent, SliderModule, SliderSlideEndEvent} from 'primeng/slider';
import {FormsModule} from "@angular/forms";
import {XInputComponent} from "./x-input/x-input.component";
import {YInputComponent} from "./y-input/y-input.component";
import {RInputComponent} from "./r-input/r-input.component";
import {Result} from "../result";
import {SubmitsComponent} from "./submits/submits.component";
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    SliderModule,
    FormsModule,
    XInputComponent,
    YInputComponent,
    RInputComponent,
    SubmitsComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Output()
  public changeRadiusEvent = new EventEmitter<number>();
  get y(): number {
    return this._y;
  }


  set y(value: number) {
    this._y = value;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get r(): number {
    return this._r;
  }

  set r(value: number) {
    this._r = value;
  }
  private _y :number = 1 ;
  private _x :number = 1;
  private _r :number = 1;

  public changeRadius(r : number){
    this._r = r;
    this.changeRadiusEvent.emit(r);
  }

}
