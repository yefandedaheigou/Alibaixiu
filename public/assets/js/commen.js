$(function(){
   $('#logout').on('click',function(){
      // 弹出确认框  返回布尔值
      var flag = confirm('您确定退出?')
      if(flag){
         $.ajax({
            type: 'post',
            url: '/logout',
            success: function(data){
               location.href = 'login.html'
            },
            error: function(){
               alert('退出失败')
            }
         })
      }
   })
})