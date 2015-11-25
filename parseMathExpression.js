
function startParseMathExpression(arr) {
    var i = 0;
    var expr, oper1;
    if (isTypeDefWord(arr[i].type)) {
        oper1 = arr[i + 1];
        expr = parseMathExpression(arr.slice(i + 3));
    } else if (arr[i].type == 'IDENTIFIER') {
        oper1 = arr[i];
        expr = parseMathExpression(arr.slice(i + 2));
    } else if (arr[i].type == '--') { // || arr[i + 1].type == 'INC'
        return {
            type: '--',
            oper1: arr[i + 1]
        }
    } else if (arr[i + 1].type == '--' || arr[i + 2].type == '++') {
        return
    }
    return {
        type: ':=',
        oper1: oper1,
        oper2: expr
    };
}

function parseMathExpression(arr) {
    var signPos = getNextSignWithoutBracesPos(arr, ['==', '&&']);
    if (signPos != null) {
        var arr1 = arr.slice(0, signPos);
        var arr2 = arr.slice(signPos + 1);
        var node = {
            type: arr[signPos].type,
            oper2: parseMathExpression(arr1),
            oper3: parseMathExpression(arr2)
        }
        return node;
    } else {
        signPos = getNextSignWithoutBracesPos(arr, ['+', '-']);
        if (signPos != null) {
            var arr1 = arr.slice(0, signPos);
            var arr2 = arr.slice(signPos + 1);
            var node = {
                type: arr[signPos].type,
                oper2: parseMathExpression(arr1),
                oper3: parseMathExpression(arr2)
            }
            return node;
        } else {
            signPos = getNextSignWithoutBracesPos(arr, ['*', '/']);
            if (signPos != null) {
                var arr1 = arr.slice(0, signPos);
                var arr2 = arr.slice(signPos + 1);
                var node = {
                    type: arr[signPos].type,
                    oper2: parseMathExpression(arr1),
                    oper3: parseMathExpression(arr2)
                }
                return node;
                } else {
                    if (arr[0].type == '(') {
                        var rightParPos = arr.length - 1;
                        return parseMathExpression(arr.slice(1, arr.length - 1));
                    } else if (arr[0].type == 'STRING' || arr[0].type == 'DOUBLE' || arr[0].type == 'INTEGER' || arr[0].type == 'BOOLEAN' || arr[0].type == 'IDENTIFIER') {
                        return arr[0];
                    
                }
            }
        }
    }
}