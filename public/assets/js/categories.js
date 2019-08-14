// 给表单绑定提交事件
$('#addcategories').on('submit', function(){
   // 获取表单提交参数  获取字符串格式参数
   var formData = $(this).serialize()
   $.ajax({
      type: 'post',
      url: '/categories',
      data: formData,
      success: function(){
         location.reload()
      }
   })
   // 阻止表单默认提交
   return false
})

// 发送ajax请求向服务器获取列表数据
$.ajax({
   type: 'get',
   url: '/categories',
   success: function(data){
      // 配置分类列表模板
      var html = template('categoriesTpl', {data: data})
      // 将配置模板插入到页面
      $('#categoriesList').html(html)
   }
})

// 利用事件委托给编辑按钮绑定事件
$('#categoriesList').on('click', '.edit', function(){
   // 获取点击按钮的id
   var id = $(this).attr('data-id')
   $.ajax({
      type: 'get',
      url: '/categories/' + id,
      success: function(data){
         // 配置编辑分类模板
         var html = template('modifyTpl', data)
         // 将模板添加到页面
         $('#modifyList').html(html)
      }
   })
})

// 利用事件委托给删除按钮绑定事件
$('#categoriesList').on('click', '.remove', function(){
   // 弹出确认框  返回布尔值
   var flag = confirm('确认删除?')
   if(flag){
       // 获取删除按钮id
      var id = $(this).attr('data-id')
      $.ajax({
         type: 'delete',
         url: '/categories/' + id,
         success: function(){
            location.reload()
      }
   })
   }
})

// 利用事件委托给编辑表单绑定提交事件
$('#modifyList').on('submit', '#modifycategories', function(){
   // 获取编辑表单id
   var id = $(this).attr('data-id')
   // 获取表单参数   字符串类型参数
   var formData = $(this).serialize()
   $.ajax({
      type: 'put',
      url: '/categories/' + id,
      data: formData,
      success: function(){
         location.reload()
      }
   })
   // 阻止表单默认提交
   return false
})