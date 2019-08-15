// 发送ajax请求向服务器请求分类列表数据
$.ajax({
   type: 'get',
   url: '/categories',
   success: function(data){  
      // 配置分类列表模板
      var html = template('categoriesTpl', {data: data})
      // 将配置模板添加到页面中
      $('#category').html(html)
   }
})

// 给上传文件绑定事件
$('#feature').on('change', function(){
   // 获取选择的文件
   var file = this.files[0];
   console.log(file);
   // 创建空的表单对象 上传二级制文件
   var formData = new FormData()
   // 给表单对象添加属性  将选择的文件追加到表单对象中
   formData.append('cover', file);
   $.ajax({
      type: 'post',
      url: '/upload',
      data: formData,
      // 表单对象不需要解析
      processData: false,
      // 表单对象不需要设置参数类型
      contentType: false,
      success: function(data){
      $('#thumbnail').val(data[0].cover)
      }
   })
})

// 给表单添加提交事件
$('#addForm').on('submit', function(){
   // 获取表单参数为字符串参数
   var formData = $(this).serialize();
   console.log(formData); 
   $.ajax({
      type: 'post',
      url: '/posts',
      data: formData,
      success: function(){
         location.href = 'posts.html'
      }
   })
   // 阻止表单默认提交
   return false
})

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
   // 如果不相等  返回-1
   return -1
}

// 获取当url地址的id参数
var id = getURL('id')

// 如果返回的不是-1  说明地址栏中有id参数   执行修改操作
if(id != -1){
   // 根据获取的id 请求服务器返回对应id的数据
   $.ajax({
      type: 'get',
      url: '/posts/' + id,
      success: function(data){
         // 发送ajax请求向服务器请求分类列表数据
         $.ajax({
            type: 'get',
            url: '/categories',
            success: function(response){
               // 将返回文章分类列表添加到data对象中
               data.response = response 
               // 配置修改文章模板
               var html = template('modifyTpl',data)
               $('#formBox').html(html)
            }
         })
      }
   })
}

// 利用事件委托给修改表单绑定提交事件
$('#formBox').on('submit', '#modifyForm', function(){
   // 获取当前表单数据的id'
   var id = $(this).attr('data-id')
   // 获取表单参数   参数字符串
   var formData = $(this).serialize()
   $.ajax({
      type: 'put',
      url: '/posts/' + id,
      data: formData,
      success: function(){
         location.href = 'posts.html'
      }
   })
   
   // 阻止表单默认行为
   return false
})