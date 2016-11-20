function HTMLActuator() {
  this.tileContainer = document.querySelector(".tile-container");
  this.scoreContainer = document.querySelector(".score-container");
  this.bestContainer = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");

  this.score = 0;
}

HTMLActuator.prototype.actuate = function(grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function() {
    self.clearContainer(self.tileContainer);

    grid.cells.forEach(function(column) {
      column.forEach(function(cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // The game has ended 
      } else if (metadata.won) {
        self.message(true); // You can continue playing
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function() {
  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

var captions = [
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>痛点<br>需求</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>创新<br>机遇</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>概念<br>革新</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>头脑<br>风暴</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>解决<br>方案</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>市场<br>调研</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>战略<br>战术</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>产品<br>研发</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>营销<br>推广</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>销售<br>增长</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>创业<br>成功</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>中型<br>企业</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>行业<br>大佬</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>家喻<br>户晓</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>A股<br>上市</span>"
];
var game_title = "我要创业!";
var caption_garbage = "垃圾";
var captions_rel = [
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>风险<br>投资</span>",
  "<span style='display:inline-block;line-height:18px;vertical-align:middle'>亚历<br>山大</span>"
];

var val2caption = function(val) {
  if (val <= 0) return caption_garbage;
  if (val == 1) {
    var caption = "<span style='display:inline-block;line-height:1.2;vertical-align:middle'><span class='rel'>";
    if (window.game.relTime) caption += captions_rel[0];
    else caption += captions_rel[1];
    caption += "</span><br><span class='karma'>" + window.game.karma + "</span></span>";
    return caption;
  }
  var idx = -1;
  var n = 1;
  while (n < val) {
    n <<= 1;
    idx++;
  }
  if (idx >= 0 && idx < captions.length)
    return captions[idx];
  else
    return val;
};

HTMLActuator.prototype.addTile = function(tile) {
  var self = this;

  var wrapper = document.createElement("div");
  var inner = document.createElement("div");
  var position = tile.previousPosition || {
    x: tile.x,
    y: tile.y
  };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.innerHTML = val2caption(tile.value);

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function() {
      classes[2] = self.positionClass({
        x: tile.x,
        y: tile.y
      });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function(merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function(element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function(position) {
  return {
    x: position.x + 1,
    y: position.y + 1
  };
};

HTMLActuator.prototype.positionClass = function(position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function(score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "-" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function(bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function(ended) {
  var type = ended ? "game-won" : "game-over";
  var message = window.game.won ? "You got a StartUp! <span>&#10004;</span>" : "Try Again!";
  if (!window.game.won) {
    if (window.game.maxTile >= 1024) message = "One step away!";
    else if (window.game.maxTile >= 512) message = "Almost there!";
  } else if (window.game.maxTile > 2048) {
    message = "You got a " + val2caption(window.game.maxTile) + "!";
  }

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].innerHTML = message;

  ga('send', 'event', 'game', 'ended-' + window.game.maxTile, this.score);

  var shareButtons = document.getElementsByClassName('share-fb');
  for (var i = 0; i < shareButtons.length; i++) shareButtons[i].style.display = "none";

  if (!window.game.won) {
    if (window.game.maxTile >= 1024) document.getElementById('share-1024').style.display = "";
    else if (window.game.maxTile >= 512) document.getElementById('share-512').style.display = "";
    else document.getElementById('share-starter').style.display = "";
  } else {
    document.getElementById('share-startup').style.display = "";
  }
};

HTMLActuator.prototype.clearMessage = function() {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};

HTMLActuator.prototype.refreshRel = function(remainingTime) {
  if (remainingTime > 0) {
    document.getElementById('title').textContent = "Growth";
    document.getElementsByClassName('game-intro')[0].textContent = "Your investment will last for " + remainingTime + "s.";
    document.getElementById('progress').textContent = "Growth";
    document.getElementById('progress').style.display = "";
    if (window.innerWidth < 520)
      document.getElementById('progress').style.width = Math.round(100 * remainingTime / window.game.relDuration) + "px";
    else
      document.getElementById('progress').style.width = Math.round(200 * remainingTime / window.game.relDuration) + "px";
  } else {
    document.getElementById('title').textContent = game_title;
    document.getElementsByClassName('game-intro')[0].textContent = "Move the bricks to build your StartUp!";
    document.getElementById('progress').textContent = "";
    document.getElementById('progress').style.display = "none";
    document.getElementById('progress').style.width = "0";
    var rels = document.getElementsByClassName('rel');
    for (var i = 0; i < rels.length; i++) rels[i].innerHTML = captions_rel[1];
  }
};