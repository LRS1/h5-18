

$(document).ready(function(){
    
    $('input.quanxuan').css('display','inline');
    $('.no_points').css('display','none');
    $('.pay_form').css('display','inline');


    //获取到购物车数量    
        xuanyan();
        function xuanyan(){
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
                            // console.log(arr);
                     var arrs=arr.list;
                            init(arrs);
                    }
                });
        }

     //渲染数据
    function init(arrs){
       
        // console.log(arr);
        // console.log(arr);

        

        var res=arrs.map(function(item){
            // console.log(123);
            return`
                <div class="cart_name">
                        <i></i>
                        <span class="name">百联海外专营</span>
                </div>
                <div class="cart_line" data-id="${item.id}">
                    <div class="lrs_line">
                        <input type="checkbox" />
                    </div>
                    <div class="item_box">
                        <a href="#"><img src="${item.url}" alt="" title="${item.title}" /></a>
                        <div class="name">
                            <i class="global"></i>
                            <a href="#">${item.title}</a>
                        </div>
                    </div>
                    <div class="type_box"></div>
                    <div class="item_price">
                        <div class="danjia">¥${item.price}</div>
                        <div class="icon">
                            <i>抢购</i>
                        </div>
                    </div>
                    <div class="number_box">
                        <em class="cut">-</em>
                        <input type="text" class="shuru" value="${item.num}" />
                        <em class="add">+</em>
                    </div>
                    <div class="price_box">
                        <div class="xiaoji">¥&nbsp;&nbsp;${(item.num)*(item.price)}</div>
                    </div>
                    <div class="action_box">
                        <a href="javascript:void(0);" class="love">移入收藏夹</a>
                        <a href="javascript:void(0);" class="delete">删除</a>
                    </div>
                </div> 
            `;
        }).join('');
        // console.log( $('.shangpin'));
        $('.shangpin').html(res);
        if($('.cart_line').size==0){
                            $('.pay_form').css('display','none');
                        }
    }


    //加量
    
    $('.shangpin').on('click','em.add',function(){
        var val = $(this).prev().val();
         val++;
         if(val>=100){
            val = 100;//库存量
         }
         
         $(this).prev().val(val);
         // console.log(num);//点击获取对应行的数量
         var id=$(this).parent().parent().attr('data-id');
         // console.log(id);
         
         $.ajax({
            type:"POST",//请求方式
            url:"../api/orderCar.php",//接口路径
            async:true,//异步
            data:{//传输数据
                'APItype':"orderCarNum",
                'id':id,
                'num':val
            },
            success:function(str){//成功回调
                xuanyan();
            }
       });
        $(this).prev().val(val);//更新数量

        // subTotal($(this));//刷新小计
         

    });

    //减量
    
    $('.shangpin').on('click','em.cut',function(){
        var val = $(this).next().val();
         val--;
         if(val<=1){
            val = 1;//库存量
         }
         
         $(this).next().val(val);
         // console.log(num);//点击获取对应行的数量
         var id=$(this).parent().parent().attr('data-id');
         // console.log(id);
         
         $.ajax({
            type:"POST",//请求方式
            url:"../api/orderCar.php",//接口路径
            async:true,//异步
            data:{//传输数据
                'APItype':"orderCarNum",
                'id':id,
                'num':val
            },
            success:function(str){//成功回调
                xuanyan();
            }
       });
        $(this).prev().val(val);//更新数量

    });
    
    //删除当行
    $('.shangpin').on('click','a.delete',function(){
        var id=$(this).parent().parent().attr('data-id');
        // console.log(id);
        var mes=confirm('您确定要删除该商品吗？');
        if(mes){
            $(this).parent().parent().remove();
            //更新数据库的数量
            $.ajax({
                type:"POST",//请求方式
                url:"../api/orderCar.php",//接口路径
                async:true,//异步
                data:{//传输数据
                    'APItype':"orderCarDelete",
                    'id':id,
                },
                success:function(str){//成功回调
                    // console.log(str);
                    xuanyan();
                }
           });
        }
        if($('.cart_line')){
                            $('.pay_form').css('display','none');
                        }
        updateNum();//刷新总计

    }); 

    //全选/不选
    var isok=true;
    $('.select_all input').click(function(){
        if(isok){
            $('.lrs_line input').prop('checked','checked');
        }else{
            $('.lrs_line input').removeAttr('checked');
        }
        isok=!isok;
        updateNum();
    });


    //没有全选：全选框勾选取消。全选：全选框勾上
    var arr0=[];//一个空数组存放被勾选的框的个数
    $('.shangpin').on('click', '.lrs_line input', function() {
        updateNum();
        if(arr0.length==$('.lrs_line').size()){//证明全被勾选
            $('.select_all input').prop('checked','checked');
            isok=false;
        }else{
            $('.select_all input').removeAttr('checked');
            isok=true;
        }   
    });
    var arr0=[];//一个空数组存放被勾选的框的个数
    

    function updateNum() {
        arr0.length = 0;//空数组：存被勾选的行的下标
        var le = $('.lrs_line input').size(); //复选框的总个数
        for(var i = 0; i < le; i++) {
            if($('.lrs_line input').eq(i).prop('checked')) {//这一行被勾选
                arr0.push(i);
            }
        }
        //根据复选框选择的行计算总价与数量
        var num = 0; //总数量
        var totalPrice = 0; //存总价
        for(var i = 0; i < arr0.length; i++) {
            num += $('.shuru').eq(arr0[i]).val() * 1;
            var price = $('.xiaoji').eq(arr0[i]).text(); //￥ 199.98
            price = $.trim(price); //去掉前后空格，工具方法
            price = (price.substring(1) * 1); //199.98
            totalPrice += price;
            // console.log(totalPrice);
        }
        $('.yixuan span').html(num);
        $('span.price strong').html( totalPrice.toFixed(2));
    }
    

   
    
    //4、删除多行
    $('.pay_line a.delete').on('click',function(){
        console.log($('.lrs_line').eq(arr0[0]).parent().attr('data-id'));
        // console.log(1);
        updateNum();
        var mes=confirm('您确定要删除所选物品吗？');
        if(mes){
            //删除arr下标对应的行
            for(var i=arr0.length-1;i>=0;i--){
                //从后面开始删除
                
                var id=$('.lrs_line').eq(arr0[i]).parent().attr('data-id');
                // console.log(id);
                $.ajax({
                    type:"POST",//请求方式
                    url:"../api/orderCar.php",//接口路径
                    async:true,//异步
                    data:{//传输数据
                        'APItype':"orderCarDelete",
                        'id':id,
                    },
                    success:function(str){//成功回调
                        // console.log(str);
                        $('.lrs_line').eq(arr0[i]).parent().remove();
                        updateNum();
                        
                        xuanyan();
                    }
               });
            }
        }

        if($('.cart_line')){
                            $('.pay_form').css('display','none');
                        }


    
    
});
    
    

});