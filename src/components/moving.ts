import { Comp, KAPLAYCtx, Vec2 } from "kaplay";
export interface MoveComp extends Comp {
  setMovimentation: (mov: Vec2) => void;
  setHMovimentation: (h: number) => void;
  setVMovimentation: (v: number) => void;
  getMovimentation: () => Vec2;
  stopMovimentInterval: (timeout: number) => void;
  getPredictedPosition: (time: number) => Vec2;
}
export function moving(k: KAPLAYCtx, automatic = true) {
  let moviment: Vec2 = k.vec2(0, 0);
  return {
    id: "moving",
    require: ["pos"],
    add() {},
    update() {
      this.move(moviment);
    },
    draw() {
      if (!automatic) {
        moviment = k.vec2(0, 0);
      }
    },
    destroy() {},
    setMovimentation(mov: Vec2) {
      moviment = mov;
    },
    setHMovimentation(h: number) {
      moviment = k.vec2(h, moviment.y);
    },
    setVMovimentation(v: number) {
      moviment = k.vec2(moviment.x, v);
    },
    getMovimentation() {
      return moviment;
    },
    stopMovimentInterval(timeout: number) {
      const oldMoviment = moviment;
      moviment = k.vec2(0, 0);
      k.wait(timeout, () => {
        moviment = oldMoviment;
      });
    },
    getPredictedPosition(time: number) {
      return this.pos.add(moviment.scale(time));
    },
  };
}
