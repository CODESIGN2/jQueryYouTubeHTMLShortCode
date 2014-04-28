jQuery(document).ready(function(){
	window.extractYTVid = function(elem) {
		var aspect = extractAspectRatio( elem, jQuery(elem).data('aspectratio') );
		var dimensions = arToWH(elem,aspect)
		var vid = jQuery(elem).attr('id');
		jQuery(elem).html( '<iframe width="'+dimensions.width+'" height="'+dimensions.height+'" src="'+vid+'" frameborder="0" allowfullscreen></iframe>' );
	};
	window.resizeYTVid = function(elem) {
		var aspect = extractAspectRatio( elem, jQuery(elem).data('aspectratio') );
		jQuery(elem).find('iframe').width(0); jQuery(elem).find('iframe').height(0);
		var dimensions = arToWH(elem,aspect)
		var vid = jQuery(elem).attr('id');
		jQuery(elem).find('iframe').width(dimensions.width);
		jQuery(elem).find('iframe').height(dimensions.height);
	};
	window.extractAspectRatio = function( elem , arRaw ) { // returns the aspect ratio
		var arData = [16,9]; // default to a 16:9 ratio
		if( typeof(arRaw) != 'undefined' ) {
			if ( arRaw.indexOf(':') >= 0 ) {
				arData = arRaw.split(':');
			}
		}
		var arObj = new Object();
		arObj.x = arData[0]; arObj.y = arData[1];
		return arObj;
	};
	window.arToWH = function( elem , ar ) { // returns the width & height based on aspect ratio
		var defWidth = 100.0; // Default width percentage
		var eWidth = parseFloat(jQuery(elem).width() );
		var eHeight = parseFloat( jQuery(elem).height() );
		if(eHeight > 1 && eWidth < 1){ // height set, width not set (generally overwrite with explicit css width:0px;)
			eWidth = eHeight / ar.y * ar.x;
		} else if(eHeight < 1 && eWidth < 1) { // if width & height set
			eWidth = defWidth+'%'; eHeight = ( ( defWidth/ar.x )*ar.y )+'%';
		} else { // if width set and not height
			eHeight = eWidth / ar.x * ar.y;
		}
		var obj = {};
		obj.width = eWidth; obj.height = eHeight;
		return obj;
	}
	jQuery(window).resize(function(){
		initAllYTVids();
	});
	window.initAllYTVids = function() {
		jQuery('.youtubevid').each(function(){
			if( jQuery(this).html().indexOf('<iframe') < 0 ) {
				extractYTVid(this);
			} else {
				resizeYTVid(this);
			}
		});
	}
	initAllYTVids();
});
