/**
 * A test suite for End-to-End tests
 */
describe('index page', function() {

    beforeEach(function() {
        browser.get('')
    });

    var phoneList = element.all(by.repeater('phone in phones'));

    it('should repeat three phones', function() {

        expect(phoneList.count()).toBe(3);
    });

    it('should present the first phone as the G1', function() {

        expect(phoneList.get(0).getText()).toEqual('G1');
    });

    it('should present the second phone as the Nexus One', function() {

        expect(phoneList.get(1).getText()).toEqual('Nexus One');
    });

    it('should present the third phone as the Nexus One', function() {

        expect(phoneList.get(2).getText()).toEqual('iPhone');
    });

    it('it should present a default greeting of - Hello Angular', function() {

        var span = element(by.binding('greeting'));

        expect(span.getText()).toBe('Hello World');

    });

    it('it should change the greeting to - Hello Bootstrap - after the button is clicked', function() {

        element(by.id('greetingDiv')).click();

        var span = element(by.binding('greeting'));

        expect(span.getText()).toBe('Hello Angular');

    });



});