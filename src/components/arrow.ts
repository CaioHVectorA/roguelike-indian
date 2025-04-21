import { KAPLAYCtx } from "kaplay";
import { Player } from "../entities/player";

export function arrow(k: KAPLAYCtx, player: Player) {
  return {
    id: "arrow",
    require: ["pos"],
    add() {},
    update() {},
    draw() {},
    destroy() {},
    // todo
  };
}
