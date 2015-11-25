//initialization of angular app
var app = angular.module('Lab4SP', []);


var resStr;
//initialization of angular controller
app.controller('lab4Ctrl', ['$scope', function($scope) {

$scope.strToParse = 'b:=0; n:=n; b:= b+a[n];';


$scope.submit = function(){

    var lexems = parseStatement($scope.strToParse);
    var tokens = getTokens(lexems);
    var parsed = parseTokens(tokens);

    resStr = {
        str: 'Result:'+'<br>'
    };

    for (var i = 0; i < parsed.nodes.length; i++) {
        writeNodeToStr(parsed.nodes[i], resStr, '');
    };

    var inner = document.getElementById("inner");
    inner.innerHTML = resStr.str;
}
}]);
