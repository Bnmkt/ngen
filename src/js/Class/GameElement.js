import { Sprite } from './Sprite'
export class GameElement {
    constructor(game, spriteSrc) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.sprite = new Sprite();
        this.sprite.setSpritesheet(this.game.spriteList[spriteSrc])
        this.dx = 0;
        this.dy = 0;
        this.displayed = true;
        this.frame = 0;
    }
    draw() {
        if (!this.displayed) return false
        const [image, sx, sy, sw, sh, dx, dy, dw, dh] = this.sprite.drawableObj()
        this.game.ctx.save()
            //this.game.ctx.filter = this.filter || "none"
        this.game.ctx.drawImage(image, sx, sy, sw, sh, this.x, this.y, dw, dh)
        this.game.ctx.restore()
    }
    update() {
        this.frame++;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}