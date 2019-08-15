// 获取浏览器地址中的关键字
var key = getURL('key')

// 向服务器发送搜索关键字请求 
$.ajax({
	type: 'get',
	url: '/posts/search/' + key,
	success: function (response) {
		var html = template('searchTpl', {data: response});
      $('#listBox').html(html);
	}
})