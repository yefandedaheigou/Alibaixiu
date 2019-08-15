// 给选择文件绑定事件
$('#logo').on('change', function(){
   // 获取选择的图片文件
   var file = this.files[0]
   // 创建空的表单对象上传二级制文件
   var formData = new FormData()
   // 将选择的文件添加到表单对象中
   formData.append('logo', file)
   if(file){
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
            $('#hiddenLogo').val(data[0].logo)
         }
      })
   }
})

// 给表单绑定提交事件
$('#settingsForm').on('submit', function(){
   // 获取表单参数  参数字符串类型
   var formData = $(this).serialize()
   $.ajax({
      type: 'post',
      url: '/settings',
      data: formData,
      success: function(){
         location.reload()
      }
   })
   // 阻止表单默认提交行为
   return false
})
// if($('#comment_reviewed').prop('checked')){
//    console.log(11); 
// }else {
//    console.log(222)
// }
// 向服务器请求网站设置数据
$.ajax({
   type: 'get',
   url: '/settings',
   success: function(data){
      console.log(data); 
      // 将图片地址添加到隐藏表单中
      $('#hiddenLogo').val(data.logo)
      // 将图片预览在页面
      $('#logoImg').prop('src', data.logo)
      // 将网站标题显示在页面
      $('#site_keywords').val(data.title)
      // 将选择的评论功能展示在页面
      $('#comment_status').prop('checked', data.comment)
      // 将选择的审核功能展示到页面
      $('#comment_reviewed').prop('checked', data.review)
   }
})
