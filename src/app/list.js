module.exports = function($scope, interstellarSet, helper) {
	$scope.items = interstellarSet.getAll();
	$scope.prompt = interstellarSet.get(interstellarSet.getFocus()).name;
	$scope.$on('$focusChange', function() {
		$scope.prompt = interstellarSet.get(interstellarSet.getFocus()).name;
	});

	$scope.handleClickGotoScenes = function(index) {
		// 这里可以修改的更好，不直接使用 jQuery ，而是在 Directive 当中完成
		var gotoElement = jQuery('.scenes').eq(index);

		jQuery(window).scrollTop(gotoElement.offset().top);
		gotoElement.focus();
	};
};
