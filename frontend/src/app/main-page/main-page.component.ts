import {Component, OnInit} from '@angular/core';
import $ from 'jquery'
import {PointCanvasComponent} from "./point-canvas/point-canvas.component";
import {NgIf} from "@angular/common";
import {FormComponent} from "./form/form.component";

import {SendService} from "../services/send.service";
import {TableComponent} from "./table/table.component";
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    PointCanvasComponent,
    NgIf,
    FormComponent,
    TableComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
  private _radius :number= 1.0;
  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
  }
  private service : SendService;

  constructor(service : SendService) {
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/point",
      headers:{"Authorization":"Bearer "+localStorage.getItem("token")},
      error: () => {
        window.location.replace("http://localhost:4200/auth")
      },
    })
    this.service = service;
  }
  setR(r : number){
    this.radius = r;
  }

  ngOnInit(): void {
    this.service.results();
  }
}
