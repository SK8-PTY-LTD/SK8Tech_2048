function update_captions() {
  if (window.innerWidth < 520) {
    captions = [
      "Problem",
      "Potential",
      "<span style='font-size:10px;'>Opportunity</span>",
      "<span style='font-size:10px;'>Brainstorm</span>",
      "<span style='font-size:11px;'>Innovation</span>",
      "Solution",
      "Validation",
      "Stratergy",
      "<span style='font-size:10px;'>Production</span>",
      "Marketing",
      "<span style='font-size:12px;display:inline-block;line-height:24px;vertical-align:middle'>StartUp</span>",
      "<span style='font-size:12px;display:inline-block;line-height:24px;vertical-align:middle'>Medium Business</span>",
      "Enterprise",
      "<span style='font-size:12px;display:inline-block;line-height:24px;vertical-align:middle'>Household Brand</span>",
      "NASDAQ!"
    ];
    captions_rel = [
      "<span style='font-size:10px;'>Investment</span>",
      "Mistake"
    ];
  } else {
    captions = [
      "Problem",
      "Potential",
      "<span style='font-size:18px;'>Opportunity</span>",
      "<span style='font-size:18px;'>Brainstorm</span>",
      "<span style='font-size:19px;'>Innovation</span>",
      "Solution",
      "<span style='font-size:20px;'>Validation</span>",
      "Stratergy",
      "<span style='font-size:18px;'>Production</span>",
      "Marketing",
      "<span style='font-size:24px;display:inline-block;line-height:24px;vertical-align:middle'>StartUp</span>",
      "<span style='font-size:24px;display:inline-block;line-height:24px;vertical-align:middle'>Medium Business</span>",
      "Enterprise",
      "<span style='font-size:24px;display:inline-block;line-height:24px;vertical-align:middle'>Household Brand</span>",
      "NASDAQ!"
    ];
    captions_rel = [
      "<span style='font-size:18px;'>Investment</span>",
      "Mistake"
    ];
  }
}

var span_english;

function create_switch_en() {
  span_english = document.createElement('div');
  span_english.style.position = "absolute";
  span_english.style.top = "0";
  if (window.innerWidth < 520)
    span_english.style.fontSize = "10px";
  else
    span_english.style.fontSize = "small";
  span_english.style.backgroundColor = "#171c61";
  span_english.style.borderRadius = "0 0 3px 3px";
  span_english.style.padding = "3px 10px";
  span_english.style.color = "white";
  span_english.style.cursor = "pointer";
  span_english.onclick = play_in_english;
  span_english.innerText = "Build my StartUp";
  var container = document.getElementsByClassName('container')[0];
  container.insertBefore(span_english, container.firstChild);
}

var span_default;

function create_switch() {
  span_default = document.createElement('div');
  span_default.style.position = "absolute";
  span_default.style.top = "0";
  if (window.innerWidth < 520)
    span_default.style.fontSize = "10px";
  else
    span_default.style.fontSize = "small";
  span_default.style.backgroundColor = "#171c61";
  span_default.style.borderRadius = "0 0 3px 3px";
  span_default.style.padding = "3px 10px";
  span_default.style.color = "white";
  span_default.style.cursor = "pointer";
  span_default.onclick = play_default;
  span_default.innerText = "我要创业!";
  var container = document.getElementsByClassName('container')[0];
  container.insertBefore(span_default, container.firstChild);
}

function play_in_english() {
  update_captions();
  window.addEventListener('resize', update_captions, true);

  caption_garbage = "<span style='font-size:smaller'>Garbage</span>";
  window.game.actuate();

  game_title = "StartUp";
  var titleElem = document.getElementById('title');
  if (titleElem.innerText != "Love") titleElem.innerText = game_title;
  document.getElementsByClassName('restart-button')[0].innerText = "StartUp Again!";
  document.getElementsByClassName('retry-button')[0].innerText = "New StartUp";
  document.getElementsByClassName('game-explanation')[0].innerHTML = "<strong class='important'>How to play:</strong> Use your <strong>arrow keys</strong> to move the bricks. When two bricks of the same type touch, they <strong>merge into one!</strong><br>However, your ideas and experiments may not always work &mdash; they may produce the sticky <strong>garbage</strong>, which is resistant to moves. Two garbage bricks vanish when they touch. You will stop producing garbage after getting a <strong>paper</strong> (except for one more piece to help you eliminate any existing garbage).<br>A <strong>relationship</strong> upgrades any brick it touches for the first time. The brick shows the number of times you have benefited from it. When the 10-sec relationship ends, it will become a <strong>break-up</strong> (or garbage if you didn't use it), which downgrades bricks until you have repaid the benefits.";
  document.getElementById('share-weixin').innerText = "Share on WeChat";
  document.getElementById('wx-notice').innerHTML = "<br><strong class='important'>WeChat user:</strong> Add this game to your home screen by opening this page with the system browser.<br>Long press the QR code to follow me on WeChat:<br><img src='wx-qrcode.png' width='100%'/>";

  span_english.parentNode.removeChild(span_english);
  create_switch();
  window.game.storageManager.storage.setItem('lang', 'en');
}

var zh_var = null;

