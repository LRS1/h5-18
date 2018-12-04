/* 
* @Author: Marte
* @Date:   2018-11-28 17:47:11
* @Last Modified by:   Marte
* @Last Modified time: 2018-12-01 15:04:59
*/

$(document).ready(function(){
    
    // nav二级导航
    $('.nav_font').hover(function() {
        
        $('.nav_c').css('display','block');
    }, function() {
        $('.nav_c').css('display','none');
    });

    $('.nav_c').hover(function() {
        $('.nav_c').css('display','block');
    }, function() {
        $('.nav_c').css('display','none');
    });

    $('.nav_c3 li').hover(function() {
        $('.nav_c4').css('display','block');
    }, function() {
        $('.nav_c4').css('display','none');
    });
    $('.nav_c4').hover(function() {
        $('.nav_c4').css('display','block');
    }, function() {
        $('.nav_c4').css('display','none');
    });

    
    


    // 返回顶部
    
    window.onscroll = function(){
        var scrollTop = window.scrollY;//scrollTop()方法设置或获取被选元素的垂直滚动条距离 scrollY/scrollX获取浏览器窗口滚动条滚动过的距离
        if(scrollTop >= window.innerHeight){
            $('.totop').css('display','block');
        }else{
            $('.totop').css('display','none');
        }
        xiding();
    }

    //点击回到顶部，缓慢回到顶部
    $('.totop').click(function(){
        var timer = setInterval(function(){
            var scrollTop = window.scrollY;
            if(scrollTop>0){
                window.scrollTo(0,scrollTop-30);//scrollTo(x,y)设置浏览器滚动距离
            }else{
                clearInterval(timer);
            }
        },50)
    });

    

    // 吸顶菜单
    
    var top = $('.top').height()+$('.logo').height()+$('.nav').height();
    function xiding(){
        //获取滚动距离
        var scrollTop=window.scrollY;
        if(scrollTop>=top){
            $('.xiding').css('top',0);
        }else{
            $('.xiding').css('top','-76px');
        }
    }

    var res = (location.search).slice(1);//id=01
                //location.search 设置或返回从？开始的URL（查询部分）
                // console.log(res);//1
    
    $.ajax({
        type:'POST',
        async:true,
        url:'../api/goodlist.php',
        data:{
            'APItype':'goodlistDetail',
            'id':res,
        },
        success:function(str){
                init(str);
                //放大镜
                var magnifierConfig = {
        magnifier : "#magnifier1",//最外层的大容器
        width : 500,//承载容器宽
        height : 500,//承载容器高
        moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
        zoom : 5//缩放比例
    };

    var _magnifier = magnifier(magnifierConfig);
            }
    }); 

    function init(str){
        var arr = JSON.parse(str);
        // console.log(arr);
        var imgurl = arr[0].url;
        // console.log(imgurl);
        $('.small-img img').attr("src",imgurl);
        var biaoti = arr[0].line;
        $('.txt').html(biaoti);
        var price = arr[0].price;
        $('.price strong').html('￥'+price);
        var pingjia = arr[0].msg;
        $('.comment a span').html(pingjia);

        var title = arr[0].line;


        // 加入购物车
        // console.log($('.inp'));
        var num =  $('.inp').val();
        if(num<=1){
            $('.down').css('cursor','no-allowed');

        $('.add').click(function(){
            num++;
            if(num>=100){
                num = 100;
            }
            $('.inp').val(num);
        });
        $('.down').click(function(){
            num--;
            if(num<=1){
                num = 1;
            }
             $('.inp').val(num);       
        });

        // console.log(num);

        $('.btn-buy').click(function(){
            $('.shopcar b').html(num);


        
        $.ajax({
                type:'POST',
                async:true,
                url:'../api/shopcar.php',
                data:{
                    'title':title,
                    'num':num,
                    'price':price,
                    'url':imgurl,
                },
                success:function(str){
                        // console.log(str);
                             
                }
            });
    });


    }

        


    }    

    //获取购物车数量----------------------------------
            $.ajax({
                type:'POST',
                async:true,
                url:'../api/orderCar.php',
                data:{
                    'APItype':'orderCar',
                    'page':1,
                    'qty':25,
                },
                success:function(str){
                    var arr=JSON.parse(str);
                        // console.log(arr.list.length);
                        // var gouwuche=arr.list.length;
                        // $('#gouwuche').html(gouwuche);
                        // $('#gouwuche2').html(gouwuche);
                    }
            });
    
    
    


    
    

});