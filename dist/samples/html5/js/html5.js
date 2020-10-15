(function($) {

var sampleName = 'html5',
	samplePath = 'samples/html5/',
	zoomIn = false;

// Why this?  Chrome has the fault:
// http://code.google.com/p/chromium/issues/detail?id=128488
function isChrome() {

	return navigator.userAgent.indexOf('Chrome/19')!=-1 ||
		navigator.userAgent.indexOf('Chrome/20')!=-1;

}

function updateDepth(book, newPage) {

	var page = book.turn('page'),
		pages = book.turn('pages'),
		depthWidth = Math.round(16*Math.min(1, page*2/pages));

		newPage = newPage || page;

	if (newPage>3)
		$('.html5-book .p2 .depth').css({
			width: depthWidth,
			left: 20 - depthWidth
		});
	else
		$('.html5-book .p2 .depth').css({width: 0});

		depthWidth = Math.round(16*Math.min(1, (pages-page)*2/pages));

	if (newPage<pages-3)
		$('.html5-book .p111 .depth').css({
			width: depthWidth,
			right: 20 - depthWidth
		});
	else
		$('.html5-book .p111 .depth').css({width: 0});

}

function loadPage(page) {
	
	if (page==3)
		$.ajax({url: samplePath + 'pages/page' + page + '.html?'+Math.random()}).
			done(function(pageHtml) {
				$('.html5-book .p' + page).html(pageHtml);
			});

}

function addPage(page, book) {

	var id, pages = book.turn('pages');

	var element = $('<div />',
		{'class': 'own-size',
			css: {width: 460, height: 582}
		}).
		html('<div class="loader"></div>');

	if (book.turn('addPage', element, page)) {
		loadPage(page);
	}
	
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
		gradients: !$.isTouch,
		autoCenter: true,
		duration: 1000,
		pages: 112,
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

			updateDepth(book, page);
			
			if (page>=2)
				$('.html5-book .p2').addClass('fixed');
			else
				$('.html5-book .p2').removeClass('fixed');

			if (page<book.turn('pages'))
				$('.html5-book .p111').addClass('fixed');
			else
				$('.html5-book .p111').removeClass('fixed');

			
			if (!$('.splash .bookshelf').is(':visible')) {
				Hash.go('samples/' + sampleName+'/'+page).update();
			}
				
		},

		turned: function(e, page, view) {

			var book = $(this),
				pages = book.turn('pages');

			updateDepth(book);

			$('#slider').slider('value', getViewNumber(book, page));

			book.turn('center');

		},

		start: function(e, pageObj) {

			bookshelf.moveBar(true);

		},

		end: function(e, pageObj) {
		
			var book = $(this);

			updateDepth(book);

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

	bookshelf.preloadImgs(['book-covers.jpg'], samplePath + 'pics/',
	function() {

	if (action=='preload') {
		return;
	}

	sample.previewWidth = 115;
	sample.previewHeight = 73;
	sample.previewSrc = samplePath + 'pics/preview.jpg';
	sample.tableContents = 5;
	sample.shareLink = 'http://' + location.host + '/#'+samplePath;
	sample.shareText = 'A book about Steve Jobs in HTML5 using the new turn.js via @turnjs';


	// Report that the flipbook is loaded

	bookshelf.loaded(sampleName);


	if (!sample.flipbook) {

		var bookClass = (Modernizr.csstransforms) ?
			'html5-book-transform html5-book' :
			'html5-book';

		sample.flipbook = $('<div />', {'class': bookClass}).
			html(
				'<div depth="5" class="hard"> <div class="side"></div> </div>' +
				'<div depth="5" class="hard front-side"> <div class="depth"></div> </div>' +
				'<div class="hard fixed back-side p111"> <div class="depth"></div> </div>' +
				'<div class="hard p112"></div>'
			).
			appendTo($('#book-zoom'));

		loadFlipbook(sample.flipbook);

	} else {
			
		bookshelf.showSample();

	}

});

});

})(jQuery);