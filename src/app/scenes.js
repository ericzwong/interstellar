module.exports = function(interstellarSet, helper) {
    return {
        restrict: 'EA',
        replace: true,
        template: '<div class="box scenes" contenteditable="true">{{item.content}}</div>',
        link: function(scope, element, attributes) {

            if (attributes.isFocus == 'true') {
                helper.focusNode(element[0]);
            }

            element.on('keydown', function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();

                    if (INTERSTELLAR_SHIFT_KEY) {
                        // 创建相同的类型
                        interstellarSet.addR(parseInt(attributes.iiIndex, 10) + 1, {
                            'type': 'scenes',
                             'name': '情景',
                             'content': '  '
                        });
                        scope.$apply();
                    } else {
                        // 创建一个新的
                        if (element.text().trim() !== '') {
                            interstellarSet.addR(parseInt(attributes.iiIndex, 10) + 1, {
                                'type': 'action',
                                'name': '动作',
                                'content': '  '
                            });
                            scope.$apply();
                        }
                    }
                } else if (event.keyCode === 8) {

                    if (element.text().trim() === '') {
                        event.preventDefault();
                        // 如果不是第一个 Scenes 那么删除
                        if (parseInt(attributes.iiIndex, 10) !== 0) {
                            interstellarSet.remove(parseInt(attributes.iiIndex, 10));
                            // 因为不知道为什么 Angular 的 ng-repeat 在数据删除以后
                            // 并不会重新绘制 interstellarItem 所以需要手动FocusNode
                            helper.focusNode(jQuery('.box')[parseInt(attributes.iiIndex, 10) - 1]);
                            scope.$apply();
                        }
                    }
                }
            });

            element.on('input', function(event) {
                var data = interstellarSet.get(attributes.iiIndex);
                data.content = element.text().trim();
                interstellarSet.update(attributes.iiIndex, data);
            });

            element.on('focus', function(event) {
                interstellarSet.setFocus(attributes.iiIndex);
                scope.$apply();
            });
        }
    };
};
