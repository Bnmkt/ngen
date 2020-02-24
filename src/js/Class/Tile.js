import { GameElement } from './GameElement'
export class Tile extends GameElement {
    constructor(game, spriteSrc = "terrain") {
        super(game, spriteSrc)
        this.sprite.sw = this.game.config.fileTileSize
        this.sprite.sh = this.game.config.fileTileSize
        this.sprite.dw = this.game.config.tileSize
        this.sprite.dh = this.game.config.tileSize
    }
}