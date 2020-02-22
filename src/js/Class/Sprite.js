export class Sprite {
    constructor() {
        this.image = new Image();
        this.x = 0;
        this.y = 0;
        this.sx = 0;
        this.sy = 0;
        this.sw = 0;
        this.sh = 0;
        this.dw = 0;
        this.dh = 0;
    }
    setSpritesheet(name) {
        this.image.src = name;
    }
    drawableObj() {
        const { image, sx, sy, sw, sh, dx, dy, dw, dh } = this
        return [image, sx + (this.x * sw), sy + (this.y * sh), sw, sh, dx, dy, dw, dh]
    }
}