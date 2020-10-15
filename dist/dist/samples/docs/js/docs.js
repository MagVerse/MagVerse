(function($) {

var sampleName = 'docs',
	samplePath = 'samples/docs/';

// Why this?  Chrome has the fault:
// http://code.google.com/p/chromium/issues/detail?id=128488
function isChrome() {

	return navigator.userAgent.indexOf('Chrome')!=-1;

}

function loadPage(page) {

	var img = $('<img />');
	img.load(function() {
		var container = $('.docs-brochure .p'+page);
		img.css({width: container.width(), height: container.height()});
		img.appendTo($('.docs-brochure .p'+page));
		container.find('.loader').remove();
	});

	img.attr('src', samplePath + 'pages/' +  (page-2) + '.png');

}

function addPage(page, book) {

	var id, pages = book.turn('pages');

	var element = $('<div />', {});

	if (book.turn('addPage', element, page)) {
		if (page<28) {
			element.html('<div class="gradient"></div><div class="loader"></div>');
			loadPage(page);
		}
	}
}

function updateTabs() {
	
	var tabs = {7: 'Clases', 12:'Constructor', 14:'Properties', 16:'Methods', 23:'Events'},
		left = [],
		right = [],
		book = $('.docs-brochure'),
		actualPage = book.turn('page'),
		view = book.turn('view');

	for (var page in tabs) {
		var isHere = $.inArray(parseInt(page, 10), view)!=-1;

		if (page>actualPage && !isHere)
			right.push('<a href="#' + samplePath + page + '">' + tabs[page] + '</a>');
		else if (isHere) {
			
			if (page%2===0)
				left.push('<a href="#' + samplePath + page + '" class="on">' + tabs[page] + '</a>');
			else
				right.push('<a href="#' + samplePath + page + '" class="on">' + tabs[page] + '</a>');
		} else
			left.push('<a href="#' + samplePath + page + '">' + tabs[page] + '</a>');

	}

	$('.docs-brochure .tabs .left').html(left.join(''));
	$('.docs-brochure .tabs .right').html(right.join(''));

}

function loadFlipbook(flipbook) {

	if (flipbook.width()===0) {

		if (bookshelf.currentSampleName()==sampleName) {
			setTimeout(function() {
				loadFlipbook(flipbook);
			}, 10);
		}

		return;
	}

	flipbook.turn({
		elevation: 50,
		acceleration: !isChrome(),
		gradients: true,
		autoCenter: true,
		duration: 1000,
		pages: 30,
		when: {

		turning: function(e, page, view) {
			
			var book = $(this),
			currentPage = book.turn('page'),
			pages = book.turn('pages');
				
			if (currentPage>3 && currentPage<pages-3) {
				if (page==1) {
					book.turn('page', 2).turn('stop').turn('page', page);
					e.preventDefault();
					return;
				} else if (page==pages) {
					book.turn('page', pages-1).turn('stop').turn('page', page);
					e.preventDefault();
					return;
				}
			} else if (page>3 && page<pages-3) {
				if (currentPage==1) {
					book.turn('page', 2).turn('stop').turn('page', page);
					e.preventDefault();
					return;
				} else if (currentPage==pages) {
					book.turn('page', pages-1).turn('stop').turn('page', page);
					e.preventDefault();
					return;
				}
			}

			if (!$('.splash .bookshelf').is(':visible'))
				Hash.go('samples/' + sampleName+'/'+page).update();

			if (page==1 || page==pages)
				$('.docs-brochure .tabs').hide();

		},

		turned: function(e, page, view) {

			var book = $(this);

			$('#slider').slider('value', getViewNumber(book, page));

			if (page!=1 && page!=book.turn('pages'))
				$('.docs-brochure .tabs').fadeIn(500);

			book.turn('center');
			updateTabs();

		},

		start: function(e, pageObj) {

			bookshelf.moveBar(true);

		},

		end: function(e, pageObj) {
		
			var book = $(this);

			setTimeout(function() {
				$('#slider').slider('value', getViewNumber(book));
			}, 1);

			bookshelf.moveBar(false);

		},

		missing: function (e, pages) {

			for (var i = 0; i < pages.length; i++)
				addPage(pages[i], $(this));

		}
	}
});


	$('#slider').slider('option', 'max', numberOfViews(flipbook));

	flipbook.addClass('animated');
	bookshelf.showSample();

}
bookshelf.loadSample(sampleName, function(action) {

	var sample = this;

	bookshelf.preloadImgs(['covers.jpg', 'tab-off.png', 'tab-on.png', 'tab-hover.png'], samplePath + 'pics/',
	function() {

	bookshelf.loaded(sampleName);

	if (action=='preload') {
		return;
	}

	sample.previewWidth = 115;
	sample.previewHeight = 73;
	sample.previewSrc = samplePath + 'pics/preview.jpg';
	sample.tableContents = 5;
	sample.shareLink = 'http://' + location.host + '/#'+samplePath;
	sample.shareText = 'Turn.js: Make a flipbook with HTML5 via @turnjs';


	// Report that the flipbook is loaded

	if (!sample.flipbook) {

		var bookClass = (Modernizr.csstransforms) ?
			'docs-transform docs-brochure' :
			'docs-brochure';

		sample.flipbook = $('<div />', {'class': bookClass}).
			html(
				'<div ignore="1" class="tabs"><div class="left">  </div> <div class="right"> </div></div>' +
				'<div class="hard"></div>' +
				'<div class="hard"></div>' +
				'<div class="hard p29"></div>' +
				'<div class="hard p30"></div>'
			).
			appendTo($('#book-zoom'));

		$('.docs-brochure .tabs').hide();

		loadFlipbook(sample.flipbook);

	} else {
			
		bookshelf.showSample();

	}

});

});

})(jQuery);