import { KAPLAYCtx } from "kaplay";
import { Player } from "../entities/player";

export function arrowUser(k: KAPLAYCtx) {
  let cooldown = 0.3;
  let cooldownTimer = Infinity;
  let state = 1;
  return {
    id: "arrow",
    require: ["pos"],
    add() {},
    update() {
      if (state == 1) cooldownTimer += k.dt();
    },
    draw() {},
    destroy() {},
    shoot() {
      if (cooldownTimer < cooldown) return;
      const angle = Math.atan2(
        k.mousePos().y - this.pos.y,
        k.mousePos().x - this.pos.x
      );
      const arrow = k.add([
        k.sprite("arrow"),
        k.pos(this.pos.x, this.pos.y),
        k.scale(2),
        k.rotate(angle * (180 / Math.PI)),
        k.area(),
        k.center(),
        k.opacity(1),
        k.anchor("center"),
        k.state("prepare", ["prepare", "shoot"]),
        "arrow",
      ]);

      const pullSpeed = 64;
      arrow.pos.x = this.pos.x + Math.cos(angle) * 64;
      arrow.pos.y = this.pos.y + Math.sin(angle) * 64;
      let distance = 0;
      let direction = angle;
      cooldownTimer = 0;
      arrow.onStateUpdate("prepare", () => {
        const angle = Math.atan2(
          k.mousePos().y - this.pos.y,
          k.mousePos().x - this.pos.x
        );
        if (distance < 20) {
          distance += pullSpeed * k.dt();
        }
        direction = angle;
        arrow.rotateTo(angle * (180 / Math.PI));
        arrow.use(k.rotate(angle * (180 / Math.PI)));
        const distanceX = Math.cos(angle) * distance;
        const distanceY = Math.sin(angle) * distance;
        arrow.pos.x = this.pos.x + Math.cos(angle) * 64 - distanceX;
        arrow.pos.y = this.pos.y + Math.sin(angle) * 64 - distanceY;
      });
      arrow.onStateEnter("shoot", () => {
        state = 1;
        arrow.use(k.move(direction * (180 / Math.PI), distance ** 1.2 * 40));
      });
      let life = 0;
      arrow.onStateUpdate("shoot", () => {
        life += k.dt();
        // console.log(0.4 * Math.log(distance));
        if (life > 0.4 * Math.log(distance)) {
          arrow.use(k.move(0, 0));
          arrow.opacity = 0.4;
        }
      });
    },
  };
}
