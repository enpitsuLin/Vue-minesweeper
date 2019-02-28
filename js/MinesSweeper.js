var Minesweeper = Minesweeper || function(){};

function  Minesweeper() {
	this._initArguments.apply(this, arguments);
	
}

Minesweeper.prototype._initArguments = function() {
	this.Setting = {
		easy:{x:6, y:6, mines:8},
		mid:{x:10, y:10, mines:15},
		hard:{x: 14, y: 14, mines: 30}
	};
	this.mineMap = [];
	this.minedBoxes = [];
	this.resetLevel = 'easy';
	this.$mineContainer = $('#mine-grid');
	this.$mineCount = $('.mine-count');
	this.timer = false;
	this._hadOver = false;
};
Minesweeper.prototype._initBoard = function(level) {
	var _level = level || this.Setting.easy,
		dificulty, i,mine,$mineBlock;

	switch(_level.mines){
		case 8:
			dificulty = "easy";
			break;
		case 15:
			dificulty = "mid";
			break;
		case 30:
			dificulty = "hard";
			break;
	}

	this.$mineContainer.parent().removeClass().addClass(dificulty)
	this.$mineCount.text(_level.mines)

	this._createMines(_level);
	for(var mx = 0; mx < _level.x; mx++){
		$mineBlockX = $('<div class = "mineLine"></div>')
		for(var my = 0; my < _level.y;my++){
			mine = this.mineMap[mx * _level.x + my];
			$mineBlock = $('<div data-x="' + mine.x + '" data-y="' +  mine.y + '" id = "mineBlock"></div>');
			$mineBlockX.append($mineBlock);
		}
		this.$mineContainer.append($mineBlockX);
		//$mineBlockX.children().animate({'opacity': '1'},25 * (200 - mine.x * 2 - mine.y * 4));
	}
	
	this.$mineContainer.append('<hr class = "clear"/>');
};

Minesweeper.prototype._init = function() {
	this._initEvents();
	this._initBoard();
	this._initMineSize();
}
Minesweeper.prototype._initMineSize = function() {
	var mineBlockwidth =  $('div#mineBlock').parent().width() /minesweeper.Setting[$('#minesweeper').attr('class')].x
	$('div#mineBlock').each(function(i,e){
		$(e).css('line-height', mineBlockwidth-2+"px");
		$(e).css('width', mineBlockwidth);
		$(e).css('height', mineBlockwidth);
	})
};
Minesweeper.prototype._createMines  = function(level) {
	var rows = level.x,
		cols = level.y,
		mines = level.mines,
		i, j, mineIdx;

	for (i = 0; i < rows; i++) {
	  for (j = 0; j < cols; j++) {
		this.mineMap.push({x: i, y: j, mine: 0, status: 0});
	  }
	}
	while (mines) {
	  mineIdx = Math.floor(Math.random() * this.mineMap.length);
	  if (this.mineMap[mineIdx].mine === 0) {
		this.mineMap[mineIdx].mine = 1;
		this.minedBoxes.push(mineIdx);
		mines--;
	  }
	}
};

Minesweeper.prototype._cleanBoard = function() {
	this.mineMap = [];
	this.$mineContainer.empty();
};

Minesweeper.prototype._resetBoard = function(level) {
	this._hadOver = false;
	this._cleanBoard();
	this._initBoard(level);
	this._initMineSize();
};

Minesweeper.prototype._startTimer = function() {
	var $timer = $('.timer');
	$timer.text('001');

	this.timer = setInterval(function() {
		var newCount = parseInt($timer.text(), 10) + 1 + "";
		while (newCount.length < 3) newCount = "0" + newCount;
		$timer.text(newCount);
	}, 1000);
};

Minesweeper.prototype._restartTimer = function() {
	var $timer = $('.timer');
	$timer.text('000');
};

Minesweeper.prototype._stopTimer = function() {
	clearInterval(this.timer);
	this.timer = false;
	this._hadOver = true;
};

