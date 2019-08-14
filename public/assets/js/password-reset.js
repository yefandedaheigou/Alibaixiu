// 给表单绑定提交事件
$('#modifyForm').on('submit', function(){
   // 将表单内容转换为表单参数字符串
   var formData = $(this).serialize();
   $.ajax({
      type: 'put',
      url: '/users/password',
      data: formData,
      success: function(data){
         $('.alert').html(data.message)
         $('.alert').fadeIn(500)
         setTimeout(function(){
            location.href = 'login.html'
         },2000)
      },
      error: function(){
         alert('修改失败')
         location.reload()
      }
   })
   return false
})