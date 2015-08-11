module.exports = function(interstellarSet, helper) {
    return {
        restrict: 'EA',
        replace: true,
        template: '<input class="box action" ng-model="item.content"/>',
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
							'type': 'action',
							 'name': '动作',
							 'content': ''
						});
						scope.$apply();
					} else {
						// 创建一个Figure
						if (element.val().trim() !== '') {
							interstellarSet.addR(parseInt(attributes.iiIndex, 10) + 1, {
								'type': 'figure',
								'name': '角色',
                                'content': ''
							});
							scope.$apply();
						} else {
							// 替换为 scenes
							interstellarSet.replace(attributes.iiIndex, {
								'type': 'scenes',
								'name': '场景',
								'content': ''
							});
							scope.$apply();
						}
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