Minesweeper.prototype._getButtonIdx = function(x, y) {
	var index,
		res = this.mineMap.filter(function(el, idx) {
			if (el.x == x && el.y == y) {
				index = idx;
				return true;
			}
		});
	return (index >= 0) ? index : -1;
}

Minesweeper.prototype._getMinesInButton = function(x, y) {
	var idx = this._getButtonIdx(x, y);
	return (this.mineMap[idx] && this.mineMap[idx].mine) || 0
}

Minesweeper.prototype._checkSurroundingMines = function(x, y) {
	var x = parseInt(x, 10),
		y = parseInt(y, 10),
		btn = this.mineMap[this._getButtonIdx(x, y)] || 0,
		topLeft,
		top,
		topRight,
		left,
		right,
		botLeft,
		bottom,
		botRight,
		numMines;

	if (btn && btn.status === 0) {
	  topLeft =   this._getMinesInButton(x - 1, y - 1);
	  top =       this._getMinesInButton(x, y - 1);
	  topRight =  this._getMinesInButton(x + 1, y - 1);
	  left =      this._getMinesInButton(x - 1, y);
	  right =     this._getMinesInButton(x + 1, y);
	  botLeft =   this._getMinesInButton(x - 1, y + 1);
	  bottom =    this._getMinesInButton(x, y + 1);
	  botRight =  this._getMinesInButton(x + 1, y + 1);

	  numMines = topLeft +
				 top +
				 topRight +
				 left +
				 right +
				 botLeft +
				 bottom +
				 botRight;

	  if (numMines && !btn.mine) {
		this._openButton(x, y, numMines);
	  } else if (!btn.mine) {
		this._openButton(x, y);
		//setTimeout(function(){
		this._checkSurroundingMines(x - 1, y - 1);
		this._checkSurroundingMines(x, y - 1);
		this._checkSurroundingMines(x + 1, y - 1);
		this._checkSurroundingMines(x - 1, y);
		this._checkSurroundingMines(x + 1, y);
		this._checkSurroundingMines(x - 1, y + 1);
		this._checkSurroundingMines(x, y + 1);
		this._checkSurroundingMines(x + 1, y + 1);
		//}, 1000)
	  }
	}
  };

Minesweeper.prototype._flagButton = function(evt) {
	evt.preventDefault();
	if (!this._hadOver&&!this.timer) this._startTimer();

	var $el = $(evt.target),
		x = parseInt($el.attr('data-x'), 10),
		y = parseInt($el.attr('data-y'), 10),
		idx = this._getButtonIdx(x, y),
		btn = this.mineMap[idx],
		$btn = $('[data-x='+x+'][data-y='+y+']'),
		mines = parseInt(this.$mineCount.text(), 10);
	if (btn.status === 0&&!this._hadOver) {
		this.mineMap[idx].status = 2;
		this.$mineCount.text(mines - 1);
		this._hasWon();
	} else if (btn.status === 2&&!this._hadOver) {
		this.mineMap[idx].status = 0;
		this.$mineCount.text(mines + 1);
	}
	$btn.toggleClass('flagged');
}


Minesweeper.prototype._pressButton = function(evt) {
	var $el, x, y , btnIdx, btn;
	if (!this._hadOver&&!this.timer) this._startTimer();

	if (evt.which === 1) {
		$el = $(evt.target);
		x = $el.attr('data-x');
		y = $el.attr('data-y');
		btnIdx = this._getButtonIdx(x, y);
		btn = this.mineMap[btnIdx];

		if(btn.status===0&&!this._hadOver){
			if (btn.mine) {
				this._openButton(x, y, 'explode')
				this._explodeMines();
			} else {
				this._checkSurroundingMines(x, y)
			}
		 }
	}


};


Minesweeper.prototype._explodeMines = function() {
	$('.fa-meh-o').toggleClass("fa-meh-o").toggleClass("fa-frown-o");
	var len = this.mineMap.length,
		i, btn;
	this._stopTimer();
	for (i = 0; i < len; i++) {
	  btn = this.mineMap[i];
	  if (btn.mine && btn.status !== 1) {
		  this._openButton(btn.x, btn.y)
	  }
	}
};

