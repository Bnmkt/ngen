import {controllers} from './controllers'
import {imports} from './imports'

export const game = {
    canvas: document.querySelector("#game"),
    ctx: undefined,
    datas:{
        frame:0
    },
    controllers,
    imports,
    init(w = 1280, h = 720){

        this.controllers.init(this)
        this.update()
    },
    update(){
        if(this.controllers.isDown("D")){
            console.log("hello")
        }

        this.controllers.update()
        window.requestAnimationFrame(e=>{
            this.datas.frame++
            this.update()
        })
    }

}