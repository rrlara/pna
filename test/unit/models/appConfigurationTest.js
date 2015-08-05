describe('AppConfiguration', function() {

    beforeEach(module("webApp"));

    //the factory under test to assert against
    var factoryUnderTest;

    beforeEach(inject(function(AppConfiguration){

        factoryUnderTest = AppConfiguration
    }));

    //assertions ....

    it('has the SpatialDev Mapbox Access Token defined for the app', function(){

        actualMapboxAccessToken = factoryUnderTest.mapBoxAccessToken;
        expectedMapBoxAccessToken = "pk.eyJ1Ijoic3BhdGlhbGRldiIsImEiOiJKRGYyYUlRIn0.PuYcbpuC38WO6D1r7xdMdA";

        expect(actualMapboxAccessToken).toEqual(expectedMapBoxAccessToken);
    });
});