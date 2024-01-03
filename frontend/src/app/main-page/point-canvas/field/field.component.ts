import {Component, Input, OnInit} from '@angular/core';
import {CanvasConst} from "./canvas-const";
import $, {data} from "jquery";
import {SendService} from "../../../services/send.service";
@Component({
    selector: 'app-field',
    standalone: true,
    imports: [],
    templateUrl: './field.component.html',
    styleUrl: './field.component.css'
})
export class FieldComponent implements OnInit{
    @Input()
    public radius: number = 0;
    public service : SendService;
    constructor(service : SendService) {
        this.service = service;
    }

    public clickCanvas(event: MouseEvent) {
        let x = (event.offsetX - CanvasConst.MEDIAN_WIGHT) / CanvasConst.SINGLE_SEGMENT;
        let y = (CanvasConst.MEDIAN_HEIGHT - event.offsetY) / CanvasConst.SINGLE_SEGMENT;
        let last_x = this.service.x;
        this.service.x = x;
        let last_y = this.service.y;
        this.service.y = y;
        let last_r = this.service.r;
        this.service.r = this.radius;
        this.service.send();
        this.service.x = last_x;
        this.service.y = last_y;
        this.service.r = last_r;

    }

    private drawGraph(canvas: HTMLCanvasElement) {
        let ctx = canvas.getContext("2d");
        let radius = this.radius;
        if (ctx != null)
        {
            ctx.beginPath();
            ctx.moveTo(CanvasConst.MEDIAN_WIGHT, CanvasConst.MEDIAN_HEIGHT-radius*CanvasConst.SINGLE_SEGMENT);
            ctx.lineTo(CanvasConst.MEDIAN_WIGHT + CanvasConst.SINGLE_SEGMENT * radius, CanvasConst.MEDIAN_HEIGHT);
            ctx.lineTo(CanvasConst.MEDIAN_WIGHT+CanvasConst.SINGLE_SEGMENT*radius,CanvasConst.MEDIAN_HEIGHT+CanvasConst.SINGLE_SEGMENT*radius);
            ctx.lineTo(CanvasConst.MEDIAN_WIGHT,CanvasConst.MEDIAN_HEIGHT+CanvasConst.SINGLE_SEGMENT*radius);
            ctx.lineTo(CanvasConst.MEDIAN_WIGHT,CanvasConst.MEDIAN_HEIGHT);
            ctx.lineTo(CanvasConst.MEDIAN_WIGHT-CanvasConst.SINGLE_SEGMENT*radius,CanvasConst.MEDIAN_HEIGHT)
            ctx.arc(CanvasConst.MEDIAN_WIGHT, CanvasConst.MEDIAN_HEIGHT, CanvasConst.SINGLE_SEGMENT * radius, -Math.PI, -Math.PI/2);
            ctx.closePath();
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.font = "bold 10pt Arial";
            ctx.fillText("R = " + radius, CanvasConst.WIGHT - CanvasConst.TEXT_RANGE, CanvasConst.HEIGHT - CanvasConst.TEXT_RANGE);
            ctx.beginPath();
            ctx.fill();
        }
    }


    private drawLines(canvas: HTMLCanvasElement) {
        let ctx = canvas.getContext("2d");
        if (ctx != null) {
            ctx.beginPath();
            ctx.moveTo(0, CanvasConst.MEDIAN_HEIGHT);
            ctx.lineTo(CanvasConst.WIGHT, CanvasConst.MEDIAN_HEIGHT);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath()
            ctx.moveTo(CanvasConst.MEDIAN_WIGHT, 0);
            ctx.lineTo(CanvasConst.MEDIAN_WIGHT, CanvasConst.HEIGHT);
            ctx.stroke();
            ctx.beginPath();
            ctx.font = "bold 10pt Arial";
            ctx.fillText("y", CanvasConst.MEDIAN_WIGHT - CanvasConst.LENGTH_LINE, CanvasConst.LENGTH_LINE, 700);
            ctx.fillText("x", CanvasConst.WIGHT - CanvasConst.LENGTH_LINE, CanvasConst.MEDIAN_HEIGHT - CanvasConst.LENGTH_LINE, 700);
            ctx.fillText("0", CanvasConst.MEDIAN_WIGHT - CanvasConst.LENGTH_LINE, CanvasConst.MEDIAN_HEIGHT + CanvasConst.LENGTH_LINE);
            ctx.fillText("1", CanvasConst.MEDIAN_HEIGHT + CanvasConst.SINGLE_SEGMENT, CanvasConst.MEDIAN_HEIGHT + CanvasConst.LENGTH_LINE);
            ctx.closePath();
        }
    }

    ngOnInit(): void {
        let field = $(".canvas").get(this.radius-1) as HTMLCanvasElement;
        this.drawLines(field);
        this.drawGraph(field);
        this.service.canvases.set(this.radius,field);
    }
}
