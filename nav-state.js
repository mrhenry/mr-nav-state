import { Component, Inject } from 'fd-angular-core';

@Component({
	template: false,
	restrict: 'A',
	scope: {
		match: '=mrNavState'
	},
})
@Inject('$element', '$location', '$scope', '$timeout')
export class MrNavStateController {

	constructor($element, $location, $scope, $timeout) {
		this.$element = $element;
		this.$location = $location;
		this.strict = !(typeof this.$element.attr('mr-nav-state-strict') === 'undefined');

		$timeout(() => this.update(), 16);

		$scope.$evalAsync(
			() => this.update());

		$scope.$on('$locationChangeSuccess',
			() => this.update());
	}

	update() {
		let match = this.match || this.$element.find('[href]').attr('href');
		let url = this.$location.url();

		if (this.strict) {
			this.$element.toggleClass('is-active', url === match);
		} else {
			let validNextCharacters = [undefined, '?', '/', '#'];
			this.$element.toggleClass('is-active', url.indexOf(match) === 0 && validNextCharacters.indexOf(url[match.length]) > -1);
		}
	}

}
