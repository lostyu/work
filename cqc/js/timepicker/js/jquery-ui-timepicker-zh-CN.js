/* Simplified Chinese translation for the jQuery Timepicker Addon /
/ Written by Will Lu */
(function($) {
	$.timepicker.regional['zh-CN'] = {
		timeOnlyTitle: '选择时间',
		timeText: '时间',
		hourText: '小时',
		minuteText: '分钟',
		secondText: '秒钟',
		millisecText: '毫秒',
		microsecText: '微秒',
		timezoneText: '时区',
		currentText: '当前时间',
		closeText: '关闭',
		timeFormat: 'HH:mm',
		amNames: ['AM', 'A'],
		pmNames: ['PM', 'P'],
        monthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
        monthNamesShort: ["一","二","三","四","五","六","七","八","九","十","十一","十二"],
        dayNames: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
        dayNamesShort: ["日","一","二","三","四","五","六"],
        dayNamesMin:["日","一","二","三","四","五","六"],
        weekHeader: "Wk",
        prevText: "上一月",
        nextText: "下一月",
		isRTL: false
	};
	$.timepicker.setDefaults($.timepicker.regional['zh-CN']);
})(jQuery);
