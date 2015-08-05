describe('MapController', function() {

    var controllerScope;

    beforeEach(module("webApp"));

    beforeEach(inject(function($controller, $rootScope) {
        controllerScope = $rootScope.$new();
        $controller('MapController', {
            $scope: controllerScope
        });
    }));

    it('will succeed', function(){

        expect(true).toBe(true);
    });
});