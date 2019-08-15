// 获取地址栏中的参数
 var id = getURL('categoryId')
console.log(id);

//  根据id参数获取文章返回列表
$.ajax({
   type: 'get',
   url: '/posts/category/' + id,
   success: function(data){
      // 配置获取的分类文章模板
      var html = template('newTpl', {data: data})
      // 添加到页面
      $('#newList').html(html)
   }
})

// 根据id参数获取文章分类标题
$.ajax({
   type: 'get',
   url: '/categories/' + id,
   success: function(data){
      // 将返回的标题内容添加到标题中
      $('#header').html(data.title)
   }
})