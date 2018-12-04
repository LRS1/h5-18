$(function(){
    //nav二级导航
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

    //banner轮播图
    $('.banner').hover(function() {
        $('.page li').css('display','block');
    }, function() {
        $('.page li').css('display','none');
    });

    var Lis = $('.img li');
    var num=0;//当前的
    var nowindex=2;//层级

    //开定时器
    var timer=null;
    clearInterval(timer);
    timer=setInterval(autoplay,3000);
    // $('.img li').eq(0).css('opacity',1);
    
    //切换到下一张
    function autoplay(){
        num++;
        if(num>=Lis.length){//临界值
            num=0;
        }
        tab();//切换的函数
        light();
    }

    function tab(){
        //* 大图：不断改变z-index。
        Lis[num].style.zIndex = nowindex++;
        Lis[num].style.opacity = 0;
        startMove(Lis[num],{'opacity':100});
        Lis[num].style.background = randomColor(16);
        light();
    }
    
    $('.banner').hover(function() {
        console.log(99999);
        clearInterval(timer);
    }, function() {
        clearInterval(timer);
        timer=setInterval(autoplay,3000);
    });

    //焦点跟随
    function light(){
        $('.round li a').removeClass('red');
        $('.round li a').eq(num).addClass('red');
    }

    //点击左右按钮，切换上下张
    $('.page .prev').click(function(){
        num--;
        if(num<0){
            num= Lis.length-1;
        }
        tab();
        light();
    });

    $('.page .next').click(function(){
        autoplay();
        light();
    });

    //点击焦点可以切到对应的图片
    $('.round li').mousemove(function(){
    var _this=$(this).index();
    // console.log(_this);
    
    if(num<_this){
        //从右侧进来
        //旧的挪到左侧
        // $('.focus li').eq(num).animate({'left':-iW},1000);
        startMove(Lis[num],{'opacity':0});
        //新的放在右侧，挪到可视区
        // $('.focus li').eq(_this).css('left',iW);
        // $('.focus li').eq(_this).animate({'left':0},1000);
        startMove(Lis[_this],{'opacity':100});
        num=_this;
        
    }
    
    if(num>_this){
        //从左侧进来
        //旧的挪到右侧
        // $('.focus li').eq(now).animate({'left':iW},1000);
        startMove(Lis[num],{'opacity':0});
        //新的放在左侧，挪到可视区
        // $('.focus li').eq(_this).css('left',-iW);
        // $('.focus li').eq(_this).animate({'left':0},1000);
        startMove(Lis[_this],{'opacity':100});
        num=_this;

        

    }
    
    light();
    
});
    
    //banner2轮播图
    var wNum = $('.banner2_r ul li').size()*$('.banner2_r ul li').eq(0).outerWidth();//ul宽度

    $('.banner2_r ul').css('width',wNum);
    var iW = $('.banner2_r ul li').eq(0).outerWidth()*6;//运动距离

    //2、开定时器，每次运动6个图距离，往左边运动：-6*iW
    var timer2=null;
    clearInterval(timer2);
    timer2=setInterval(xia,5000);//间隔时间

    function xia(){//动画时间间隔：5000-2000
        $('.banner2_r ul').animate({'left':-iW},5000,function(){
            //出去的图片，剪切放到末尾
            $('.banner2_r ul li:lt(6)').insertAfter($('.banner2_r ul li:last'));
            //ul归位
            $('.banner2_r ul').css('left',0);
        });
    }

    function prev(){
        //先剪切最后的六个图插入到ul首位
        for(var i=0;i<6;i++){
            $('.banner2_r ul li:last').insertBefore($('.banner2_r ul li:first'));
        }
        //预留4个图位置
        $('.banner2_r ul').css('left',-iW);
        //挪到可视区
        $('.banner2_r ul').animate({'left':0},5000);
    }

    $('.banner2_r').hover(function(){
        clearInterval(timer2);
    },function(){
        clearInterval(timer2);
        timer2=setInterval(xia,5000);//间隔2秒切一个图
    });
    
    //点击切换下一页：四张图
    $('.next2').click(function(){
        xia();
    });
    
    $('.prev2').click(function(){
        prev();
    });


    // banner3轮播图
    var bLis = $('.banner3_box ul li');
    var num2=0;//当前的
    var iW2 = $('.banner3_box ul li').width();

    //2.第一个图放到可视区
    $('.banner3_box ul li').eq(0).css('left',0);

    //3、不断的轮下一张，开定时器：旧图挪走，新图进入可视区
    var time = null;
    clearInterval(time);
    time = setInterval(next2, 3000); //每隔2秒切一张图

    function next2(){
        //旧图挪走 num=0
        startMove(bLis[num2], {
            'left': -iW2
        });

        //新图进入可视区  num=1,先把新图放在右侧，再挪进来
        //      num++;
        num2 = ++num2 >= bLis.length ? 0 : num2;
        bLis[num2].style.left = iW2 + 'px';
        startMove(bLis[num2], {
            'left': 0
        }); //挪到可视区

        light2();
    }

    //鼠标经过停止轮播
    $('.banner3_l').hover(function() {
        clearInterval(time);
    }, function() {
        clearInterval(time);
        time=setInterval(next2,2000);//间隔2秒切一个图
    });

    //焦点跟随
    function light2(){
        $('.bar li').removeClass('active');
        $('.bar li').eq(num2).addClass('active');
    }

    //焦点切换图片
    $('.bar li').mousemove(function(){
        var _this=$(this).index();
    
        if(num2<_this){
            //从右侧进来
            //旧的挪到左侧
            $('.banner3_box ul li').eq(num2).animate({'left':-iW2},1000);
            
            //新的放在右侧，挪到可视区
            $('.banner3_box ul li').eq(_this).css('left',iW2);
            $('.banner3_box ul li').eq(_this).animate({'left':0},1000);
            
            num2=_this;
            
        }
        
        if(num2>_this){
            //从左侧进来
            //旧的挪到右侧
            $('.banner3_box ul li').eq(num2).animate({'left':iW2},1000);
            
            //新的放在左侧，挪到可视区
            $('.banner3_box ul li').eq(_this).css('left',-iW2);
            $('.banner3_box ul li').eq(_this).animate({'left':0},1000);
            
            num2=_this;

        }
        light2();
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

    //首页渲染数据
    
    $.ajax({
        url: '../api/getdata.php',
        type: 'POST',
        data: {
          
        },
        success:function(str){//成功回调
                        var arr=JSON.parse(str);
                        // console.log(arr);
                        xuanran(arr);
                        
                }


    });

    function xuanran(arr){
        var list = document.querySelector('.like_b');

        var res = arr.map(function(item){
                        return `<li data-id="${item.id}">
                                    <div class="show">
                                        <div class="img">
                                            <a  href="http://news.baidu.com"><img src="${item.url}" alt="" /></a>
                                        </div>
                                        <div class="name">
                                            <a  href="http://news.baidu.com" title="${item.txt}">${item.txt}</a>
                                        </div>
                                        <div class="money">￥<span>${item.price}</span><a  href="http://news.baidu.com">收藏</a></div>
                                    </div>


                                </li>
                            `;
                    }).join('');
        // console.log(res);
        
        list.innerHTML += res;
    }
    

    //首页 Cookies
    
    var name =Cookie.get('usn');
    
    
    if(name){
        $('ul.top_r li.box').css('display','none');
        $('ul.top_r li.box2').css('display','inline');
        $('ul.top_r li.box2 i').html('Hi,&nbsp;&nbsp;&nbsp;'+name);
        $('.tuichu').click(function(){
            console.log(name);
            // Cookie.remove(name);
            var now=new Date();
            now.setDate(now.getDate()-1);
            Cookie.set('usn','no',{expires:now,path:'/'});
            location.reload();
        })
    }else{
        $('ul.top_r li.box2').css('display','none');
    }

    
    
    

});