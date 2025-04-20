import kaplay from "kaplay";
import { playerFn, playerOnUpdate, setupKeybindings } from "./entities/player";
import { buttonConfig } from "./consts/button-config";
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
