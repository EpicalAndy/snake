import { SnakeTail } from "./snake-tail.js";
export class Snake {
    constructor(snakeLength = 0, context) {
        let posX = Math.round((Math.random() * (10 - snakeLength)) + snakeLength), posY = Math.round((Math.random() * (10 - snakeLength)) + 1);
        this.border = context.border;
        this.context = context;
        this.direction = 'r';
        this.isSnakeRised = false;
        this.snakeParts = [new SnakePart(posX, posY, 'coral')];
        this._snakeTail = new SnakeTail();
        this.snakeBody = {
            head: this.border.querySelector(`[posX = "${posX}"][posY = "${posY}"]`),
            tail: []
        };
        for (let i = snakeLength - 1, k = 1; k <= i; k++) {
            this.snakeBody.tail.push(this.border.querySelector(`[posX = "${posX - k}"][posY = "${posY}"]`));
            this._snakeTail.addTail({ color: '' });
            this.snakeParts.push(new SnakePart(posX - k, posY, 'chocolate'));
        }
        this.snakeBody.head.classList.add('snake-head', 'snake-body');
        for (let i = this.snakeBody.tail.length; i--;) {
            this.snakeBody.tail[i].classList.add('snake-tail', 'snake-body');
        }
        this.listenerDirection();
    }
    listenerDirection() {
        window.addEventListener('keydown', this.getSnakeDirection.bind(this));
    }
    // Определяет направление движения змеи по нажатию клавиш. Запрещено движение в противоположном направлении
    getSnakeDirection(e) {
        window.console.log(`e.code = ${e.code}; e.code = ${e.keyCode}`);
        switch (e.keyCode) {
            // left
            case 37:
                if (this.direction !== 'r') {
                    this.direction = 'l';
                }
                break;
            // up
            case 38:
                if (this.direction !== 'd') {
                    this.direction = 'u';
                }
                break;
            // right
            case 39:
                if (this.direction !== 'l') {
                    this.direction = 'r';
                }
                break;
            // down
            case 40:
                if (this.direction !== 'u') {
                    this.direction = 'd';
                }
        }
    }
    // TODO Метод выглядит ужасно! Нужно от рефакторить!!!!
    move() {
        let newTail = document.querySelector('.snake-head'), oldHeadPos = { x: null, y: null }, newHeadPos = { x: null, y: null }, newHead;
        oldHeadPos.x = +this.snakeBody.head.getAttribute('posX');
        oldHeadPos.y = +this.snakeBody.head.getAttribute('posy');
        if (this.direction === 'r') {
            newHeadPos.x = oldHeadPos.x % 10 + 1;
            newHeadPos.y = oldHeadPos.y;
        }
        if (this.direction === 'l') {
            newHeadPos.x = (oldHeadPos.x - 1) || 10;
            newHeadPos.y = (oldHeadPos.y);
        }
        if (this.direction === 'u') {
            newHeadPos.x = oldHeadPos.x;
            newHeadPos.y = (oldHeadPos.y - 1) || 10;
        }
        if (this.direction === 'd') {
            newHeadPos.x = oldHeadPos.x;
            newHeadPos.y = oldHeadPos.y % 10 + 1;
        }
        newTail.classList.remove('snake-head', 'snake-body', 'snake-head-right', 'snake-head-left', 'snake-head-down', 'snake-head-up');
        newTail.classList.add('snake-tail');
        this.snakeBody.tail.unshift(newTail);
        if (this.isSnakeRised === false) {
            this.snakeBody.tail[this.snakeBody.tail.length - 1].classList.remove('snake-tail', 'snake-body');
            this.snakeBody.tail.pop();
        }
        newHead = this.snakeBody.head = document.querySelector(`[posX = "${newHeadPos.x}"][posY = "${newHeadPos.y}"]`);
        newHead.classList.add('snake-body', 'snake-head');
        this.snakeEatYourself();
        this.rotateHead();
        this.eatFood(newHead);
    }
    eatFood(snakeHead) {
        this.isSnakeRised = false;
        if (snakeHead && snakeHead.classList.contains('food')) {
            this.isSnakeRised = true;
            this.context.eat();
        }
    }
    rotateHead() {
        let head = this.snakeBody.head;
        head.classList.remove('snake-head-right', 'snake-head-left', 'snake-head-down', 'snake-head-up');
        switch (this.direction) {
            case "r":
                head.classList.add('snake-head-right');
                break;
            case "l":
                head.classList.add('snake-head-left');
                break;
            case "d":
                head.classList.add('snake-head-down');
                break;
            case "u":
                head.classList.add('snake-head-up');
                break;
        }
    }
    snakeEatYourself() {
        let head = this.snakeBody.head;
        if (head.classList.contains('snake-tail')) {
            this.context.endGame();
        }
    }
}
class SnakePart {
    constructor(x, y, color) {
        this.elm = '';
        this.color = '';
        this.x = null;
        this.y = null;
        this.updatePart(x, y, color);
    }
    setColor(color = this.color) {
        /*this.elm.style.backgroundColor = color;
    
        this.color = color;*/
    }
    updatePart(x, y, color) {
        this.x = x;
        this.y = y;
        this.elm = document.querySelector(`[posX = "${x}"][posY = "${y}"]`);
        this.setColor(color);
    }
}
