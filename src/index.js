module.exports = function solveSudoku(matrix) {
    // your solution
    function cloning(mtx) {
        //1 - значение задано изначально
        //2 - решение подбирается
        //3 - подобрано нами
        //arr[i][j] = [[значение][сатус клетки(выше)][массив возможных значений]]
        var arr = [];
        var temp = [  1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        for (var i = 0; i < 9; i++) {
            arr[i] = [];
            for (var j = 0; j < 9; j++) {
                if (mtx[i][j]) {
                    arr[i][j] = [mtx[i][j], 1, []];
                } else {
                    arr[i][j] = [0, 2, temp];
                }
            }
        }
        return arr;
    }

    function DeleteSimilar(ar1, ar2){
        var temp = [];
        for (var z = 0; z < ar1.length; z ++){
            var find = false;
            for (var p =0; p < ar2.length; p++)
            {
                if (ar1[z] == ar2[p])
                {
                    find = true;
                    break;
                }
            }
            if (!find)
            {
                temp.push(ar1[z]);
            };
        }
        return temp;
    }

    function row(mtx,index){
        var temp = [];
        for (var z = 0; z < 9; z++)
        {
            if (mtx[index][z][1] != 2)
            {
                temp.push(mtx[index][z][0]);
            }
        }
        return temp;
    }

    function column(mtx, index){
        var temp = [];
        for (var z = 0; z < 9; z++)
        {
            if (mtx[z][index][1] != 2)
            {
                temp.push(mtx[z][index][0]);
            }
        }
        return temp;
    }

    function square(mtx, i, j){
        var number = [];
        var temp = [];
        if (i < 3)
        {
            number[0] = 1;
        }
        else if (i > 2 && i < 6)
        {
            number[0] = 2;
        }
        else if (i > 5 && i < 9)
        {
            number[0] = 3;
        };
        if (j < 3)
        {
            number[1] = 1;
        }
        else if (j > 2 && j < 6)
        {
            number[1] = 2;
        }
        else if (j > 5 && j < 9)
        {
            number[1] = 3;
        };
        for (var ii = number[0]*3-3; ii < number[0]*3; ii++)
        {
            for (var jj = number[1]*3-3; jj < number[1]*3; jj++)
            {
                if (mtx[ii][jj][1] != 2)
                {
                    temp.push(mtx[ii][jj][0]);
                }
            }
        }
        return temp;

    }

    function main( mtx) {
        var final = cloning(mtx);
        for (var i = 0; i < 9; i++)
        {
            for (var j = 0; j < 9; j++)
            {
                if (final[i][j][1] == 2)
                {
                    final[i][j][2] = DeleteSimilar(final[i][j][2], row(final,i));
                    final[i][j][2] = DeleteSimilar(final[i][j][2], column(final,i));
                    final[i][j][2] = DeleteSimilar(final[i][j][2], square(final,i,j));
                    if (final[i][j][2].length == 1)
                    {
                        final[i][j][0] = final[i][j][2][0];
                        final[i][j][1] = 3;
                    }
                }
            }
        }
        var ret = [];
        for (var i = 0; i < 9; i++)
        {
            ret[i] = []
            for (var j = 0; j < 9; j++)
            {
                ret[i][j] == final[i][j][0];
            }
        }
        return ret;
    }

    main(matrix);
}
