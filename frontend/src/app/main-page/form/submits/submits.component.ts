import { Component } from '@angular/core';
import {SendService} from "../../../services/send.service";

@Component({
  selector: 'app-submits',
  standalone: true,
  imports: [],
  templateUrl: './submits.component.html',
  styleUrl: './submits.component.css'
})
export class SubmitsComponent {
  private service : SendService;

  constructor(service: SendService) {
    this.service = service;
  }
  public logout(){
    window.location.replace("/auth");
  }
  public send(){
    this.service.send();
  }

}
