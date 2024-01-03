import { Component } from '@angular/core';
import {LogFormComponent} from "./log-form/log-form.component";
import {NgIf} from "@angular/common";
import {RegFormComponent} from "./reg-form/reg-form.component";

@Component({
  selector: 'app-log-page',
  standalone: true,
  imports: [LogFormComponent, NgIf, RegFormComponent],
  templateUrl: './log-page.component.html',
  styleUrl: './log-page.component.css'
})
export class LogPageComponent {
  constructor() {
    localStorage.setItem("token","");
  }
  private _login : boolean = false;
  get login(): boolean {
    return this._login;
  }

  set login(value: boolean) {
    this._login = value;
  }
}
