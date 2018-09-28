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

//метод скрытый одиночка
function HidenSolo(final){
    let changed = true;
    while (changed)
    {
    changed = false;
        for (let i = 0; i < 9; i++) //перебираем элементы
        {
            for (let j = 0; j < 9; j++)
            {
                if (final[i][j][1] == 1) continue; //исключаем те которые уже решены
                let length = final[i][j][2].length;
                let found = false;
                for (let p = 0; p < length; p++) // перебираем элементы нужной цифры
                {
                    if (found) break;
                    let solo = true;
                    let number = final[i][j][2][p];
                    for (let z = 0; z < 9; z++) //ищем есть ли такой элемент в другом массиве элемента строки
                    {
                        if (final[i][z][1] == 1) continue;
                        if (z == j) continue;
                        let solution = 0;
                        let length2 = final[i][z][2].length;
                        for (let t = 0; t < length2; t++)
                        {
                            if (number == final[i][z][2][t])
                            {

                                solo = false;
                            };
                        };
                    }
                    if (solo) //проверка на уникальность
                    {
                        final[i][j][0] = number;
                        final[i][j][1] = 1;
                        final = DeleteElement(final, number, i, j);
                        found = true;
                        changed = true;
                    }
                    else
                    {
                        solo = true;
                        for (let z = 0; z < 9; z++) //ищем есть ли такой элемент в другом массиве элемента столбца
                        {
                            if (final[z][j][1] == 1) continue;
                            if (z == i) continue;
                            let length2 = final[z][j][2].length;
                            for (let t = 0; t < length2; t++)
                            {
                                if (number == final[z][j][2][t])
                                {
                                    solo = false;
                                };
                            };
                        }
                        if (solo) //проверка на уникальность
                        {
                            final[i][j][0] = number;
                            final[i][j][1] = 1;
                            final = DeleteElement(final, number, i, j);
                            found = true;
                            changed = true;
                        }
                        else {
                            solo = true;
                            let square = [];
                            square = getsquare(i,j);
                            let lefti = square[0]*3-3,
                                righti = square[0]*3,
                                leftj = square[1]*3-3,
                                rightj = square[1]*3;
                            for (let ii = lefti; ii < righti; ii++)
                            {
                                for (let jj = leftj; jj < rightj; jj++)
                                {
                                    if ((ii == i) && (jj == j)) continue;
                                    if (final[ii][jj][1] == 1) continue;
                                    let length2 = final[ii][jj][2].length;
                                    for (let t = 0; t < length2; t++)
                                    {
                                        if (number == final[ii][jj][2][t])
                                        {
                                            solo = false;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (solo) //проверка на уникальность
                            {
                                final[i][j][0] = number;
                                final[i][j][1] = 1;
                                final = DeleteElement(final, number, i, j);
                                found = true;
                                changed = true;
                            };
                            //добавить квадраты
                        }
                    }
                }
            }
        }
    }
    return final;
}

//просто смотрим решится ли судоку, если мы перебирём все возможные варианта какого-нибудь числа
function Guessing(final){
    let mtx;
    mtx = copy(final);
    for (let i = 0; i < 9; i++)
    {
        for (let j = 0; j < 9; j++)
        {
            if (final[i][j][1] == 2)
            {
                    length = final[i][j][2].length;
                for (let p = 0; p < length; p++)
                {
                    final[i][j][0] = final[i][j][2][p];
                    final[i][j][1] = 1;
                    final = SolveSolo(final);
                    final = HidenSolo(final);
                    if (issolved(final)) return final;
                    final = copy(mtx);
                }
            }
        }
    }
    return final; //решение не подобрано
}

function DoubleGuessing(final){
    let mtx;
    mtx = copy(final);
    for (let i = 0; i < 9; i++)
    {
        for (let j = 0; j < 9; j++)
        {
            if (final[i][j][1] == 2)
            {
                    length = final[i][j][2].length;
                for (let p = 0; p < length; p++)
                {
                    final[i][j][0] = final[i][j][2][p];
                    final[i][j][1] = 1;
                    final = SolveSolo(final);
                    final = HidenSolo(final);
                    final - Guessing(final);
                    if (issolved(final)) return final;
                    final = copy(mtx);
                }
            }
        }
    }
    return final; //решение не подобрано
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

//проверяет решено ли судоку
function issolved(mtx){
    let ex = [1,2,3,4,5,6,7,8,9];
    let line = [];
    let column = [];
    for (let i = 0; i < 9; i++)
    {
        for (let j = 0; j < 9; j++)
        {
            line.push(mtx[i][j][0]);
            column.push(mtx[j][i][0]);
        };
        line.sort(compareNumbers);
        column.sort(compareNumbers);
        let condition_1 = true,
            condition_2 = true;
        for (let p = 0; p < 9; p++)
        {
            if (ex[p] != line[p]) condition_1 = false;
            if (ex[p] != column[p]) condition_2 = false;
        }
        if (!condition_1 || !condition_2) return false;
        line = [];
        column = [];
    }
    return true;
}

//сравнение чисел для сортировки
function compareNumbers(a, b) {
  return a - b;
}

//функция копирования рабочей матрицы
function copy (fromar){
    let toar = [];
    for (let i = 0; i < 9; i++)
    {
        toar[i] = [];
        for (let j = 0; j < 9; j++)
        {
            toar[i][j] = [];
            toar[i][j][0] = fromar[i][j][0];
            toar[i][j][1] = fromar[i][j][1];
            if (fromar[i][j][1] == 2)
            {
                let length = fromar[i][j][2].length;
                toar[i][j][2] = [];
                for (let z = 0; z < length; z++)
                {
                    toar[i][j][2].push(fromar[i][j][2][z]);
                }
            }
            else {
                toar[i][j][2] = [];
            }
        }
    }
    return toar;
}

//главная выполняющая фуекция (перенести позже в солвсудоку)
function main(matrix) {
    let final = cloning(matrix);
    final = SolveSolo(final);
    final = HidenSolo(final);
    if (!issolved(final))
    {
        final = Guessing(final);
    };
    if (!issolved(final))
    {
        final = DoubleGuessing(final);
    }
    final = unpack(final);
    return final;
}

//удаляет число element из массивов элементов строки столбца и квадрата элемента
//и ж в матрице final
function DeleteElement(final, element, i, j){
    //deleting from line
    for (let z = 0; z < 9; z++) // преребираем элементы строки
    {
        if (final[i][z][1] == 1) continue;
        let length = final[i][z][2].length;
        for (let p = 0; p < length; p++) //перебираем массив элемента
        {
            if (element == final[i][z][2][p])
            {
                final[i][z][2].splice(p,1);
                break;
            }
        }
    }
    //deleting from column
    for (let z = 0; z < 9; z++) // преребираем элементы строки
    {
        if (final[z][j][1] == 1) continue;
        let length = final[z][j][2].length;
        for (let p = 0; p < length; p++) //перебираем массив элемента
        {
            if (element == final[z][j][2][p])
            {
                final[z][j][2].splice(p,1);
                break;
            }
        }
    }
    //deleting from square
    let square = getsquare(i,j);
    let lefti = square[0]*3-3,
        righti = square[0]*3,
        leftj = square[1]*3-3,
        rightj = square[1]*3;
    for (let ii = lefti; ii < righti; ii++)
    {
        for (let jj = leftj; jj < rightj; jj++)
        {
            if ((ii == i) && (jj == j)) continue;
            if (final[ii][jj][1] == 1) continue;
            let length = final[ii][jj][2].length;
            for (let p = 0; p < length; p++) //перебираем массив элемента
            {
                if (element == final[ii][jj][2][p])
                {
                    //console.log("square");
                    final[ii][jj][2].splice(p,1);
                    break;
                }
            }
        }
    }
    return final;
}

module.exports = function solveSudoku(matrix) {
    // your solution
    return main(matrix);
}
