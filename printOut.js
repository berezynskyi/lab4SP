function writeNodeToStr(obj, res, str1) {

    console.log(res)
    console.log(obj)

    if (obj.oper2 || obj.type == '--' || obj.type == '++') {
        res.str += '<br>' + str1 + obj.type;

        var str = '';
        for (var i = 0; i < str1.length; i++) {
            str += ' ';
        };
        var str_ = str + '|' + '____';
        var str_1 = '----';
        if (obj.oper1) {
            res.str += str_1 + obj.oper1.symbol;
        }
        if (obj.oper2) {
            writeNodeToStr(obj.oper2, resStr, str_);
        }
        if (obj.oper3) {
            writeNodeToStr(obj.oper3, resStr, str_);
        }
    } else if (obj.symbol) {
        for (var i = res.str.length - 1; i >= 0; i--) {
            if (res.str[i] == '-'){
                    res.str += '<br>' + str1 + obj.symbol;
                    break;
            } 
            if (res.str[i] == '_'){
                    res.str += '----'+ obj.symbol;
                    break;
            } 
    }
        };


}