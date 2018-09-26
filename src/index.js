//создаёт массив для работы (одноразовая функция)
function cloning(mtx) {
    //1 - решение есть
    //2 - решение подбирается
    //arr[i][j] = [[значение][сатус клетки(выше)][массив возможных значений]]
    let arr = [];
    let temp = [  1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    for (let i = 0; i < 9; i++) {
        arr[i] = [];
        for (let j = 0; j < 9; j++) {
            if (mtx[i][j]) {
                arr[i][j] = [mtx[i][j], 1, []];
            } else {
                arr[i][j] = [0, 2, temp];
            }
        }
    }
    return arr;
}

//принимает два массива и из первого убирает значения которые есть во втором
function DeleteSimilar(ar1, ar2){
    let temp = [];
    let find;
    for (let z = 0; z < ar1.length; z ++){
        find = false;
        for (let p =0; p < ar2.length; p++)
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

//получает все значения которые уже установлены в матрице и индекс строке
function row(mtx,index){
    let temp = [];
    for (let z = 0; z < 9; z++)
    {
        if (mtx[index][z][1] != 2)
        {
            temp.push(mtx[index][z][0]);
        }
    }
    return temp;
}

//получает все значения которые уже установлены в матрице и индекс столбце
function column(mtx, index){
    let temp = [];
    for (let z = 0; z < 9; z++)
    {
        if (mtx[z][index][1] != 2)
        {
            temp.push(mtx[z][index][0]);
        }
    }
    return temp;

}

//возврщает массив в котором [0] номер строки квадратов (0,1,2) и [1] номер столбца квадрата
function getsquare(i,j){
    let number = [];

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
    return number;
}

//получает все значения которые уже установлены в матрице в квадрате элемента и ж
function square(mtx, i, j){
    let number = getsquare(i,j);
    let temp = [];

    for (let ii = number[0]*3-3; ii < number[0]*3; ii++)
    {
        for (let jj = number[1]*3-3; jj < number[1]*3; jj++)
        {
            if (mtx[ii][jj][1] != 2)
            {
                temp.push(mtx[ii][jj][0]);
            }
        }
    }
    return temp;
}

//решает очевидные элементы(которые не имеют другого выбора)
function SolveSolo(final){
    let changed = true;

    while (changed)
    {
        changed = false;
        for (let i = 0; i < 9; i++)
        {
            for (let j = 0; j < 9; j++)
            {
                if (final[i][j][1] == 2)
                {
                    final[i][j][2] = DeleteSimilar(final[i][j][2], row(final,i));
                    final[i][j][2] = DeleteSimilar(final[i][j][2], column(final,j));
                    final[i][j][2] = DeleteSimilar(final[i][j][2], square(final,i,j));
                    if (final[i][j][2].length == 1)
                    {
                        final[i][j][0] = final[i][j][2][0];
                        final[i][j][1] = 3;
                        changed = true;
                    }
                }
            }
        }
    }
    return final;
}

//делает из нашей рабочей матрицы "выходную"
function unpack(final){
    let ret = [];
    for (let i = 0; i < 9; i++)
    {
        ret[i] = [];
        for (let j = 0; j < 9; j++)
        {
            ret[i][j] = final[i][j][0];
        }
    }
    return ret;
}

//проверяет решено ли судоку (не работает)
function issolved(mtx){
    let full = [1,2,3,4,5,6,7,8,9];
    for (let i = 0; i < 9; i++)
    {
        let condition_1 = (DeleteSimilar(full,row(mtx,i)) == [])
        //console.log (condition_1);
        /*
            DeleteSimilar(full,row(mtx,i)) = [];
            condition_1 = false;
            ???
        */
        let condition_2 = (DeleteSimilar(full,column(mtx,i)) == [])
        if (!condition_1 || !condition_2)
        {
            return false;
        }
    }
    for (let i = 0; i < 9; i +=3)
    {
        for (let j = 0; j < 9; j+=3)
        {
            let condition = (DeleteSimilar(full,square(mtx,i,j)) == [])
            {
                if (!condition) return false;
            }
        }
    }
    return true;
}

//главная выполняющая фуекция (перенести позже в солвсудоку)
function main(matrix) {
    let final = cloning(matrix);
    final = SolveSolo(final);

    // if (issolved(final))
    // {
    //     console.log("solved");
    // }
    // else
    // console.log("not_solved");
    final = unpack(final);

    return final;
}



module.exports = function solveSudoku(matrix) {
    // your solution

    return main(matrix);
}
