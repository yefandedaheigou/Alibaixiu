// 给文件选择时绑定事件
$('#file').on('change', function(){
   // 获取选中的文件
   var file = this.files[0];
   // 创建空的对象表单用于上传二进制文件
   var formData = new FormData()
   // 把选中的文件添加对象表单
   formData.append('image', file)
   $.ajax({
      type: 'post',
      url: '/upload',
      data: formData,
      // 表单对象不需要解析
      processData: false,
      // 表单对象不需要设置参数类型
      contentType: false,
      success: function(data){
         // 给隐藏的上传图片表单添加值
         $('#image').val(data[0].image)
      }
   })
})

// 给表单绑定提交事件
$('#slidesForm').on('submit', function(){
   // 获取表单提交参数  字符串类型参数
   var formData = $(this).serialize(); 
   $.ajax({
      type: 'post',
      url: '/slides',
      data: formData,
      success: function(data){
         location.reload()
      }
   })
   // 阻止表单默认提交
   return false
})

// 向服务器请求轮播图数据
$.ajax({
   type: 'get',
   url: '/slides',
   success: function(data){
      // 配置轮播图展示模板
      var html = template('imageTpl', {data: data})
      // 将模板添加到页面
      $('#slidesList').html(html)
   }
})

// 事件委托给删除按钮绑定事件
$('#slidesList').on('click', '.remove', function(){
   // 弹出确认框  返回布尔值
   var flag = confirm('确认删除?')
   // 获取当前删除按钮的id
   var id = $(this).attr('data-id')
   if(flag){
      $.ajax({
         type: 'delete',
         url: '/slides/' + id,
         success: function(){
            location.reload()
         }
      })
   }
})