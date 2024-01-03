export class Result {
  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get r(): number {
    return this._r;
  }
  private _x : number;
  private _y : number;
  private _r :number;

  constructor(x:number, y:number, r:number) {
    this._x = x;
    this._y = y;
    this._r = r;
  }
}
