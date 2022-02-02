const STONE_CHARS = {'black': '●', 'white': '○'};
const B = STONE_CHARS['black'];
const W = STONE_CHARS['white'];

new Vue({
    el: '#app-othello',
    // オブジェクトとして扱う（推奨されない使い方らしい）
    data: {
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
    },
    // キャメルケース、dataの書き換えに使う
    methods:
    {
        debugChange: function()
        {
            this.debug = !this.debug;
        },
        printBoard: function(x, y)
        {
            if (this.board[x][y]) {
                return this.board[x][y];
            } else {
                return '　';
            }
        },
        putStone: function(x, y)
        {
            if (this.evaluationStealNumber(x, y) > 0) {
                if (false === this.turn) {
                    this.$set(this.board[x], y, STONE_CHARS['black']);
                } else {
                    this.$set(this.board[x], y, STONE_CHARS['white']);
                }
                this.turn = !this.turn;
                this.history.push({x, y});
            }
        },
        whitchIsTurnChar: function(turn)
        {
            if (turn) {
                return STONE_CHARS['black'];
            } 
            if (!turn) {
                return STONE_CHARS['white'];
            }
        },
        /**
         * そこに置いた時に相手の石をいくつ取れるかを、返す
         *  
         * @param int x
         * @param int y
         * @return int
         */
        evaluationStealNumber: function(x, y)
        {
            let stealAbleNum = 0;
            let opponentChar = this.whitchIsTurnChar(!this.turn);
            // まず石が既に置いてあったら置けない
            if (B === this.board[x][y]) {
                return 0;
            }
            if (W === this.board[x][y]) {
                return 0;
            }
            // 8方向に走らせてしまう
            for (let i=-1; i<=1; i++) {
                for (let j=-1; j<=1; j++) {
                    if (0 === i){
                        if (0 === j)
                            continue; // このままだと9方向なので
                    }
                    if ( x+i < 0) {
                        continue;
                    }
                    if ( y+j < 0) {
                        continue;
                    }
                    if ( x+i > 7) {
                        continue;
                    }
                    if ( x+i > 7) {
                        continue;
                    }
                    if (opponentChar === this.board[x+i][y+j]) {
                        stealAbleNum++;
                    }
                }
            }
            return stealAbleNum;
        }
    }
})