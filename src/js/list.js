// nav二级导航
$(function(){
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

    //main部分hover效果
    $('.ashow ul a li').hover(function() {
        $(this).find('span').css('display','none');
        $(this).find('i').css('display','block');
    }, function() {
        $(this).find('span').css('display','inline');
        $(this).find('i').css('display','none');
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
    
    var top = $('.top').height()+$('.logo').height()+$('.nav').height()+$('.main_t').height()+$('.main_c').height();
    function xiding(){
        //获取滚动距离
        var scrollTop=window.scrollY;
        if(scrollTop>=top){
            $('.xiding').css('top',0);
        }else{
            $('.xiding').css('top','-76px');
        }
        
    }
    //数据渲染函数
    function creat(arr){
        var res = arr.map(function(item){
        return `<li data-id="${item.id}">
                    <div class="info">
                        <div class="icon">
                            <img src="../img/icon-bl-2.png" alt="" />
                        </div>
                        <div class="img">
                            <a href="#" title="${item.line}">
                                <img src="${item.url}" alt="" />
                            </a>
                        </div>
                        <div class="money">
                            <div class="money_l">￥${item.price}</div>
                        </div>
                        <div class="txt">
                            <div class="line">
                                <a href="" title="${item.line}">${item.line}</a>
                            </div>
                            <div class="count">
                                <a href="#" title="${item.count}">${item.count}</a>
                            </div>
                        </div>
                        <div class="talk">
                            <div class="msg">${item.msg}</div>
                        </div>
                        <div class="join">
                            <button>${item.join}</button>
                        </div>
                    </div> 
                </li>
            `;
                    }).join('');       
        $('.goodslist').html(res);




    }
    var pagelist=1;//当前页数
    var pagetotal=0;
    var listnum=0;//当前页数记录数
    //请求ajax
    function xuanran(type){
        $.ajax({
          type:"POST",//请求方式
            url:"../api/goodlist.php",//接口路径
            async:true,//异步
            data:{//传输数据
                'APItype':type,
                'page':pagelist,
                'qty':5
            },
            success:function(str){//成功回调
                var arr=JSON.parse(str);
                // console.log(arr);
                //生成页码数
                var pageNum=Math.ceil(arr.listall.length/arr.qty);
                // console.log(pageNum);
                pagetotal=pageNum;
                listnum=arr.list.length;
                //数据渲染
                creat(arr.list);



            }
        });
    }
    xuanran('goodlist');
     //页码切换页面(创建出来的节点用事件监听)
    function change(type){
        $('.page').on('click','.pagenum',function(){
            pagelist=$('.page .pagenum').eq($(this).index()-1).text();
            console.log(pagelist);
            xuanran(type);
            $('.page .pagenum').removeClass('active');
            $(this).addClass('active');
        });  
    }
    change('goodlist');
    //点击上一页返回上一页
    function prev(type){
        pagelist--;
        if(pagelist<=1){
            pagelist=1;
        }
        console.log(pagelist);
        xuanran(type);
        $('.page .pagenum').removeClass('active');
        $('.page .pagenum').eq(pagelist-1).addClass('active');  
    }
    $('.prev').click(function(){
        prev('goodlist');
    });
    //点击下一页返回下一页
    function next(type){
        pagelist++;
        if(pagelist>=pagetotal){
            pagelist=pagetotal;
        }
        xuanran(type);
        $('.page .pagenum').removeClass('active');
        $('.page .pagenum').eq(pagelist-1).addClass('active');
    }
    $('.next').click(function(){
        next('goodlist');
    });


    // 价格排序
    var istrue = true;
    $('.paixu').click(function(){
        istrue=!istrue;
        // console.log(istrue);
        $('.main_bl li').removeClass('on');
        $('.paixu').addClass('on');

            if(!istrue){//升序
                $('.paixu i').css('background-position','-21px center');
                $.ajax({
                    type:'POST',
                    url:'../api/goodlist.php',
                    async:true,
                    data:{
                        'APItype':'goodlistup',
                        'page':1,
                        'qty':5,
                    },
                    success:function(str){
                        var arr=JSON.parse(str);
                        creat(arr.list);
                             
                    }
                });
            }else{//降序
                $('.paixu i').css('background-position','-14px center');
                $.ajax({
                    type:'POST',
                    url:'../api/goodlist.php',
                    async:true,
                    data:{
                        'APItype':'goodlistdown',
                        'page':1,
                        'qty':5,
                    },
                    success:function(str){
                        var arr=JSON.parse(str);
                        creat(arr.list);
                         
                    }
                });
            }
            
    });

    //综合排序
    $('.zonghe').click(function(){
        $('.main_bl li').removeClass('on');
        $('.zonghe').addClass('on');

        $.ajax({
            type:'POST',
            url:'../api/goodlist.php',
            async:true,
            data:{
                'APItype':'goodlist',
                'page':pagelist,
                'qty':5
            },
            success:function(str){
                var arr=JSON.parse(str);
                creat(arr.list);
                     
            }
        });
    });


    //获取ID到详情页
    $('.goodslist').delegate('li','click',function(){
        // console.log($(this).attr('data-id'));
        location.href = '../html/goods.html?'+$(this).attr('data-id');
    });

    
    
});