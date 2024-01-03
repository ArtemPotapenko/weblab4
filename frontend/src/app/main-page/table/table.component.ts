import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SendService} from "../../services/send.service";
import $ from 'jquery'
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit{
  private service : SendService;

  constructor(service: SendService) {
    this.service = service;
  }

  ngAfterViewInit(): void {

    this.service.table = $('table').get(0) as HTMLTableElement;
  }


}
