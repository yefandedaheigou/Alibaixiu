// 从地址栏获取id
var postId = getURL('id')

// 根据id获取相应的文章详细信息
$.ajax({
   type: 'get',
   url: '/posts/' + postId,
   success: function(data){
      console.log(data);
      
      // 拼接文章详细信息模板
      var html = template('postTpl', data)
      // 将模板添加到页面
      $('#postList').html(html)
   }
})

// 为点赞按钮绑定事件
$('#postList').on('click', '#like', function(data){
   $.ajax({
      type: 'post',
      url: '/posts/fabulous/' + postId,   
      success: function(){
         alert('感谢支持!')
      }
   })
})