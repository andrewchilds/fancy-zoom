(function($){
$.fn.fancyZoom = function(options){

  var options   = options || {};
  var directory = options && options.directory ? options.directory : 'images';
  var zooming   = false;

  if ($('#zoom').length == 0) {
    var html = '<div id="zoom-container"> \
									<div id="zoom"> \
	                  <div id="zoom-content"></div> \
	                  <a href="#" title="click to cancel" id="zoom-cancel"> \
	                  	<img src="' + directory + '/closebox.png" alt="cancel button" /> \
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

    $('#zoom-cancel').click(hide);
  }

  var zoom          = $('#zoom');
  var zoom_cancel    = $('#zoom-cancel');
  var zoom_content  = $('#zoom-content');

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

		//$('#zoom-content').css({width:width, height: height});
		
	zoom_cancel.hide();

    if (options.closeOnClick) {
      $('#zoom').click(hide);
    }

	if (options.scaleImg) {
 		zoom_content.html(content_div.html());
 		$('#zoom-content img').css('width', '100%');
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
		zoom_cancel.show();
		zooming = false;
    })
	
	if (options.overlay) {
		$('body').append('<div id="zoom-overlay"></div>');
		$('#zoom-overlay').fadeIn(125);
	}
		
    return false;
  }

  function hide() {
	if (options.overlay) {
		$('#zoom-overlay').fadeOut(125).remove();
	};
	
    if (zooming) return false;
	zooming         = true;
  
	$('#zoom').unbind('click');
	

	
	if (zoom_cancel.attr('scaleImg') != 'true') {
 		zoom_content.html('');
	}
	
	zoom_cancel.hide();
	$('#zoom').animate({
      top     : '100px',
      opacity : "hide",
      width   : '1px',
      height  : '1px'
    }, 250, null, function() {
      if (zoom_cancel.attr('scaleImg') == 'true') {
    		zoom_content.html('');
  		}
		zooming = false;
    });
    return false;
  }
}
})(jQuery);