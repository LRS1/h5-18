
$(function(){
    //用户名验证
    var isok1=false;
    $('.one').blur(function(){
        var val1=$('.one').val();
        val1=$.trim(val1);
        if(val1){
            if(checkReg.username(val1)){
                $('.one').css('border-color','#58bc58');
                $('.error1').css('color','green').html('√');
                isok1=true;
            }else{
                $('.one').css('border-color','red');
                $('.error1').html('用户名错误');
                isok1=false;
            }
        }else{
            $('.one').css('border-color','red');
            $('.error1').html('用户名不能为空');
            isok1=false;
        }
    });
    //密码验证
    var isok2=false;
    $('.two').blur(function(){
        var val=$('.two').val();
        val=$.trim(val);
        if(val){
            $('.two').css('border-color','#58bc58');
            $('.error2').css('color','#58bc58').html('√');
            isok2=true;
        }else{
            $('.two').css('border-color','red');
            $('.error2').html('密码不能为空');
            isok2=false;
        }
    });

    //登录
    $('.last button').click(function(){
        var val1=$('.one').val();
        val1=$.trim(val1);
        var val2=$('.two').val();
        val2=$.trim(val2);
        if(isok1&&isok2){
            $.ajax({
                type:"POST",//请求方式
                url:"../api/users.php",//接口路径
                async:true,//异步
                data:{//传输数据
                    'APItype':'login',
                    'username':val1,
                    'password':val2
                },
                success:function(str){//成功回调
                    var arr=JSON.parse(str);
                    // console.log(arr);
                    if(arr==1){
                        Cookie.set('usn',val1,{path:'/'});
                        Cookie.set('psw',val2,{path:'/'},);
                        location.href='../shouye.html';
                    }else{
                        alert('用户名或密码错误！');
                    }
                }
            });
        }else{
            alert('用户名或密码为空或不符合规则！');
        }

    });
    
});