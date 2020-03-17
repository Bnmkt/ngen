import { controllers } from './controllers'
import { imports } from './imports'
import { tileset } from './tileset'
import { spriteList } from './spritelist'
import { TilesetElement } from './Class/TilesetElement'

export const game = {
    canvas: document.querySelector("#game"),
    ctx: undefined,
    datas: {
        frame: 0,
        tiles: [],
        elements: [],
        noise: undefined,
        map: { "base": [], "el": [] },
        viewport: {
            x: 1,
            y: 1
        }
    },
    tileset,
    spriteList,
    controllers,
    imports,
    init(w = 1280, h = 720) {
        this.canvas.width = w
        this.canvas.height = h
        this.ctx = this.canvas.getContext("2d")
        this.controllers.init(this)
        this.seed = this.config.seed ? (parseInt(this.config.seed).toString() !== "NaN") ? parseInt(this.config.seed) : this.imports.str2seed(this.config.seed) : this.imports.str2seed(Math.random().toString(36).substring(7))
        this.datas.offsetGlobal = new this.imports.SimplexNoise(this.seed)
        this.datas.offsetMountain = new this.imports.SimplexNoise(this.seed * Math.PI)
        this.datas.offsetDetails = new this.imports.SimplexNoise(this.seed / Math.PI)
        for (let y = 0; y < this.canvas.height / this.config.tileSize; y++) {
            this.datas.map["base"][y] = [];
            for (let x = 0; x < this.canvas.width / this.config.tileSize; x++) {
                const offsetOne = this.datas.offsetGlobal.noise2D((x + this.datas.viewport.x) / this.config.mapView, (y + this.datas.viewport.y) / this.config.mapView)
                const offsetTwo = this.datas.offsetMountain.noise2D((x + this.datas.viewport.x) / this.config.mapView, (y + this.datas.viewport.y) / this.config.mapView)
                const offsetThree = this.datas.offsetDetails.noise2D((x + this.datas.viewport.x) / this.config.mapView, (y + this.datas.viewport.y) / this.config.mapView)
                const tileHeight = (offsetOne * this.config.offsetOneImportance + offsetTwo * this.config.offsetTwoImportance * offsetThree * this.config.offsetThreeImportance) / 2
                    //const nVal = offsetOne
                let tileType;
                let filter;
                if (tileHeight <= this.config.waterLevel - this.config.waterOffset) {
                    tileType = "water"
                } else if (tileHeight < this.config.waterLevel) {
                    tileType = "water"
                } else if (tileHeight < this.config.waterLevel + this.config.waterErodeOffset) {
                    tileType = "sand"
                } else if (tileHeight < .6) {
                    tileType = "grass"
                } else if (tileHeight < 1.5) {
                    tileType = "rock"
                } else {
                    tileType = "rock"
                }
                this.datas.map["base"][y].push(new TilesetElement(this, { "tilesetType": tileType, x: x * this.config.tileSize, y: y * this.config.tileSize, filter }))
            }
        }
        for (let y = 0; y < this.datas.map["base"].length; y++) {
            this.datas.map["el"][y] = []
            for (let x = 0; x < this.datas.map["base"][y].length; x++) {
                this.datas.map["el"][y][x] = null
                if (!this.datas.map["base"][y + 1]) continue
                if (this.datas.map["base"][y + 1][x].tilesetType === "grass" && Math.random() > 1 - this.config.treePercentage) this.datas.map["el"][y][x] = new TilesetElement(this, { tilesetType: "tree", x: x * this.config.tileSize, y: y * this.config.tileSize })
            }
        }
        console.log(this)
        this.update()
    },
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if (this.controllers.isDown("d")) {
            this.datas.viewport.x++;
        }
        this.datas.elements.forEach(element => {
            element.update();
        })
        for (const layer in this.datas.map) {
            for (let y = 0; y < this.datas.map[layer].length; y++) {
                for (let x = 0; x < this.datas.map[layer][y].length; x++) {
                    if (!this.datas.map[layer][y][x]) continue
                    this.datas.map[layer][y][x].update()
                }
            }
        }

        this.controllers.update()
        window.requestAnimationFrame(e => {
            this.datas.frame++
                this.update()
        })
    }

}