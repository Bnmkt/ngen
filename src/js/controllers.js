export const controllers = {
    mouse: {
        left: false,
        x: undefined,
        y: undefined
    },
    keyPressed: [],
    keyAllowed: ["z", "q", "s", "d"],
    init(game) {
        this.game = game;
        window.addEventListener("keydown", e => { this.keyDown(e) }, false);
        window.addEventListener("keyup", e => { this.keyUp(e) }, false);
    },
    keyDown(e) {
        const key = e.key
        if (this.keyAllowed.indexOf(key) != -1 && this.keyPressed.indexOf(key) == -1) {
            this.keyPressed.push(key)
        }
    },
    keyUp(e) {
        const key = e.key
        if (this.keyAllowed.indexOf(key) != -1) {
            this.keyPressed.splice(this.keyPressed.indexOf(key), 1)
        }
    },
    isDown(key) {
        if (this.keyPressed.indexOf(key) != -1) {

            return true
        }

        return false
    },
    isUp(key) {
        return !this.isDown(key)
    },
    update() {
        this.mouse.left = false
    }
}