const STONE_CHARS = {'black': '○', 'white': '●'};
const B = STONE_CHARS['black'];
const W = STONE_CHARS['white'];

new Vue({
    el: '#app-othello',
    // オブジェクトとして扱う（推奨されない使い方らしい）
    data: {
        // board[y][x]で取得できる
        board: [
            [ '', '', '', '', '', '', '',''],
            [ '', '', '', '', '', '', '',''],
            [ '', '', '', '', '', '', '',''],
            [ '', '', '', B, W, '', '',''],
            [ '', '', '', W, B, '', '',''],
            [ '', '', '', '', '', '', '',''],
            [ '', '', '', '', '', '', '',''],
            [ '', '', '', '', '', '', '',''],
        ],
        history: [],
        turn: false, // falseが黒のターン, trueが白のターン
        debug: false,
        auto: true,
    },
    // キャメルケース、dataの書き換えに使う
    methods:
    {
        debugChange: function()
        {
            this.debug = !this.debug;
        },
        printCell: function(y, x)
        {
            if (this.board[y][x]) {
                return this.board[y][x];
            } else {
                if (0 === this.countEightDirections(y, x)) {
                    return '　';
                } else {
                    return '・';
                }
            }
        },
        userInput: function(y, x) {
            if (this.auto) {
                this.putStone(y, x);
                this.putRandPosition();
            } else {
                this.putStone(y, x);
            }
        },
        putStone: function(y, x)
        {
            if (this.countEightDirections(y, x) > 0) {
                if (false === this.turn) {
                    this.reverseEightDirections(y, x);
                    this.$set(this.board[y], x, STONE_CHARS['black']);
                } else {
                    this.reverseEightDirections(y, x);
                    this.$set(this.board[y], x, STONE_CHARS['white']);
                }
                this.turn = !this.turn;
                this.history.push({y, x});
            }
        },
        /**
         * 現在の手番の石を表す文字を返す
         * 
         * @param {boolean} turn 
         * @return {char} 
         */
        whichIsTurn: function(turn)
        {
            if (turn) {
                return STONE_CHARS['white'];
            } 
            if (!turn) {
                return STONE_CHARS['black'];
            }
        },
        /**
         * そこに石を置いたら裏返る相手の石の数を返す
         * 8方向にcountArrow()関数を実行している
         * ただし、すでに石が置いてあったら0
         * 
         * @param {int} y 
         * @param {int} x 
         * @returns {int}
         */
        countEightDirections: function(y, x) {
            let count_value = 0;
            if ('' === this.board[y][x]) {
                for (let i=-1; i<=1; i++) {
                    for (let j=-1; j<=1; j++) {
                        if (0 === i) {
                            if (0 === j) {
                                continue;
                            }
                        }
                        count_value += this.countArrow(y, x, i, j);
                    }
                }
                return count_value;
            }
            return 0;
        },
        /**
         * 置く場所と方向を入力してその方向に、
         * いくつのひっくり返すことが出来る石があるかを返す
         * 
         * @param {int} y
         * @param {int} x
         * @param {int} y_direction
         * @param {int} x_direction
         * @returns int
         */
        countArrow: function(y, x, y_direction, x_direction) {
            let count_value = 0;
            let allyColor = this.whichIsTurn(this.turn);
            let y_check = y + y_direction;
            let x_check = x + x_direction;
            if (Math.abs(y_direction) > 1) {
                return 0;
            }
            if (Math.abs(x_direction) > 1) {
                return 0;
            }

            while (true) {
                if (y_check >= 8 || y_check < 0 || 
                        x_check >= 8 || x_check < 0) {
                    return 0;
                }
                if (allyColor === this.board[y_check][x_check]) {
                    return count_value;
                } else if ('' === this.board[y_check][x_check]) {
                    return 0;
                } else {
                    count_value += 1;
                    y_check += y_direction;
                    x_check += x_direction;
                    continue;
                }
            }
        },
        /**
         * 石を置いたときに、裏返す処理の部分
         * 8方向にreverseArrow()関数を実行している
         * ただし、すでに石が置いてあったら終了
         * 
         * @param {int} y 
         * @param {int} x 
         * @returns {int}
         */
        reverseEightDirections: function(y, x) {
            if ('' === this.board[y][x]) {
                for (let i=-1; i<=1; i++) {
                    for (let j=-1; j<=1; j++) {
                        if (0 === i) {
                            if (0 === j) {
                                continue;
                            }
                        }
                        if (this.reverseArrow(y, x, i, j)) {
                        };
                    }
                }
                return true;
            }
            return false;
        },
        /**
         * 置く場所と方向を入力してその方向に、
         * 実際に石を裏返していく
         * 
         * @param {int} y
         * @param {int} x
         * @param {int} y_direction
         * @param {int} x_direction
         * @returns {int}
         */
        reverseArrow: function(y, x, y_direction, x_direction) {
            let board_temp = return2DConcat(this.board);
            let allyColor = this.whichIsTurn(this.turn);
            let y_check = y + y_direction;
            let x_check = x + x_direction;
            if (Math.abs(y_direction) > 1) {
                return false;
            }
            if (Math.abs(x_direction) > 1) {
                return false;
            }

            while (true) {
                if (y_check >= 8 || y_check < 0 ||
                        x_check >= 8 || x_check < 0) {
                    return false;
                }
                if (allyColor === this.board[y_check][x_check]) {
                    this.board = board_temp;
                    return true;
                } else if ('' === this.board[y_check][x_check]) {
                    return false;
                } else {
                    board_temp[y_check][x_check] = allyColor;
                    y_check += y_direction;
                    x_check += x_direction;
                    continue;
                }
            }
        },
        /**
         * ランダムな場所に置く
         */
        putRandPosition: function() {
            let array = this.putAbleCoord();
            let randomPosition = returnRndValue(array.length);
            this.putStone(array[randomPosition].x, array[randomPosition].y);
        },
        /**
         * 現在置くことが出来るすべての座標の列挙し、配列にして返す
         */
        putAbleCoord: function() {
            let return_array = [];
            for (let i=0; i<=7; i++) {
                for (let j=0; j<=7; j++) {
                    if (this.countEightDirections(i, j) > 0) {
                        return_array.push({x:i,y:j});
                    }
                }
            }
            return return_array;
        },
        /**
         * その石の色すべての座標の列挙し、配列にして返す
         */
        stoneCoord: function(color) {
            let return_array = [];
            for (let i=0; i<=7; i++) {
                for (let j=0; j<=7; j++) {
                    if (color === this.board[i][j]) {
                        return_array.push({x:i,y:j});
                    }
                }
            }
            return return_array;
        },
    },
})


/**
 * numまでのランダムな値を返す
 */
function returnRndValue(value)
{
    return Math.floor(Math.random() * value);
}

/**
 * 2次元配列を複製し複製元に影響が出ないように
 * 返す
 */
function return2DConcat(array)
{
    let array_copy = [];
    for (let i=0; i<array.length; i++) {
        array_copy.push(array[i].concat());
    }
    return array_copy;
}