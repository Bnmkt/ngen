import { controllers } from './controllers'
import { imports } from './imports'
import { tileset } from './tileset'
import { spriteList } from './spritelist'
import { tilesetElement, TilesetElement } from './Class/TilesetElement'

export const game = {
    canvas: document.querySelector("#game"),
    ctx: undefined,
    datas: {
        frame: 0,
        tiles: [],
        elements: [],
    },
    tileset,
    spriteList,
    controllers,
    imports,
    init(w = 1280, h = 720) {
        this.ctx = this.canvas.getContext("2d")
        this.controllers.init(this)
        this.datas.elements.push(new TilesetElement(game, { tilesetType: "tree", y: 0 }))
        this.update()
    },
    update() {
        if (this.controllers.isDown("d")) {}

        this.datas.elements.forEach(element => {
            element.update();
        })

        this.controllers.update()
        window.requestAnimationFrame(e => {
            this.datas.frame++
                this.update()
        })
    }

}