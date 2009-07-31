(function($){
$.fn.fancyZoom = function(options){

  var options   = options || {};
  var directory = options && options.directory ? options.directory : 'images';
  var zooming   = false;

  if ($('#zoom').length == 0) {
    var html = '<div id="zoom-holder" style="position: absolute; width: 100%; left: 0; top: 0;"> \
					<div id="zoom" style=" background:#fff; display:none; position: relative; margin: 0 auto; z-index: 150"> \
	                  	<div id="zoom_content" style="width: 100%; height: 100%"> \
	                  	</div> \
	                  	<a href="#" title="Close" id="zoom_close" style="position:absolute; bottom:0; right:0;"> \
	                    	<img src="' + directory + '/closebox.png" alt="Close" style="border:none; margin:0; padding:0;" /> \
	                  	</a> \
                	</div> \
				</div>';

    $('body').append(html);
	
	if (options.closeOnClick) {
	    $('html').click(function(e){if($(e.target).parents('#zoom:visible').length == 0) hide();});
	}
	
    $(document).keyup(function(event){
        if (event.keyCode == 27 && $('#zoom:visible').length > 0) hide();
    });

    $('#zoom_close').click(hide);
  }

  var zoom          = $('#zoom');
  var zoom_close    = $('#zoom_close');
  var zoom_content  = $('#zoom_content');

  this.each(function(i) {
    $($(this).attr('href')).hide();
    $(this).click(show);
  });

  return this;

  function show(e) {
    if (zooming) return false;
	zooming         	   = true;
	var content_div 	   = $($(this).attr('href'));
	var width              = (options.width || content_div.width());
	var height             = (options.height || content_div.height());

    $('#zoom').hide().css({
		top       : '100px',
		width     : '1px',
		height    : '1px'
	});

	zoom_close.hide();

    if (options.closeOnClick) {
      $('#zoom').click(hide);
    }

	if (options.scaleImg) {
 		zoom_content.html(content_div.html());
 		$('#zoom_content img').css('width', '100%');
	} else {
	  zoom_content.html('');
	}

    $('#zoom').animate({
	  top     : '100px',
	  opacity : "show",
	  width   : width,
	  height  : height
	}, 250, null, function() {
    	if (options.scaleImg != true) {
  			zoom_content.html(content_div.html());
		}
		zoom_close.show();
		zooming = false;
    })
	
	if (options.overlay) {
		$('body').append('<div id="fancy-overlay" style="background:#000; display:none; filter:alpha(opacity=70); -moz-opacity: 0.7; opacity:0.7; position: absolute; margin: auto; top: 0;left: 0; z-index: 100; width:  100%; height: 100%;"></div>');
		$('#fancy-overlay').fadeIn(125);
	}
		
    return false;
  }

  function hide() {
	if (options.overlay) {
		$('#fancy-overlay').fadeOut(125).remove();
	};
	
    if (zooming) return false;
	zooming         = true;
  
	$('#zoom').unbind('click');
	

	
	if (zoom_close.attr('scaleImg') != 'true') {
 		zoom_content.html('');
	}
	
	zoom_close.hide();
	$('#zoom').animate({
      top     : '100px',
      opacity : "hide",
      width   : '1px',
      height  : '1px'
    }, 250, null, function() {
      if (zoom_close.attr('scaleImg') == 'true') {
    		zoom_content.html('');
  		}
		zooming = false;
    });
    return false;
  }
}
})(jQuery);