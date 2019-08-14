// 给表单添加绑定提交事件 添加用户
$('#userForm').on('submit', function(){
   // 获取用户输入的表单信息  并使用serialize方法 获取表单信息并转换为字符串参数
   var formData = $(this).serialize()
   $.ajax({
      type: 'post',
      url: '/users',
      data: formData,
      success: function(){
         location.reload()
      },
      error: function(){
         alert('添加失败')
      }
   })
   return false
})

// 利用事件委托给上传文件绑定事件
$('#modifyBox').on('change', '#avatar', function(){
   // 创建一个空的表单对象
   var formData = new FormData()
   // 给表单对象添加属性和属性值
   formData.append('avatar', this.files[0])
   $.ajax({
      type: 'post',
      url: '/upload',
      data: formData,
      // 表单对象post不需要解析参数
      processData: false,
      // 表单对象不需要设置参数格式
      contentType: false,
      success: function(data){
         // 给图片添加src路径 实现预览
         $('#preview').prop('src', data[0].avatar)
         // 给提交图片内容的文框添加上传图片的路径信息
         $('#hiddenAvatar').val(data[0].avatar)
      }
   })
})

// 请求用户列表数据渲染
$.ajax({
   type: 'get',
   url: '/users',
   success: function(data){
      // 配置用户列表内容模板
      var html = template('userTpl', {data: data})
      // 添加到页面中
      $('#userList').html(html)
   }
})

// 利用事件委托给编辑按钮绑定事件
$('#userList').on('click', '.edit', function(){
   // 获取编辑的用户id
   var id = $(this).attr('data-id')
   $.ajax({
      type: 'get',
      url: '/users/' + id,
      success: function(data){
         // 配置模板
         var html = template('editTpl', data)
         // 添加到页面
         $('#modifyBox').html(html)
      }
   })
})

// 利用事件委托给删除按钮绑定事件
$('#userList').on('click', '.remove', function(){
   // 弹出确认框  返回布尔值
   var flag = confirm('确定删除用户')
   if(flag){
      // 获取需要删除用户的id
      var id = $(this).attr('data-id')
      $.ajax({
         type: 'delete',
         url: '/users/' + id,
         success: function(){        
            location.reload()
         }
      })
   }
})

// 给修改表单绑定提交事件 修改用户
$('#modifyBox').on('submit', '#modifyForm', function(){
   // 获取提交表单的值 并转换为参数字符串
   var formData = $(this).serialize()
   // 获取修改的用户id
   var id = $(this).attr('data-id')
   // 发送ajax请求
   $.ajax({
      type: 'put',
      url: '/users/' + id,
      data: formData,
      success: function(data){
         location.reload()
      }
   })
   return false
})

// 给全选按钮绑定事件
$('.checkAll').on('click', function(){
   // 获取当前全选按钮的状态
   var status = $(this).prop('checked')
   // 判断全选按钮状态  显示批量删除按钮
   if(status){
      $('#removeMany').show()
   }else{
      $('#removeMany').hide()
   }
   // 获取用户列表下的所有按钮   并把按钮状态更改为全选按钮的状态
   $('#userList').find('input').prop('checked' , status)
})

// 给用户列表下的所有按钮绑定事件
$('#userList').on('click', '.userStatus', function(){
   // 获取当前所有按钮  返回数组形式
   var inputs = $('#userList').find('input')
   // 判断所有按钮的个数和选中按钮的个数是否相等 
   if(inputs.length == inputs.filter(':checked').length){
      // 如果个数一致说明全选  把全选按钮状态改为选中
      $('.checkAll').prop('checked', true)
   }else {
      $('.checkAll').prop('checked', false)
   }
   // 判断如果有按钮为选中   显示批量删除
   if(inputs.filter(':checked').length){
      $('#removeMany').show()
   }else{
      $('#removeMany').hide()
   }
})

// 给批量删除绑定事件
$('#removeMany').on('click', function(){
   // 获取状态为选中的按钮   返回的是一个数组
   var checkUser = $('#userList').find('input').filter(':checked')
   // 声明空数组  用于接收选中状态按钮的id值
   var ids = []
   // 遍历为选中状态的按钮数组
   checkUser.each(function(index, itme){
      // 将选中状态按钮的id值添到空数组
      ids.push($(itme).attr('data-id'))
   })
   // 弹出确认框  返回布尔值
   var flag = confirm('确定要批量删除')
   if(flag){
      $.ajax({
         type: 'delete',
         url: '/users/' + ids.join('-'), // 将数组转换为以 - 分割的字符串
         success: function(){
            location.reload()
         }
      })
   }
})