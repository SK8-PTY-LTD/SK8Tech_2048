(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-58021961-7', 'auto');

function open_share() {
    sessionStorage.setItem('open-share', 'yes');
    var maxTile = window.game.maxTile;
    var page = maxTile.toString();
    if (maxTile >= 2048) page = "startup";
    else if (maxTile < 128) page = "starter";
    window.location = "wx-" + page + ".html";
}
if (in_wechat) {
    document.getElementById('share-weixin').addEventListener('touchend', open_share);
    document.getElementById('share-weixin').style.display = "";
    document.getElementById('wx-notice').style.display = "";
    document.getElementById('wx-notice').innerHTML = "<br><strong class='important'>微信用户:</strong> 用浏览器打开, 可以将本游戏安装到手机桌面.<br>长按二维码关注作者公众号:<br><img src='wx-qrcode.png' width='100%'/>";
    disable_fb();
    var twButton = document.getElementsByClassName('share-tw')[0];
    twButton.parentNode.removeChild(twButton);
    ga('set', 'dimension1', 'wechat');
} else {
    addToHomescreen({
        appID: '2048.sk8.tech',
        skipFirstVisit: true,
        maxDisplayCount: 1
    });
    if (window.navigator.standalone) ga('set', 'dimension1', 'installed-ios');
    else ga('set', 'dimension1', 'other');
}
ga('send', 'pageview');
