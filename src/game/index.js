
import pool from '../base/pool.js';
import Enemy from '../npc/enemy.js';
import Player from '../player';

export default class Game {
    constructor() {
        this.init();
        this.initEvent();
        this.state.end = true;
        console.log('请用键盘的左右键控制玩家左右移动，躲避障碍！');
        console.log('Enter键可以开始、暂停游戏。');
        console.log('如果按键没得反应，请先在左侧页面任意地方点击一下。');
    }

    init() {
        this.enemys = [];
        this.camera = {
            width: 30,
            height: 10
        };
        this.score = 0;
        this.count = 0;
        this.state = {
            start: false,
            pause: false,
            end: false,
        };
        this.timer = null;
    }

    initEvent() {
        document.onkeydown = (e) => {
            if (e.keyCode === 13) {
                if (this.isGameover()) {
                    this.start();
                } else {
                    this.state.pause = !this.state.pause;
                }
            } else if (e.keyCode === 37) {
                this.player.moveLeft();
            } else if (e.keyCode === 39) {
                this.player.moveRight();
            } else if (e.keyCode === 38) {
                // this.player.moveRight();
            } else if (e.keyCode === 40) {
                // this.speed = 1;
            } else {
                console.log(e.keyCode);
            }
        };
    }

    start() {
        if (this.timer) window.cancelAnimationFrame(this.timer);
        this.init();
        this.player = new Player(this);
        this.gameLoop();
        document.body.focus();
    }

    isGameover() {
        return this.state.end;
    }

    pause() {
        this.state.pause = true;
    }

    resume() {
        this.state.pause = false;
    }

    enemyGenerate() {
        if (this.count % 40 === 0) {
            let enemy = pool.getItemByClass('enemy', Enemy, this);
            enemy.init();
            this.enemys.push(enemy);
        }
    }

    update() {
        this.enemys.forEach(enemy => enemy.update());
        this.enemyGenerate();
    }

    render() {
        console.log('请用键盘的左右键控制玩家左右移动，躲避障碍！');
        console.log('Enter键可以开始、暂停游戏。');
        let s = [...Array(this.camera.height)].map(() => {
            return Array(this.camera.width).fill('--');
        });

        this.enemys.forEach(enemy => {
            [...enemy.text].forEach((word, index) => {
                s[enemy.y] && (s[enemy.y][enemy.x + index] = word);
            });
        });

        [...this.player.text].forEach((word, index) => {
            if (s[this.player.y][this.player.x + index] === '--') {
                s[this.player.y][this.player.x + index] = word;
            } else {
                this.state.end = true;
            }
        });

        s = s.map(row => {
            return row.join('');
        });

        s = s.join(`\n`);

        console.log(s);
        if (this.state.end) {
            console.log('game over!');
        }
    }

    gameLoop() {
        let gameLoop = () => {
            this.timer = requestAnimFrame(gameLoop);
            if (this.state.pause || this.state.end) return false;
            this.count++;
            if (this.count % 20) {
                return;
            }
            console.clear();
            this.update();
            this.render();
        };
        gameLoop();
    }
}