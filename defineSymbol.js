function isSpecSymbol(str) {
    for (key in keyWordEnum) {
        if (keyWordEnum[key] == str) return key;
    }
    return null;
}

function isOperSymbol(str) {
    switch (str) {
        case '==':
            return true;
        case '=':
            return true;
        case '+':
            return true;
        case '-':
            return true;
        case '*':
            return true;
        case '/':
            return true;
        default:
            return false;
    }
}

function isSpecSymbol_(str) {
    switch (str) {
        case '(':
            return true;
        case ')':
            return true;
        case '{':
            return true;
        case '}':
            return true;
        case ';':
            return true;
        case '==':
            return true;
        case ':=':
            return true;
        case '--':
            return true;
        case '=':
            return true;
        case '+':
            return true;
        case '-':
            return true;
        case '*':
            return true;
        case '/':
            return true;
        case '<':
            return true;
        case '>':
            return true;
        default:
            return false;
    }
}

function isKeyWord(str) {
    switch (str) {
        case 'if':
            return keyWordEnum.IF;
        case 'else':
            return true;
        case 'for':
            return true;
        case 'while':
            return true;
        case 'int':
            return true;
        case 'double':
            return true;
        case 'string':
            return true;
        case 'boolean':
            return true;
        case 'sin':
            return true;
        default:
            return null;
    }
}

function isStringConst(str) {
    if (str[0] === '"' && str[str.length - 1] === '"') {
        return true;
    } else {
        return false;
    }
}

function isDouble(str) {
    return str.match(/^[0-9]+\.{1}[0-9]+$/) != null;
}

function isInt(str) {
    return str.match(/^[0-9]+[0-9]*[0-9]*$/) != null
}

function isBoolean(str) {
    return (str === "true" || str === "false");
}

function isIdentifier(str) {
    return str.match(/([a-z]|[A-Z]|[_&]+)(\w|\&*)(\w|\&*)/) != null;
}


function isTypeDefWord(enm) {
    if (enm == 'INT_TYPE' || enm == 'DOUBLE_TYPE' || enm == 'BOOLEAN_TYPE' || enm == 'STRING_TYPE') {
        return true
    } else {
        return false
    }
}

function getNextSemicolonPos(arr, indexB, endexE) {
    for (var i = indexB; i <= endexE; i++) {
        if (arr[i].type == ';') return i;
    };
    return null;
}

function getNextRightParances(arr, iBegin, iEnd) {
    var parCount = 0;
    for (var i = iBegin; i <= iEnd; i++) {
        if (arr[i].type == '(') {
            parCount++;
        } else if (arr[i].type == ')') {
            if (parCount == 0) {
                return i;
            } else {
                --parCount;
            }
        }
    };
}

function getNextRightCBrace(arr, iBegin, iEnd) {
    var parCount = 0;
    for (var i = iBegin; i <= iEnd; i++) {
        if (arr[i].type == '{') {
            parCount++;
        } else if (arr[i].type == '}') {
            if (parCount == 0) {
                return i;
            } else {
                --parCount;
            }
        }
    };
}



function getTokens(lexemsArr) {
    var resArr = [];
    for (var i = 0; i < lexemsArr.length; i++) {
        var type;
        if (isSpecSymbol(lexemsArr[i])) {
            type = isSpecSymbol(lexemsArr[i])
        } else if (isStringConst(lexemsArr[i])) {
            type = "STRING";
        } else if (isDouble(lexemsArr[i])) {
            type = "DOUBLE";
        } else if (isInt(lexemsArr[i])) {
            type = "INTEGER";
        } else if (isBoolean(lexemsArr[i])) {
            type = "BOOLEAN";
        } else if (isIdentifier(lexemsArr[i])) {
            type = "IDENTIFIER";
        } else {
            type = null;
        }

        resArr.push({
            symbol: lexemsArr[i],
            type: type
        });
    }

    return resArr;
}
