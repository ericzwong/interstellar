var angular = require('angular');

var Interstellar = angular.module('Interstellar', []);
Interstellar.provider('interstellarSet', function() {

	var data = [];
	var focusIndex = 0;
	var name = '';

	return {
		init: function(argData) {
				data = argData;
		},
		$get: function($rootScope) {

			return {
				getAll: function() {
					return data;
				},
				get: function(index) {
					return data[index];
				},
				add: function(argData) {
					// 更新焦点
					focusIndex = data.length;
					data.push(argData);
					$rootScope.$broadcast('$focusChange');
				},
				// addR 使用 Replace 的方式添加数据
				addR: function(index, argData) {
					focusIndex = index;
					data.splice(index, 0 , argData);
					$rootScope.$broadcast('$focusChange');
				},
				replace: function(index, behavior) {
					data.splice(index, 1 , behavior);
					$rootScope.$broadcast('$focusChange');
				},
				update: function(index, value) {
					data[index] = value;
				},
				remove: function(index) {
					focusIndex = index - 1;
					data[focusIndex].other = !data[focusIndex].other;
					data.splice(index, 1);
					$rootScope.$broadcast('$focusChange');
				},
				getName: function(){
					return name;
				},
				setName: function(argName) {
					name = argName;

					$rootScope.$broadcast('$nameChange');
				},
				getFocus: function() {
					return focusIndex;
				},
				setFocus: function(index) {
					focusIndex = index;
					$rootScope.$broadcast('$focusChange');
				}
			};
		}
	};
});
