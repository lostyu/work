var cqc = {};

cqc.ui = {};
cqc.ui.tabs = function(objTabNav, objTabPanel, type) {
	type = type || 'click';	
	objTabNav.on(type, function() {
		var index = $(this).index();

		objTabNav.removeClass('active');
		$(this).addClass('active');
		objTabPanel.hide().eq(index).show();
	});
};
cqc.ui.scroll = function(obj) {
	obj[0].innerHTML += obj[0].innerHTML;
	var child = obj.children(),
		len = child.length,
		h = child.height(),
		timer = null,
		iNow = 0;


	timer = setInterval(function() {		
		iNow++;
		obj.animate({top: -h*iNow+'px'}, function() {
			if(iNow == len-1){
				iNow = 0;
				obj.css('top', 0);
			}
		});
	}, 10000);
};


cqc.app = {};
// 首页
cqc.app.index = function() {

	(function() {
		$(".d-fw-l").on("mouseenter", function() {
			$(".d-fw-tc1").fadeIn();
		});
		$(".d-fw-r").on("mouseenter", function() {
			$(".d-fw-tc2").fadeIn();
		});
		$(".d-fw-tc").on("mouseleave", function() {
			$(this).fadeOut();
		});
	})();
	
	(function() {
		var $tabsnav1 = $('#tabs-nav1 > .item');
		var $tabspanel1 = $('#tabs-panel1 > .tab-panel');
		var $tabsnav2 = $('#tabs-nav2 > h2');
		var $tabspanel2 = $('#tabs-panel2 > .item');

		cqc.ui.tabs($tabsnav1, $tabspanel1, 'mouseover');
		cqc.ui.tabs($tabsnav2, $tabspanel2, 'mouseover');
	})();

	(function() {
		var $scroll1 = $('#scroll1');
		cqc.ui.scroll($scroll1);
	})();	
};
// 个人主页
cqc.app.grzy = function() {
	var $tabsnav3 = $('#tabs-nav3 > h2'),
		$tabspanel3 = $('#tabs-panel3 > ul');

    cqc.ui.tabs($tabsnav3, $tabspanel3, 'mouseover');
    
    var $alListBox = $('#alListBox'),
    	$alList = $('.alList'),
    	oldH = $alListBox.height(),
    	h = $alList.height(),
    	bClick = false;

    $('#btn-alToggle').click(function() {
    	if(bClick){    		
    		$alListBox.animate({'height': oldH});
    		$(this).text('展开');
    	}else{
    		$alListBox.animate({'height': h});
    		$(this).text('收起');
    	}    	
    	bClick = !bClick;
    });
};

