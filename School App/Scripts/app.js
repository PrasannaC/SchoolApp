
var app = angular.module('app', []); 


app.controller("myController", function ($window, $scope) {
    


    function submit() {

    }
    

});



app.directive("msgFile", function () {
    return {
        restrict: 'E',
        templateUrl: 'Template.html'
    };
});


app.directive('msgPropover', ['$compile', '$timeout', function ($compile, $timeout) {
    return {
        scope: {
            msgPropover: '=',
            customclass: '@',
            trigger: '@',
            ishtml: '=',
            placement: '@',
            content: '@',
            formfield: '='
        },
        link: function (scope, element) {
            var options = {
                trigger: scope.trigger ? scope.trigger : 'focus',
                html: (scope.ishtml || scope.ishtml == false) ? scope.ishtml : true,
                placement: scope.placement ? scope.placement : 'top',
                contentmsg: scope.content ? scope.content : $compile('<msg-File></msg-File>')(scope)
            }
            var customclass = scope.customclass ? scope.customclass : 'errormsg';
            scope.$watch('msgPropover', function (newVal, oldVal) {
                if (newVal) {
                    $timeout(function () {
                        if (element[0].attributes.content != undefined)
                            options.content = element[0].attributes.content.nodeValue;
                        if (options.content == undefined || options.content == '')
                            options.content = options.contentmsg;

                        element.popover(options);
                        element.popover('show');
                        $('#' + element[0].nextSibling.id).addClass(customclass);
                        element.popover('show');
                    });
                }
                else {
                    element.popover('destroy');
                }
            });
        }
    }
}]);
