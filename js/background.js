/*!
 * background.js
 * Crawls the search results for whenever your username is mentioned on the forums
 * calls functions from data.js
 */

var urlFormat = "http://forum.bodybuilding.com/showthread.php?t=163235341&page=500";

// Update notifications
if (window.addEventListener) {
    window.addEventListener("storage", onStorage, false);
} else {
    window.attachEvent("onstorage", onStorage);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {


        if (request.greeting == "quickreply") {
            if (request.threadid === "undefined")
                return;
            var url = "http://forum.bodybuilding.com/showthread.php?t=" + request.threadid + "&page=1000";
            var newThread = new thread(url, request.threadtitle);
            var currentThreads = localDataStore.get("threads");
            var filtered = $(localDataStore.get("threads")).filter(function() {
                return this.url === url;
            });
            // if thread not yet stored in localstorage, add it
            if (filtered.length === 0)
                localDataStore.appendToFront("threads", newThread);
            else {
                // reset offset back to 0 if thread exists
                var index = currentThreads.map(function(e) {
                    return e.url;
                }).indexOf(url);
                currentThreads[index].offset = 0;
                localDataStore.set("threads", currentThreads);
            }
        }
        if (request.greeting == "submitreply") {
            if (request.threadid === undefined)
                return false;
            var url = "http://forum.bodybuilding.com/showthread.php?t=" + request.threadid + "&page=1000";
            var newThread = new thread(url, request.threadtitle);
            var filtered = $(localDataStore.get("threads")).filter(function() {
                return this.url === url;
            });
            // if thread not yet stored in localstorage, add it
            if (filtered.length === 0)
                localDataStore.appendToFront("threads", newThread);
            // reset offset back to 0 if thread exists
            else {
                var index = currentThreads.map(function(e) {
                    return e.url;
                }).indexOf(url);
                currentThreads[index].offset = 0;
                localDataStore.set("threads", currentThreads);
            }
        }
        sendResponse({
            received: "received"
        });
    }
);

function instantReplies() {
    getAllCookies(function(){
    removeAllCookies(function(){
        minePosts(function(){
                setAllCookies();
        });
    });
});
};

// Initalize and fetch posts every minute
initalize();

setTimeout(fetchPosts, 3000);
setInterval(fetchPosts, 61000);
setInterval(instantReplies, 30000);