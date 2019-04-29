/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URLs that are defined', function () {
            for (x in allFeeds) {
                expect(allFeeds[x].url).toBeDefined();
                expect(allFeeds[x].url).not.toBe("");
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has Names that are defined', function () {
            for (x in allFeeds) {
                expect(allFeeds[x].name).toBeDefined();
                expect(allFeeds[x].name).not.toBe("");
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Menu hidden on page load', function () {
            expect(document.body).toHaveClass("menu-hidden");
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('Menu hidden state changes on click', function () {
            var menuIcon = document.querySelector(".menu-icon-link");
            menuIcon.click();
            expect(document.body).not.toHaveClass("menu-hidden");
            menuIcon.click();
            expect(document.body).toHaveClass("menu-hidden");
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('loadFeed completed', function () {
            var feed = document.querySelector('.feed');
            expect(feed.querySelector('.entry-link')).toBeDefined();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function () {
        var feed = document.querySelector('.feed');
        var originalFeed = [];
        var currentFeed = [];

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                Array.from(feed.children).forEach(function (entry) {
                    originalFeed.push(entry.innerText);
                });
                console.log(originalFeed[2]);
                loadFeed(1, function () {
                    Array.from(feed.children).forEach(function (entry) {
                        currentFeed.push(entry.innerText);
                    });
                    console.log(currentFeed[2]);
                    done();
                });
            });
        });

        it('feed content updated', function (done) {
            console.log(originalFeed[2]);
            //console.log(currentFeed[2]);
            //Array.from(feed.children).forEach(function (entry, index) {
            //    currentFeed.push(entry.innerText);
            //});
            console.log(currentFeed[2]);
            
            for (i = 0; i < currentFeed.length; i++) {
                expect(currentFeed[i]).not.toBe(originalFeed[i]);
            };
            done();
        });
    });
}());
