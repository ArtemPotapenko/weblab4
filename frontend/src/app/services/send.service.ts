import {Injectable} from '@angular/core';
import $, {data} from "jquery";
import {CanvasConst} from "../main-page/point-canvas/field/canvas-const";

@Injectable({
    providedIn: 'root'
})
export class SendService {
    constructor() {
    }

    private _x: number = 0;
    private _y: number = 0;
    private _r: number = 0;
    private _table: HTMLTableElement | null= null;
    get table(): HTMLTableElement | null{
        return this._table;
    }

    set table(value: HTMLTableElement) {
        this._table = value;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get r(): number {
        return this._r;
    }

    set r(value: number) {
        this._r = value;
    }

    private _canvases: Map<number, HTMLCanvasElement> = new Map<number, HTMLCanvasElement>();

    get canvases(): Map<number, HTMLCanvasElement> {
        return this._canvases;
    }

    set canvases(value: Map<number, HTMLCanvasElement>) {
        this._canvases = value;
    }

    private addCell(row: HTMLTableRowElement, data: string) {
        let cell = row.insertCell();
        cell.style.padding = "20px";
        cell.innerText = data;
    }

    private addRow(x: number, y: number, r: number, time: number, date: Date, hit: boolean) {
        let row = this._table!.tBodies[0].insertRow();
        row.style.background ="black";
        row.style.color = "blue";
        row.style.textAlign="center"
        this._table!.style.display = "block";
        this.addCell(row, String(x))
        this.addCell(row, String(y))
        this.addCell(row, String(r))
        this.addCell(row, String(time) + " мс")
        this.addCell(row, String(date))
        this.addCell(row, hit ? "Попадание" : "Промах")
    }
    public send(){
        let that = this;

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/point/check",
            data:JSON.stringify( {r: this.r, x: this.x, y: this.y}),
            headers:{"Authorization":"Bearer "+localStorage.getItem("token")},
            contentType: "application/json",
            success(data): any {
                that.addRow(data.x,data.y,data.r,data.time,data.date,data.hit);
                that.drawPoint(data.x,data.y,data.r,data.hit);
            }
        })
    }
    public results(){
        let that = this;
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/point/results",
            headers:{"Authorization":"Bearer "+localStorage.getItem("token")},
            contentType: "application/json",
            success(data): any {
                for (let el of data){
                    that.addRow(el.x,el.y,el.r,el.time,el.date,el.hit);
                    that.drawPoint(el.x,el.y,el.r,el.hit);
                }
            }
        })
    }

    private drawPoint(x: number, y: number, r: number, hit: boolean) {
        let canvasElement = this._canvases.get(r);
        let context = canvasElement!.getContext("2d")!;
        context.fillStyle = hit ? "green" : "red";
        context.beginPath();
        context.arc(CanvasConst.MEDIAN_WIGHT + x * CanvasConst.SINGLE_SEGMENT, CanvasConst.MEDIAN_HEIGHT - y * CanvasConst.SINGLE_SEGMENT, CanvasConst.POINT_RADIUS, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }
}
