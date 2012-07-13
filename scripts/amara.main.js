(function($) {
    var showAmaraLogo, checkUrl;

    showAmaraLogo = function() {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.pageAction.show(tab.id);
        });
    };

    checkURL = function(url) {
        // Business logic here
        showAmaraLogo();
    };

    $(function() {
        chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
            checkURL(request.url);
        });
    });

})(jQuery);
