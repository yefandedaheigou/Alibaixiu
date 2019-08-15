// 向服务请求轮播图数据
$.ajax({
   type: 'get',
   url: '/slides',
   success: function(data){
      // 配置轮播图模板
      var html = template('slidesTpl', {data: data})   
      // 将模板添加到页面
      $('#slidesList').html(html)

     // 轮播图配置
    var swiper = Swipe(document.querySelector('.swipe'), {
      auto: 3000,
      transitionEnd: function (index) {
        // index++;
        $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
      }
    });
    // 上/下一张
    $('.swipe .arrow').on('click', function () {
      var _this = $(this);

      if(_this.is('.prev')) {
        swiper.prev();
      } else if(_this.is('.next')) {
        swiper.next();
      }
    })
   }
})

// 向服务器发送请求最新发布数据
$.ajax({
   type: 'get',
   url: '/posts/lasted',
   success: function(data){
      // 配置最新发布模板
      var html = template('newTpl', {data: data})
      // 将配置的模板添加到页面
      $('#newList').html(html)
   }
})
