// 处理日期时间格式
function formateDate(date) {
   // 将日期时间字符串转换成日期对象
   date = new Date(date);
   return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
 }

// 封装一个查询地址参数的方法
function getURL(url){
   // 截取当前地址栏字符串的第一个字符    并把字符串以 = 分割成数组
   var arr = location.search.substr(1).split('&')
   // 遍历数组
   for(var i = 0; i < arr.length; i++){
      // 把数组中的元素再以 = 分割成数组
      var newArr = arr[i].split('=')
      // 判断如果数组中的第一个元素与参数相同  返回数组第二个元素也就是地址栏的id参数
      if(newArr[0] ==  url){
         return newArr[1]
      }   
	}
}
// 向服务器发送请求随机推荐数据
$.ajax({
	type: 'get',
	url: '/posts/random',
	success: function (response) {
		var randomTpl = `
			{{each data}}
			<li>
			  <a href="detail.html?id={{$value._id}}">
			    <p class="title">{{$value.title}}</p>
			    <p class="reading">阅读({{$value.meta.views}})</p>
			    <div class="pic">
			      <img src="{{$value.thumbnail}}" alt="">
			    </div>
			  </a>
			</li>
			{{/each}}
		`;
		// 配置随机推荐数据模板
		var html = template.render(randomTpl, {data: response});
		// 将模板添加到页面
		$('#randomBox').html(html)
	}
})

// 向服务器发送请求最新评论数据
$.ajax({
	type: 'get',
	url: '/comments/lasted',
	success: function (response) {
		var commentTpl = `
			{{each data}}
			<li>
			  <a href="javascript:;">
			    <div class="avatar">
			      <img src="{{$value.author.avatar}}" alt="">
			    </div>
			    <div class="txt">
			      <p>
			        <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
			      </p>
			      <p>{{$value.content}}</p>
			    </div>
			  </a>
			</li>
			{{/each}}
		`;
		// 配置最新评论模板	没有评论
		var html = template.render(commentTpl, {data: response});
		$('#commentBox').html(html);
	}
})

// 向服务器发送请求文章查询分类列表数据
$.ajax({
	type: 'get',
	url: '/categories',
	success: function (response) {      
		var navTpl = `
			{{each data}}
			<li>
				<a href="list.html?categoryId={{$value._id}}">
					<i class="fa {{$value.className}}"></i>{{$value.title}}
				</a>
			</li>
			{{/each}}
		`;
		// 配置文章查询分类模板
		var html = template.render(navTpl, {data: response});
		$('#navBox').html(html)
		$('#topNavBox').html(html)
	}
})

// 给搜索按钮绑定表单提交事件
$('.search form').on('submit', function(){
	var keys = $(this).find('.keys').val()
	// 跳转到相应页面  并样输入的值添加到url参数中
	location.href = 'search.html?key=' + keys
	// 阻止表单默认提交行为
	return false
})