Minesweeper.prototype._allMinesFlagged = function() {
	for (i = 0; i < this.minedBoxes.length; i++) {
		if (this.mineMap[this.minedBoxes[i]].status != 2) { return false; }
	}
	return true;
};

Minesweeper.prototype._allBoxesOpen = function() {
	var btn;
	for (i = 0; i < this.mineMap.length; i++) {
		btn = this.mineMap[i];
		if (!btn.mine) {
			if (btn.status !== 1) {
				return false;
			}
		}
	}
	return true;
}

Minesweeper.prototype._hasWon = function() {
	if (this._allMinesFlagged() || this._allBoxesOpen()) {
		$($('button').children()[1]).removeClass().addClass("fa").addClass("fa-smile-o")
		this._stopTimer();
	}
}

Minesweeper.prototype._openButton = function(x, y, type) {
	var idx = this._getButtonIdx(x, y),
		btn = this.mineMap[idx],
		$btn = $('[data-x='+x+'][data-y='+y+']');

	if (type === 'explode') {
		$btn.addClass('exploded').append($('<i class="fa fa-bomb" aria-hidden="true"></i>'));
	} else {
		$btn.addClass('open');
		if (parseInt(type, 10)) {
			$btn.append(type);
		} else if (btn.mine) {
			$btn.append($('<i class="fa fa-bomb" aria-hidden="true"></i>'));
		}  
	}
	this.mineMap[idx].status = 1;
	this._hasWon();
}



Minesweeper.prototype._initEvents = function() {
	minesweeper = this;
	$('.level-select').on('click', function() {
		var $this = $(this);
		level = $this.attr('data-level');
		console.log("LEVEL TO " + level + "\n");
		minesweeper._stopTimer();
		minesweeper.resetLevel = level;
		minesweeper._restartTimer();
		minesweeper._resetBoard(minesweeper.Setting[level]);
	});

	

	this.$mineContainer.on('mousedown', 
		'#mineBlock', 
		function(e){
			minesweeper._pressButton(e)
		}
	);
	this.$mineContainer.on('contextmenu', 
		'#mineBlock', 
		function(e){
			minesweeper._flagButton(e);
		}
	);

	$('#mineBlock').on({  
		touchstart: function(e) { 
			// 长按事件触发  
			timeOutEvent = setTimeout(function() {  
				timeOutEvent = 0;  
				alert('你长按了');  
			}, 400);  
			//长按400毫秒   
			// e.preventDefault();    
		},  
		touchmove: function() {  
			clearTimeout(timeOutEvent);  
			timeOutEvent = 0;  
		},  
		touchend: function() {  
			clearTimeout(timeOutEvent);  
			if (timeOutEvent != 0) {  
				// 点击事件  
				// location.href = '/a/live-rooms.html';  
				alert('你点击了');  
			}  
			return false;  
		}  
	}) 

	$(window).resize(function() {
		minesweeper._initMineSize();
	});

	$('#close').on('mousedown', 
		function(e){
			if(confirm("确定要退出吗？")){
                 var browserName=navigator.appName;
                 if (browserName=="Netscape"){
                       window.open('', '_self', '');
                       window.close();
                 }
                 if (browserName=="Microsoft Internet Explorer") { 
                       window.parent.opener = "whocares"; 
                       window.parent.close(); 
                 }
        	}
		}
	);
	
	$('.reset').on('click', function() {
		$($('button').children()[1]).removeClass("fa-smile-o").removeClass("fa-frown-o").addClass("fa-meh-o")
		var level = minesweeper.resetLevel;
		minesweeper._stopTimer();
		minesweeper._restartTimer();
		minesweeper._resetBoard(minesweeper.Setting[level]);
	})
};

var Minesweeper = new Minesweeper;
Minesweeper._init();

