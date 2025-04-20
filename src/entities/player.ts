import { KAPLAYCtx } from "kaplay";
import { size } from "../components/size";
import { moving } from "../components/moving";

export const PLAYER = {
  SIZE_X: 39,
  SIZE_Y: 43,
  INITIAL_HEALTH: 100,
  BASE_SPEED: 320,
};

let speed = PLAYER.BASE_SPEED;

export const playerFn = (k: KAPLAYCtx) => {
  const player = k.add([
    k.pos(120, 80),
    k.sprite("player"),
    // k.rect(PLAYER.SIZE_X, PLAYER.SIZE_Y),
    k.area(),
    k.anchor("center"),
    k.center(),
    k.body(),
    size(PLAYER.SIZE_X, PLAYER.SIZE_Y, k),
    k.health(PLAYER.INITIAL_HEALTH, PLAYER.INITIAL_HEALTH),
    moving(k, false),
    "player",
    "hero",
    "ally",
    "living",
  ]);
  return player;
};
export type Player = ReturnType<typeof playerFn>;
export function playerOnUpdate(k: KAPLAYCtx, player: Player) {
  return () => {
    const angle =
      Math.atan2(k.mousePos().y - player.pos.y, k.mousePos().x - player.pos.x) *
      (180 / Math.PI);
    player.use(k.rotate(angle));
  };
}

export const setupKeybindings = (
  k: KAPLAYCtx,
  player: ReturnType<typeof playerFn>
) => {
  k.onButtonDown("left", () => {
    player.setHMovimentation(-speed);
    // player.move(-speed, 0)
  });

  k.onButtonDown("right", () => {
    player.setHMovimentation(speed);
    // player.move(speed, 0)
  });

  k.onButtonDown("up", () => {
    player.setVMovimentation(-speed);
    // player.move(0, -speed)
  });

  k.onButtonDown("down", () => {
    player.setVMovimentation(speed);
    // player.move(0, speed);
  });
  k.onButtonPress("shoot", () => {
    const angle = Math.atan2(
      k.mousePos().y - player.pos.y,
      k.mousePos().x - player.pos.x
    );
    console.log(
      angle,
      Math.cos(angle),
      Math.sin(angle),
      angle * (180 / Math.PI)
    );
    k.add([
      k.sprite("arrow"),
      k.pos(
        player.pos.x +
          Math.cos(angle) * 32 -
          6 *
            (angle * (180 / Math.PI) > 90 || angle * (180 / Math.PI) < -90
              ? -1
              : 1),
        player.pos.y +
          Math.sin(angle) * 32 -
          6 *
            (angle * (180 / Math.PI) > 90 || angle * (180 / Math.PI) < -90
              ? -1
              : 1)
      ),
      k.scale(2),
      k.rotate(angle * (180 / Math.PI)),
    ]);
  });
  //   k.onButtonPress("dash", async () => {
  //     if (player.getStamina() < 65) return;
  //     speed = PLAYER.BASE_SPEED * 2;
  //     await k.wait(0.1);
  //     speed = PLAYER.BASE_SPEED;
  //     for (let i = 0; i < 20; i++) {
  //       player.setStamina(player.getStamina() - 6.5 / 1.5);
  //       await k.wait(0.002);
  //     }
  //   });
};
