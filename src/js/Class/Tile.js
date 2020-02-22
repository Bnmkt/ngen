import { GameElement } from './GameElement'
export class Tile extends GameElement {
    constructor(game, spriteSrc = "terrain") {
        super(game, spriteSrc)
        this.sprite.sw = 32
        this.sprite.sh = 32
        this.sprite.dw = 32
        this.sprite.dh = 32
    }
}