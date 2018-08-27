export default class Player {
    constructor(game) {
        this.text = '玩家';
        this.x = (game.camera.width / 2) | 0;
        this.y = game.camera.height - 1;
        this._game = game;
    }
    move(direction) {
        switch (direction) {
            case 'left':
                this.x = Math.max(0, this.x - 1);
                break;
            case 'right':
                this.x = Math.min(this._game.camera.width, this.x + 1);
                break;
        }
    }
    moveLeft(){
        this.move('left');
    }
    moveRight(){
        this.move('right');
    }
}