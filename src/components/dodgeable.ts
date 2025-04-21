import {
  AnchorComp,
  AreaComp,
  GameObj,
  KAPLAYCtx,
  OpacityComp,
  PosComp,
  RotateComp,
  ScaleComp,
  SpriteComp,
  StateComp,
  Vec2,
} from "kaplay";
import { logVector } from "../lib/log-vector";
import { MoveComp } from "./moving";

export function dodgeable(k: KAPLAYCtx) {
  return {
    id: "dodgeable",
    require: ["moving"],
    add() {},
    update() {
      k.get("arrow")
        .filter((t) => t.state == "shoot")
        .forEach(
          (
            arrow: GameObj<
              | PosComp
              | Vec2
              | SpriteComp
              | AreaComp
              | AnchorComp
              | ScaleComp
              | RotateComp
              | OpacityComp
              | StateComp
              | MoveComp
            >
          ) => {
            // todo: make a way to get an predict for arrow and dodge
            if (this.state == "dodge") return;
            const movimentation = arrow.getMovimentation().len();
            // TODO: Improve distances calculation and prediction
            const timeToPredict = 0.3 / Math.log(movimentation);
            const distPredict = arrow
              .getPredictedPosition(timeToPredict)
              .dist(this.pos);
            const dist = arrow.pos.dist(this.pos);
            // console.log(dist);
            if (distPredict < 100 || dist < 300) {
              this.enterState("dodge");
            }
            arrow.onCollide("enemy", () => {
              arrow.destroy();
            });
            this.onStateEnter("dodge", () => {
              console.log("dodge");
              const randomDirection = 140;
              //   const randomDirection =
              //     k.randi(0, 1) == 1 ? k.rand(80, 110) : k.rand(220, 270);
              const speed = 400;
              //   console.log({ randomDirection });
              this.setMovimentation(
                Math.cos(randomDirection) * speed,
                Math.sin(randomDirection) * speed
              );
              k.wait(0.5, () => {
                this.setMovimentation(0, 0);
                this.enterState("idle");
              });
            });
          }
        );
    },
    draw() {},
    destroy() {},
    inspect() {
      return `speed: ${this.speed}`;
    },
  };
}