function determine_zh_var() {
  if (zh_var) return zh_var;
  var hant_locales = ['zh-hant', 'zh-tw', 'zh-hk', 'zh-mo'];
  var nav_langs = navigator.languages;
  if (nav_langs) {
    for (var i = 0; i < nav_langs.length; i++) {
      if (nav_langs[i].startsWith('zh-')) {
        if (hant_locales.indexOf(nav_langs[i].toLowerCase()) >= 0) {
          zh_var = "hant";
          return "hant";
        } else break;
      }
    }
  } else {
    var nav_lang = navigator.language || navigator.userLanguage;
    if (hant_locales.indexOf(nav_lang.toLowerCase()) >= 0) {
      zh_var = "hant";
      return "hant";
    }
  }
  zh_var = "hans";
  return "hans";
}

function use_simplified() {
  captions = [
    "痛点",
    "需求",
    "机遇",
    "讨论",
    "创新",
    "方案",
    "调研",
    "战略",
    "研发",
    "营销",
    "创业",
    "<span style='display:inline-block;line-height:18px;vertical-align:middle'>中型<br>企业</span>",
    "<span style='display:inline-block;line-height:18px;vertical-align:middle'>行业<br>大佬</span>",
    "<span style='display:inline-block;line-height:18px;vertical-align:middle'>家喻<br>户晓</span>",
    "<span style='display:inline-block;line-height:18px;vertical-align:middle'>A股<br>上市</span>"
  ];
  captions_rel = [
    "风投",
    "失误"
  ];
  caption_garbage = "垃圾";
  window.game.actuate();

  document.getElementsByClassName('restart-button')[0].innerText = "再来";
  document.getElementsByClassName('retry-button')[0].innerText = "善";
  document.getElementsByClassName('game-explanation')[0].innerHTML = "<strong class='important'>玩法:</strong> 使用方向键搬砖. 当两块相同的砖碰在一起时, <strong>它们会组成一块更好的砖</strong>! <br>但是, 你的创新和方案也可能只是产生<strong>垃圾</strong>. 黏着的垃圾会阻碍砖块的移动, 直到被别的垃圾击中而消失. 你得到 <strong>战略</strong> 以后便不会再产生垃圾, 最多再来一块帮你清除别的垃圾.<br><strong>投资</strong>砖触碰任何砖都能使其升级, 但一块砖只可享受一次. 投资砖上会显示你使用它的次数; 10 秒后它会变成<strong>失误</strong>砖, 触碰任何砖都能使其降级, 以此来偿还之前使用的次数.";
  document.getElementById('share-weixin').innerText = "发布到朋友圈";
  document.getElementById('wx-notice').innerHTML = "<br><strong class='important'>微信用户:</strong> 用浏览器打开, 可以将本游戏安装到手机桌面.<br>长按二维码关注作者公众号:<br><img src='wx-qrcode.png' width='100%'/>";
}

function use_traditional() {
  captions = [
    "痛点",
    "需求",
    "机遇",
    "讨论",
    "创新",
    "方案",
    "调研",
    "战略",
    "研发",
    "营销",
    "创业",
    "<span style='display:inline-block;line-height:18px;vertical-align:middle'>中型<br>企业</span>",
    "<span style='display:inline-block;line-height:18px;vertical-align:middle'>行业<br>大佬</span>",
    "<span style='display:inline-block;line-height:18px;vertical-align:middle'>家喻<br>户晓</span>",
    "<span style='display:inline-block;line-height:18px;vertical-align:middle'>A股<br>上市</span>"
  ];
  captions_rel = [
    "风投",
    "失误"
  ];
  caption_garbage = "垃圾";
  window.game.actuate();

  document.getElementsByClassName('restart-button')[0].innerText = "再来";
  document.getElementsByClassName('retry-button')[0].innerText = "善";
  document.getElementsByClassName('game-explanation')[0].innerHTML = "<strong class='important'>玩法:</strong> 使用方向键搬砖. 当两块相同的砖碰在一起时, <strong>它们会组成一块更好的砖</strong>! <br>但是, 你的创新和方案也可能只是产生<strong>垃圾</strong>. 黏着的垃圾会阻碍砖块的移动, 直到被别的垃圾击中而消失. 你得到 <strong>战略</strong> 以后便不会再产生垃圾, 最多再来一块帮你清除别的垃圾.<br><strong>投资</strong>砖触碰任何砖都能使其升级, 但一块砖只可享受一次. 投资砖上会显示你使用它的次数; 10 秒后它会变成<strong>失误</strong>砖, 触碰任何砖都能使其降级, 以此来偿还之前使用的次数.";
  document.getElementById('share-weixin').innerText = "发布到朋友圈";
  document.getElementById('wx-notice').innerHTML = "<br><strong class='important'>WeChat 使用者：</strong>用瀏覽器打開，可以將本遊戲添加到手機主熒幕。<br>長按 QR 碼訂閱作者的公眾號：<br><img src='wx-qrcode.png' width='100px'/>";

  document.body.style.fontFamily = '"Clear Sans", "Helvetica Neue", Arial, "Hiragino Sans CNS", "PingFang TC", "Microsoft JhengHei", "Source Han Sans TC", "Noto Sans CJK TC", sans-serif';
}

function play_default() {
  window.removeEventListener('resize', update_captions, true);
  game_title = "我要创业!";
  var titleElem = document.getElementById('title');
  if (titleElem.innerText != "Love") titleElem.innerText = game_title;

  if (determine_zh_var() == 'hant') use_traditional();
  else use_simplified();

  span_default.parentNode.removeChild(span_default);
  create_switch_en();
  window.game.storageManager.storage.setItem('lang', 'zh');
}