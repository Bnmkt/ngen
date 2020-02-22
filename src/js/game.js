import { controllers } from './controllers'
import { imports } from './imports'
import { Tile } from './Class/Tile'
import { spriteList } from './spritelist'

export const game = {
    canvas: document.querySelector("#game"),
    ctx: undefined,
    datas: {
        frame: 0,
        tiles: []
    },
    spriteList,
    controllers,
    imports,
    init(w = 1280, h = 720) {
        this.ctx = this.canvas.getContext("2d")
        this.controllers.init(this)
        this.datas.tiles.push(new Tile(game), new Tile(game), new Tile(game), new Tile(game))
        this.datas.tiles[0].sprite.y = 1
        this.datas.tiles[1].sprite.x = 1
        this.datas.tiles[1].sprite.y = 1
        this.datas.tiles[1].y = 0
        this.datas.tiles[1].x = 32
        this.datas.tiles[2].sprite.x = 0
        this.datas.tiles[2].sprite.y = 2
        this.datas.tiles[2].y = 32
        this.datas.tiles[2].x = 0
        this.datas.tiles[3].sprite.x = 1
        this.datas.tiles[3].sprite.y = 2
        this.datas.tiles[3].y = 32
        this.datas.tiles[3].x = 32
        this.update()
    },
    update() {
        if (this.controllers.isDown("d")) {}

        this.datas.tiles.forEach(tile => {
            tile.update();
        })

        this.controllers.update()
        window.requestAnimationFrame(e => {
            this.datas.frame++
                this.update()
        })
    }

}