module.exports = function(interstellarSet, helper) {
    return {
        restrict: 'EA',
        replace: true,
        template: '<input class="box figure" ng-model="item.content"></div>',
        link: function(scope, element, attributes) {

			if (attributes.isFocus == 'true') {
				element.focus();
			}

			element.on('keydown', function(event) {
				if (event.keyCode === 13) {
					event.preventDefault();

					if (INTERSTELLAR_SHIFT_KEY) {
						// 创建相同的类型
						interstellarSet.addR(parseInt(attributes.iiIndex, 10) + 1, {
							'type': 'figure',
							 'name': '角色',
							 'content': ''
						});
						return scope.$apply();
					}

					if (element.val().trim() === '') {
						helper.gotoBehavior(element, attributes.iiIndex);
						return scope.$apply();
					}

					if (element.val().trim() !== '') {
						// 创建一个 Converse
						interstellarSet.addR(parseInt(attributes.iiIndex, 10) + 1, {
							'type': 'converse',
							'name': '对话',
                            'content': ''
						});
						scope.$apply();
					}
				} else if (event.keyCode === 8) {
					// 如果 content 是空的，那么就删除
					if (element.val().trim() === '') {
						event.preventDefault();
						interstellarSet.remove(parseInt(attributes.iiIndex, 10));
						// 因为不知道为什么 Angular 的 ng-repeat 在数据删除以后
						// 并不会重新绘制 interstellarItem 所以需要手动FocusNode
						jQuery('.box').eq(parseInt(attributes.iiIndex, 10) - 1).focus();
						scope.$apply();
					}
				}
			});
            
			element.on('focus', function(event) {
				interstellarSet.setFocus(attributes.iiIndex);
				scope.$apply();
			});
		}
    };
};
