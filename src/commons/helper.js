var angular = require('angular');
var helperService = angular.module('helperService', ['Interstellar']);
helperService.service('helper', function(interstellarSet) {
    return {
            'gotoBehavior': function(element, index) {
                if (element.val().trim() !== ''){
                    return;
                }
                // 需要进行 Behavior 判断
                interstellarSet.replace(index, {
                    'type': 'behavior',
                    'name': '动作（行为）'
                });
            },
            'focusNode': function (nextNode){
                //移动光标
                window.setTimeout(function(){
                    var sel, range;
                    if (window.getSelection && document.createRange) {
                        range = document.createRange();
                        range.selectNodeContents(nextNode);
                        range.collapse(false);
                        sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    } else if (document.body.createTextRange) {
                        range = document.body.createTextRange();
                        range.moveToElementText(nextNode);
                        range.collapse(false);
                        range.select();
                    }
                }, 1);
            }
    };
});
module.exports = helperService;
