import { KAPLAYCtx } from "kaplay";
import { Player } from "../entities/player";

export function arrowUser(k: KAPLAYCtx) {
  return {
    id: "arrow",
    require: ["pos"],
    add() {},
    update() {},
    draw() {},
    destroy() {},
    shoot() {
      console.log("Shoot");
      const angle = Math.atan2(
        k.mousePos().y - this.pos.y,
        k.mousePos().x - this.pos.x
      );
      const arrow = k.add([
        k.sprite("arrow"),
        k.pos(
          this.pos.x +
            Math.cos(angle) * 80 -
            6 *
              (angle * (180 / Math.PI) > 90 || angle * (180 / Math.PI) < -90
                ? -1
                : 1),
          this.pos.y +
            Math.sin(angle) * 80 -
            6 *
              (angle * (180 / Math.PI) > 90 || angle * (180 / Math.PI) < -90
                ? -1
                : 1)
        ),
        k.scale(2),
        k.rotate(angle * (180 / Math.PI)),
        k.area(),
        k.center(),
        k.anchor("center"),
        k.state("prepare", ["prepare", "shoot"]),
        "arrow",
      ]);
      const pullSpeed = 40;
      arrow.pos.x = this.pos.x + Math.cos(angle) * 64;
      arrow.pos.y = this.pos.y + Math.sin(angle) * 64;
      let distance = 0;
      arrow.onStateUpdate("prepare", () => {
        const angle = Math.atan2(
          k.mousePos().y - this.pos.y,
          k.mousePos().x - this.pos.x
        );
        if (distance < 20) {
          distance += pullSpeed * k.dt();
        }
        arrow.use(k.rotate(angle * (180 / Math.PI)));
        arrow.pos.x = this.pos.x + Math.cos(angle) * 64 - distance;
        arrow.pos.y = this.pos.y + Math.sin(angle) * 64 - distance;
      });
    },
  };
}
