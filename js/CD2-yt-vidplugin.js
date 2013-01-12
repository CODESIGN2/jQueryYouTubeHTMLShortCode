jQuery(document).ready(function(){
	jQuery('.youtubevid').each(function(){
		var vid = jQuery(this).attr('id');
		var width = jQuery(this).attr('width');
		var height = jQuery(this).attr('height');
		jQuery(this).html('<iframe width="'+width+'" height="'+height+'" src="http://www.youtube-nocookie.com/embed/'+vid+'" frameborder="0" allowfullscreen></iframe>');
	});
});