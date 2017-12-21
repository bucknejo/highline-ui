'use strict';

describe('test sandbox space', function() {

    var testSandbox, _$log;

    beforeEach(function() {
        module('highline-ui');
        module('highline-ui-services');
    });

    beforeEach(inject(function(TestSandbox, $log) {
        testSandbox = TestSandbox;
        _$log = $log;

        spyOn(testSandbox, 'function1').and.callThrough();
        spyOn(testSandbox, 'function2').and.callThrough();
        spyOn(testSandbox, 'getBucket1').and.returnValue(345);
        spyOn(testSandbox, 'callFakeFunction').and.callFake(function(a,b,c) {
            return a + b + c;
        });
        spyOn(testSandbox, 'throwsError').and.throwError('test error');
        spyOn(testSandbox, 'setBucket2').and.callThrough();
        spyOn(testSandbox, 'trackingCalls');

        testSandbox.function1(1, 2);
        testSandbox.function2(3, 4);
        testSandbox.callFakeFunction(1,2,3);
    }));

    it('tracks what has been called', function () {
        expect(testSandbox.function1).toHaveBeenCalledWith(1, 2);
        expect(testSandbox.function2).toHaveBeenCalledWith(3, 4);
        expect(testSandbox.callFakeFunction).toHaveBeenCalledWith(1,2,3);
    });

    it('function1 should return 3 when called with 1 & 2', function() {
        var actual = testSandbox.function1(1, 2);
        expect(actual).toBe(3);
    });

    it('function2 should return 12 when called with 3 & 4', function() {
        var actual = testSandbox.function2(3, 4);
        expect(actual).toBe(12);
    });

    it('getBucket1 should always return 345 even after setting it otherwise', function() {
        testSandbox.setBucket1(123);
        var actual = testSandbox.getBucket1();
        expect(actual).toBe(345);
    });

    it('callFakeFunction should return value from alternate function', function() {
        var actual = testSandbox.callFakeFunction(2,4,6);
        expect(testSandbox.callFakeFunction).toHaveBeenCalledWith(2,4,6);
        expect(actual).toBe(12);
    });

    it('should expect to get an error when calling throwsError', function() {
        var actual = function () {testSandbox.throwsError();};
        expect(actual).toThrowError('test error');
    });

    it('should test the stubbing function of Jasmine', function() {
        testSandbox.setBucket2(3);
        var actual = testSandbox.getBucket2();
        expect(actual).toBe(3);
        testSandbox.setBucket2.and.stub();
        testSandbox.setBucket2(4);
        actual = testSandbox.getBucket2();
        expect(actual).toBe(3);
    });

    it('should track calls to trackingCalls', function() {
        expect(testSandbox.trackingCalls.calls.any()).toEqual(false);
        testSandbox.trackingCalls(1, 2);
        expect(testSandbox.trackingCalls.calls.any()).toEqual(true);
    });

    it('should track the number of times a function has been called', function() {
        expect(testSandbox.trackingCalls.calls.count()).toEqual(0);
        testSandbox.trackingCalls(1, 2);
        testSandbox.trackingCalls(3, 4);
        expect(testSandbox.trackingCalls.calls.count()).toEqual(2);
    });

    it('should track the arguments of each call', function() {
        testSandbox.trackingCalls(1, 2);
        testSandbox.trackingCalls(3, 4);
        expect(testSandbox.trackingCalls.calls.argsFor(0)).toEqual([1,2]);
        expect(testSandbox.trackingCalls.calls.argsFor(1)).toEqual([3,4]);
    });

    it('should track the arguments of all calls', function() {
        testSandbox.trackingCalls(1, 2);
        testSandbox.trackingCalls(3, 4);
        expect(testSandbox.trackingCalls.calls.allArgs()).toEqual([[1,2], [3,4]]);
    });


    describe('', function() {

        var foo, bar = null;

        beforeEach(function() {
            foo = {
                setBar: function(value) {
                    bar = value;
                }
            };

            spyOn(foo, 'setBar');
        });

        it('should provide context and arguments of to all calls', function() {
            foo.setBar(123);

            expect(foo.setBar.calls.all()).toEqual([{object: foo, args: [123], returnValue: undefined}]);

        });

        it('has a shortcut to most recent', function() {
            foo.setBar(1);
            foo.setBar(456, 'baz');

            expect(foo.setBar.calls.mostRecent()).toEqual({object: foo, args: [456, 'baz'], returnValue: undefined});

        });

        it('has a shortcut to first', function() {
            foo.setBar(1);
            foo.setBar(456, 'baz');

            expect(foo.setBar.calls.first()).toEqual({object: foo, args: [1], returnValue: undefined});

        });

        it('create spy and track it', function() {

            var s = jasmine.createSpy('s');

            var a = {
                fn: s
            };

            var b = {
                fn: s
            };

            a.fn(123);
            b.fn(456);

            expect(s.calls.first().object).toBe(a);
            expect(s.calls.mostRecent().object).toBe(b);

        });

        it('can reset the tracker', function() {
            foo.setBar(1);
            foo.setBar(2);


            expect(foo.setBar.calls.any()).toBe(true);

            foo.setBar.calls.reset();

            expect(foo.setBar.calls.any()).toBe(false);
        });


    });

    describe("A spy, when created manually", function() {
        var whatAmI;

        beforeEach(function() {
            whatAmI = jasmine.createSpy('whatAmI');

            whatAmI("I", "am", "a", "spy");
        });

        it("is named, which helps in error reporting", function() {
            expect(whatAmI.and.identity()).toEqual('whatAmI');
        });

        it("tracks that the spy was called", function() {
            expect(whatAmI).toHaveBeenCalled();
        });

        it("tracks its number of calls", function() {
            expect(whatAmI.calls.count()).toEqual(1);
        });

        it("tracks all the arguments of its calls", function() {
            expect(whatAmI).toHaveBeenCalledWith("I", "am", "a", "spy");
        });

        it("allows access to the most recent call", function() {
            expect(whatAmI.calls.mostRecent().args[0]).toEqual("I");
        });
    });

    describe('spy objects', function() {

        var tape;

        beforeEach(function() {
            tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

            tape.play();
            tape.pause();
            tape.stop();
            tape.rewind(0);

        });

        it('spies have been created', function() {
            expect(tape.play).toBeDefined();
            expect(tape.pause).toBeDefined();
        });

        it('spies have started tracking', function () {
           expect(tape.play).toHaveBeenCalled();
        });

        it('spies can track arguments', function() {
            expect(tape.rewind).toHaveBeenCalledWith(0);
        });

        describe('any matchers', function() {
            it('matches types', function() {
                expect({}).toEqual(jasmine.any(Object));
                expect(12).toEqual(jasmine.any(Number));
            });
        });

        describe('compare args', function () {

            it('comp args', function () {

                var foo = jasmine.createSpy('foo');

                foo(12, function() {
                    return true;
                });

                expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));

            });

        });

        describe('a tick of the clock', function() {

            var timerCallback;

            beforeEach(function() {
                timerCallback = jasmine.createSpy('timerCallback');
                jasmine.clock().install();
            });

            afterEach(function(){
                jasmine.clock().uninstall();
            });

            it('causes a timeout to be called synchronously', function () {

                setTimeout(function () {
                    timerCallback();
                }, 100);

                expect(timerCallback).not.toHaveBeenCalled();

                jasmine.clock().tick(101);

                expect(timerCallback).toHaveBeenCalled();

            });

            it('call it ', function () {

                setTimeout(function () {
                    timerCallback();
                }, 100);

                expect(timerCallback).not.toHaveBeenCalled();

                jasmine.clock().tick(101);
                expect(timerCallback.calls.count()).toEqual(1);

                jasmine.clock().tick(50);
                expect(timerCallback.calls.count()).toEqual(1);

                jasmine.clock().tick(101);
                expect(timerCallback.calls.count()).toEqual(1);

                jasmine.clock().tick(50);
                expect(timerCallback.calls.count()).toEqual(1);


            });

            describe('mocking date object', function () {
                var baseTime = new Date(2012, 9, 18);

                //jasmine.clock().mockDate(baseTime);

                //jasmine.clock().tick(50);

                //expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);

                console.log('jasmine version: ' + jasmine.version);

            });


        });
        

    });

});