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
        witchIsTurn: false, // falseが黒のターン, trueが白のターン
        debug: false,
        putedHistory: [],
    },
    // キャメルケース、重めの処理やdataの書き換えに使う
    methods:
    {
        debugChange: function()
        {
            this.debug = !this.debug;
        },
        getBoard: function(line, row)
        {
            if (this.board[line][row]) {
                return this.board[line][row];
            } else {
                return '　';
            }
        },
        putStone: function(line, row)
        {
            if ('' === this.board[line][row]) {
                if (false === this.witchIsTurn) {
                    // this.board[line][row] = '○';
                    this.$set(this.board[line], row, STONE_CHARS['black']);
                } else {
                    this.$set(this.board[line], row, STONE_CHARS['white']);
                }
                this.witchIsTurn = !this.witchIsTurn;
            }
        },
    }
})