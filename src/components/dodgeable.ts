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
  let arrowObj: GameObj<
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
  > | null = null;
  return {
    id: "dodgeable",
    require: ["moving"],
    add() {
      this.onStateEnter("dodge", () => {
        if (!arrowObj) return;
        console.log("dodge");
        const randomDirection = arrowObj.getMovimentation().angle();
        // console.log({ randomDirection });
        //   const randomDirection =
        //     k.randi(0, 1) == 1 ? k.rand(80, 110) : k.rand(220, 270);
        const speed = 400;
        //   console.log({ randomDirection });
        let direction = Math.random() > 0.5 ? 1 : -1;
        if (this.pos.x + 200 > k.width()) {
          direction = 1;
        }
        if (this.pos.x - 200 < 0) {
          direction = -1;
        }
        if (this.pos.y + 200 < k.height()) {
          direction = 1;
        }
        if (this.pos.y - 200 > 0) {
          direction = -1;
        }
        console.log(direction);
        this.setMovimentation(
          k.vec2(
            Math.cos(k.deg2rad(randomDirection + 90 * direction)) * speed,
            Math.sin(k.deg2rad(randomDirection + 90 * direction)) * speed
          )
        );
        k.wait(0.5, () => {
          this.setMovimentation(0, 0);
          this.enterState("idle");
        });
      });
    },
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
            arrowObj = arrow;
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
              arrow.enterState("idle");
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
