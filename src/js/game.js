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
        noise:undefined,
        map:{"base":[],"el":[]},
        viewport:{
            x:1,
            y:1
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
        this.seed = this.config.seed?(parseInt(this.config.seed).toString() !== "NaN")?parseInt(this.config.seed):this.imports.str2seed(this.config.seed):this.imports.str2seed(Math.random().toString(36).substring(7))
        this.datas.offsetOne = new this.imports.SimplexNoise(this.seed)
        this.datas.offsetTwo = new this.imports.SimplexNoise(this.seed*Math.PI)
        this.datas.offsetThree = new this.imports.SimplexNoise(this.seed/Math.PI)
        for(let y = 0;y < this.canvas.height/this.config.tileSize; y++){
            this.datas.map["base"][y] = [];
            for(let x = 0;x < this.canvas.width/this.config.tileSize; x++){
                const offsetOne = this.datas.offsetOne.noise2D((x+this.datas.viewport.x)/this.config.mapView, (y+this.datas.viewport.y)/this.config.mapView)
                const offsetTwo = this.datas.offsetTwo.noise2D((x+this.datas.viewport.x)/this.config.mapView, (y+this.datas.viewport.y)/this.config.mapView)
                const offsetThree = this.datas.offsetThree.noise2D((x+this.datas.viewport.x)/this.config.mapView, (y+this.datas.viewport.y)/this.config.mapView)
                const nVal = (offsetOne*this.config.offsetOneImportance+offsetTwo*this.config.offsetTwoImportance*offsetThree*this.config.offsetThreeImportance)/2
                //const nVal = offsetOne
                let tileType;
                let filter;
                if(nVal <= this.config.waterLevel-this.config.waterOffset){
                    //nVal*=-offsetOne
                    tileType="water"
                    filter=`hue-rotate(${340+(10-(Math.min(-.0001,nVal)*10))}deg) brightness(${100+(Math.min(-.0001,nVal)*50)}%)`
                }else if(nVal < this.config.waterLevel){
                    tileType="water"
                    filter="hue-rotate(-10deg)"
                }else if(nVal < this.config.waterLevel+this.config.waterErodeOffset){
                    tileType="sand"
                }else if(nVal < .6){
                    tileType="grass"
                    filter=`brightness(${100-(nVal-.6)*40}%)`
                }else if(nVal < 1.5){
                    tileType="rock"
                    filter=`hue-rotate(${-(nVal-.6)*60}deg) brightness(${100-(nVal-.6)*60}%)`
                }else{
                    tileType="rock"
                    filter=`brightness(200)`
                }
                this.datas.map["base"][y].push(new TilesetElement(this, {"tilesetType": tileType, x:x*this.config.tileSize, y:y*this.config.tileSize, filter}))
            }   
        }
        for(let y = 0;y < this.datas.map["base"].length; y++){
            this.datas.map["el"][y]=[]
            for(let x = 0;x < this.datas.map["base"][y].length; x++){
                this.datas.map["el"][y][x] = null
                if(!this.datas.map["base"][y+1]) continue
                if(this.datas.map["base"][y+1][x].tilesetType==="grass" && Math.random()>1-this.config.treePercentage) this.datas.map["el"][y][x] = new TilesetElement(this,{tilesetType:"tree", x:x*this.config.tileSize, y:y*this.config.tileSize}) 
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
            for(let y = 0;y < this.datas.map[layer].length; y++){
                for(let x = 0;x < this.datas.map[layer][y].length; x++){
                    if(!this.datas.map[layer][y][x]) continue
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