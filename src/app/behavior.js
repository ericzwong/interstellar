module.exports =  function(interstellarSet, helper) {
    return {
        restrict: 'EA',
        replace: true,
        template: '<div class="box behavior" contenteditable="true">{{item.content}}</div>',
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
							'type': 'action',
							 'name': '动作',
							 'content': '  '
						});
						return scope.$apply();
					}

					// 如果回车的时候还是空白的
					//
					if (element.text().trim() !== ''){
						// 创建一个Figure
						interstellarSet.replace(attributes.iiIndex, {
							'type': 'action',
							'name': '动作',
							'content': element.text().trim()
						});
						// 创建一个Figure
						interstellarSet.addR(parseInt(attributes.iiIndex, 10) + 1, {
							'type': 'figure',
							'name': '角色',
                            'content': '  '
						});
						scope.$apply();

					} else {
						// 替换为 scenes
						interstellarSet.replace(attributes.iiIndex, {
							'type': 'scenes',
							'name': '场景',
							'content': '  '
						});
						scope.$apply();
					}
				} else if (event.keyCode === 8) {
					// 如果 content 是空的，那么就删除
					if (element.text().trim() === '') {
						event.preventDefault();
						interstellarSet.remove(parseInt(attributes.iiIndex, 10));
						// 因为不知道为什么 Angular 的 ng-repeat 在数据删除以后
						// 并不会重新绘制 interstellarItem 所以需要手动FocusNode
						helper.focusNode(jQuery('.box')[parseInt(attributes.iiIndex, 10) - 1]);
						scope.$apply();
					}
				}
			});
		}
    };
};
