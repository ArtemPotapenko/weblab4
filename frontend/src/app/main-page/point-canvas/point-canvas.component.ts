import {Component, Input} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {FieldComponent} from "./field/field.component";

@Component({
  selector: 'app-point-canvas',
  standalone: true,
  imports: [
    NgIf,
    FieldComponent,
    NgOptimizedImage,
    NgClass,
    NgStyle
  ],
  templateUrl: './point-canvas.component.html',
  styleUrl: './point-canvas.component.css'
})
export class PointCanvasComponent {

  public _radius : number = 0;
  public clickLeft(){
    this.radius-=1;
    this.radius = this.radius<= 0 ? 5 : this.radius;
  }
  public clickRight(){
    this.radius+=1;
    this.radius = this.radius> 5 ? 1 : this.radius;
  }
  @Input()
  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
  }
}
