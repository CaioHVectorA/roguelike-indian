import kaplay from "kaplay";
import { playerFn, playerOnUpdate, setupKeybindings } from "./entities/player";
import { buttonConfig } from "./consts/button-config";
import { rectFactory } from "./components/rect";
import { stamina } from "./components/stamina";
import { size } from "./components/size";
import { dodgeable } from "./components/dodgeable";
import { moving } from "./components/moving";
const k = kaplay({
  ...buttonConfig,
  background: "#ffffff",
});
k.loadRoot("./"); // A good idea for Itch.io publishing later
// k.loadSprite("bean", "sprites/bean.png");
k.loadSprite("player", "sprites/main_big.png");
k.loadSprite("arrow", "sprites/arrow.png");
const player = playerFn(k);
setupKeybindings(k, player);
player.onUpdate(playerOnUpdate(k, player));
k.add([
  ...rectFactory(k, [400, 400], 48),
  size(48, 48, k),
  stamina(0, k, true),
  moving(k, true),
  k.state("idle", ["idle", "dodge"]),
  dodgeable(k),
  k.area(),
  "enemy",
]);
