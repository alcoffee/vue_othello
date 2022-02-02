const stone_chars = {'black': '●', 'white': '○'};
const b = stone_chars['black'];
const w = stone_chars['white'];

new Vue({
    el: '#app-othello',
    // オブジェクトとして扱う（推奨されない使い方らしい）
    data: {
        board: [
            [ '', '', '', '', '', '', '',''],
            [ '', '', '', '', '', '', '',''],
            [ '', '', '', '', '', '', '',''],
            [ '', '', '', b, w, '', '',''],
            [ '', '', '', w, b, '', '',''],
            [ '', '', '', '', '', '', '',''],
            [ '', '', '', '', '', '', '',''],
            [ '', '', '', '', '', '', '',''],
        ],
        witch_is_turn: false, // falseが黒のターン, trueが白のターン
        debug: false,
    },
    // https://dev83.com/vue-computed-methods/
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
                return '　　';
            }
        },
        putStone: function(line, row)
        {
            if (false === this.witch_is_turn) {
                // this.board[line][row] = '○';
                this.$set(this.board[line], row, stone_chars['black']);
            } else {
                this.$set(this.board[line], row, stone_chars['white']);
            }
            this.witch_is_turn = !this.witch_is_turn;
        },
    },
})