(function($) {
    var showAmaraLogo, checkUrl, youtubeBase, apiUrl,
        handleResponse, amaraVideoUrl;

    youtubeBase = 'http://www.youtube.com/watch?v=';
    apiUrl = 'http://www.amara.org/api2/partners/videos/?format=json&video_url=';
    amaraVideoUrl = 'http://www.amara.org/en/videos/';

    showAmaraLogo = function(url) {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.pageAction.show(tab.id);
            chrome.pageAction.onClicked.addListener(function(tab) {
                chrome.tabs.update(tab.id, {url: url});
            });
        });
    };

    handleResponse = function(resp) {
        if (resp.meta.total_count === 0) {
            return;
        }

        var videoUrl = amaraVideoUrl + resp.objects[0].id + '/';
        showAmaraLogo(videoUrl);
    };

    checkURL = function(url) {
        var uri, videoId, videoUrl, xhr;

        uri = new URI(url);

        if (uri.hostname().indexOf('youtube') === -1) {
            return;
        }

        videoId = uri.search(true).v;
        xhr = new XMLHttpRequest();

        if (videoId) {
            videoUrl = youtubeBase + videoId;

            xhr.open('GET', apiUrl + videoUrl, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var resp = JSON.parse(xhr.responseText);
                    handleResponse(resp);
                }
            };

            xhr.send();
        }

    };

    $(function() {
        chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
            checkURL(request.url);
        });
    });

})(jQuery);
