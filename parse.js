
function parseStmnt(arr, parent) {
    var i = 0;

    if (isTypeDefWord(arr[i].type) || arr[i].type == 'IDENTIFIER' || arr[i].type == 'DEC') {
        var exprEndIndex = getNextSemicolonPos(arr, i, arr.length);
        parent.nodes.push(startParseMathExpression(arr.slice(i, exprEndIndex)));
        i = exprEndIndex + 1;
    } else if (arr[i].type == 'FOR') {

    } else if (arr[i].type == 'DO') {
        if (arr[i + 1].type == 'LCBR') {
            var bodyEndIndex = getNextRightCBrace(arr, i + 2, arr.length);
            if (arr[bodyEndIndex + 1].type !== 'WHILE' || arr[bodyEndIndex + 2].type !== 'LPAR') return;
            var exprEndIndex = getNextRightParances(arr, bodyEndIndex + 3, arr.length);
            var node = {
                type: "DO",
                expr: parseTestExpression(arr.slice(bodyEndIndex + 3, exprEndIndex)),
                nodes: []
            };
            parseStmnt(arr.slice(i + 2, bodyEndIndex), node);

            parent.nodes.push(node);
            i = exprEndIndex + 2;
        }

    } else if (arr[i].type == 'RET') {

    }
    if (i != arr.length) {
        parseStmnt(arr.slice(i), parent);
    }
}




function getNextSignWithoutBracesPos(arr, signArr) {
    var openedBraces = 0;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < signArr.length; j++) {
            if (arr[i].type == signArr[j] && openedBraces == 0) {
                return i;
            } else if (arr[i].type == '(') {
                openedBraces++;
            } else if (arr[i].type == ')') {
                openedBraces--;
            }
        };
    };
    return null;
}

function parseTokens(tokens) {
    var node = {
        type: "STMNT",
        nodes: []
    };
    parseStmnt(tokens, node);
    return node;
}


function parseStatement(str) {
    var chars = str.split(" ");
    var i = 0;
    while (i < chars.length) {
        var j = 0;
        while (j < chars[i].length) {
            var str = chars[i][j] + chars[i][j + 1];
            if (isSpecSymbol_(str)) {
                var a, b;
                if (j == 0) {
                    if (chars[i].length == 2) break;
                    a = chars[i].substr(0, 2);
                    b = chars[i].substr(2);
                } else {
                    a = chars[i].substring(0, j);
                    b = chars[i].substring(j);
                }
                chars[i] = a;
                chars.splice(i + 1, 0, b);
                break;
            } else {
                var str2 = chars[i][j];
                if (isSpecSymbol_(str2)) {
                    var a, b;
                    if (j == 0) {
                        if (chars[i].length == 1) break;
                        a = chars[i].substr(0, 1);
                        b = chars[i].substr(1);
                    } else {
                        a = chars[i].substring(0, j);
                        b = chars[i].substring(j);
                    }
                    chars[i] = a;
                    chars.splice(i + 1, 0, b);
                    break;
                }

                j++;
            }
        };
        i++;
    };
    return chars;
}

