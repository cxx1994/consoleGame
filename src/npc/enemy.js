import { rnd } from '../utils';
import pool from '../base/pool.js';

export default class Enemy {
    constructor(game) {
        this._game = game;
    }

    init() {
        this.text = ['小刀', '枪', '棍', '棒', '陈兴旭的拳头'][rnd(0, 5)];
        this.x = rnd(0, this._game.camera.width - 2);
        this.y = 0;
        this.speed = 1;
    }

    update() {
        this.y += this.speed;

        if (this.y > this._game.camera.height || this.x < 0) {
            this._game.enemys = this._game.enemys.filter(item => item !== this);

            pool.recover('enemy', this)
        }
    }
}