function disable_fb() {
    var fbButtons = document.getElementsByClassName('fb-share-button');
    for (var i = 0; i < fbButtons.length; i++) {
        fbButtons[i].parentNode.removeChild(fbButtons[i]);
    }
}
var in_wechat = false;
if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
    in_wechat = true;
} else {
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    setTimeout(function() {
        if (!window.FB) disable_fb();
    }, 5000);
}