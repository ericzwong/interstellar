angular = require('angular');
helperService = require('./commons/helper');
ScenesLinker = require('./app/scenes');
ActionLinker = require('./app/action');
BehaviorLinker = require('./app/behavior');
ConverseLinker = require('./app/converse');
FigureLinker = require('./app/figure');
ListController = require('./app/list');
Interstellar = require('./app/interstellar');

// 定义一个用来确定 SHIFT 是否按下
INTERSTELLAR_SHIFT_KEY = false;

angular.module('myApp', ['helperService', 'Interstellar'])
.config(function(interstellarSetProvider) {
    if (localStorage.data) {
        interstellarSetProvider.init(JSON.parse(localStorage.data));
    } else {
        interstellarSetProvider.init([{'type': 'scenes', 'name': '情景', 'content': ''}]);
    }

})
.controller('SometingController', function($scope, interstellarSet, helper) {
})
.controller('ListController', ListController)
.controller('InterstellarController', function($scope, interstellarSet) {
    $scope.items = interstellarSet.getAll();

    $scope.focusIndex = interstellarSet.getFocus();

    $scope.$on('$focusChange', function() {
        $scope.focusIndex = interstellarSet.getFocus();
    });

    $scope.handleClickSvae = function() {
        var data = interstellarSet.getAll().map(function(item, index) {
            delete item.$$hashKey;
            return item;
        });
        localStorage.data = JSON.stringify(data);
    };
})
.directive('interstellarItem', ScenesLinker)
.directive('interstellarActionItem', ActionLinker)
.directive('interstellarFigureItem', FigureLinker)
.directive('interstellarConverseItem', ConverseLinker)
.directive('interstellarBehaviorItem', BehaviorLinker);

// 利用 jQuery 监听shift按钮
$(document).ready(function() {
    $(document).on('keydown', function(event) {
        if (event.keyCode === 16) {
            // 按下了 shift
            INTERSTELLAR_SHIFT_KEY = true;
        }
    });

    $(document).on('keyup', function(event) {
        if (event.keyCode === 16) {
            // 已经放开了 shift
            INTERSTELLAR_SHIFT_KEY = false;
        }
    });

    $(document).on('keyup', function(event) {
        //字数统计
        var count = 0;
        jQuery('.box').each(function(index, element){
            count += jQuery(element).val().length;
        });
        jQuery('#total').text(count);
    });
});
