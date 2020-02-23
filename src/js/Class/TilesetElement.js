import { Tile } from './Tile'
export class TilesetElement {
    constructor(game, options = {}) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.tiles = [];
        if (options) {
            for (const key in options) {
                this[key] = options[key]
            }
        }
        if (!this.tilesetType) this.tilesetType = "grass"

        if (!this.game.tileset.hasOwnProperty(this.tilesetType)) return
        this.buildTiles(this.game.tileset[this.tilesetType]);
    }
    buildTiles(tileset) {
        if (Array.isArray(tileset)) {
            tileset.forEach(tl => {
                this.buildTiles(tl)
            })
        }
        const nt = new Tile(this.game, tileset.spriteName)
        nt.x = tileset.x + this.x
        nt.y = tileset.y + this.y
        nt.sprite.x = tileset.spriteX
        nt.sprite.y = tileset.spriteY
        nt.filter = this.filter;
        this.tiles.push(nt);
    }
    update() {
        this.tiles.forEach(tile => {
            tile.update();
        })
    }
}