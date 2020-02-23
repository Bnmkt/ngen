import { game } from './js/game'
import config from './js/gameConfig.json'

game.config = config
game.init(config.gameWidth || window.innerWidth, config.gameHeight || window.innerHeight)