// 发送请求获取文章列表信息
$.ajax({
   type: 'get',
   url: '/posts',
   success: function(data){
      // 配置文章列表模板
      var html = template('postsTpl', data)
      // 将模板添加到页面
      $('#postsList').html(html)
      // 配置分页模板
      var page = template('pageTpl', data)
      $('#pages').html(page)
   }
})

// 封装处理事件日期函数
function timer(data){
   // 将日期字符串转换为日期对象
   var date = new Date(data)
   // 拼接日期格式
   return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay()
}

// 封装跳转分页函数
function changePage(data){
   $.ajax({
      type: 'get',
      url: '/posts',
      data: {
         page: data
      },
      success: function(data){
         // 配置文章列表模板
         var html = template('postsTpl', data)
         // 将模板添加到页面
         $('#postsList').html(html)
         // 配置分页模板
         var page = template('pageTpl', data)
         $('#pages').html(page)
      }
   })
}

// 发送请求获取分类下拉框信息
$.ajax({
   type: 'get',
   url: '/categories',
   success: function(data){
      // 配置分类下拉菜单模板
      var html = template('categoryTpl', {data: data})
      // 把模板添加到页面
      $('#categoryList').html(html)
   }
})

// 给筛选按钮绑定表单提交事件
$('#filterForm').on('submit', function(){
   // 获取筛选字符串形式的表单参数
   var formData = $(this).serialize() 
   $.ajax({
      type: 'get',
      url: '/posts',
      data: formData,
      success: function(data){
          // 配置文章列表模板
         var html = template('postsTpl', data)
         // 将模板添加到页面
         $('#postsList').html(html)
         // 配置分页模板
         var page = template('pageTpl', data)
         $('#pages').html(page)
      }
   })
   // 阻止表单默认提交行为
   return false
})

// 事件委托给删除按钮绑定事件
$('#postsList').on('click','.remove', function(){
   // 弹出确认框  返回布尔值
   var flag = confirm('确定删除?')
   if(flag){
      // 获取当前删除按钮的id
      var id = $(this).attr('data-id')
      $.ajax({
         type: 'delete',
         url: '/posts/' + id,
          success: function(){
             location.reload()
          }
      })
   }
})

