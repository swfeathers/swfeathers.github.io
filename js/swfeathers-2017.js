	// Script for menu highlight
	$('body').scrollspy({ target: '.navbar', offset: 48 });

	// jQuery to shrink the navbar on scroll
	$(window).scroll(function() {
    $(".navbar").offset().top > 48 ? $(".navbar").addClass("top-nav-shrink") : $(".navbar").removeClass("top-nav-shrink")
	});

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		if ($anchor.attr('href') == '#contact'){var $offset = 0}
			else {var $offset = 48};
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top-$offset
			}, 1250, 'easeInOutExpo');
		event.preventDefault();
	});
	
	// Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
    	$('.navbar-toggler:visible').click();
    });

	// YouTube Modal
    $('#videoModal').on('show.bs.modal', function (event) {
	  var videoThumbnail = $(event.relatedTarget) // Button that triggered the modal
	  var videoSrc = videoThumbnail.data('videoid') // Extract info from data-* attributes
	  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
	  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
	  var artist = videoThumbnail.data('artist')
	  var title = videoThumbnail.data('title')
	  var credit = videoThumbnail.data('credit')
	  var modal = $(this)
	  modal.find('.modal-artist').html(artist)
	  modal.find('.modal-title').html(title)
	  modal.find('.modal-credit').html(credit)
	  modal.find('.modal-body iframe').attr('src', videoSrc)
	})
	$('#videoModal').on('hide.bs.modal', function (event) {
	  var modal = $(this)
	  modal.find('.modal-body iframe').attr('src', '')
	})

	// Browser Update Script
	var $buoop = {vs:{i:10,f:-8,o:-8,s:8,c:-8},unsupported:false,api:4}; 
	function $buo_f(){ 
	 var e = document.createElement("script"); 
	 e.src = "//browser-update.org/update.min.js"; 
	 document.body.appendChild(e);
	};
	try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
	catch(e){window.attachEvent("onload", $buo_f)}


	// Google Analytics
  //(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  //(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  //m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  //})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-10926428-7', 'auto');
  ga('send', 'pageview');