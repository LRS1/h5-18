$(function(){
    //1. 用户名验证
    // $('ul.tishi1 li.tip1').css('display','list-item');
    //1.x请输入用户名 2.v 3.用户名已存在
    // console.log(123);
    var isok1=false;
    $('.one').blur(function(){
        var val1=$('.one').val();
        val1=$.trim(val1);

        if(val1){//非空判断
            if(checkReg.username(val1)){
                $.ajax({
                    type:"POST",//请求方式
                    url:"../api/users.php",//接口路径
                    async:true,//异步
                    data:{//传输数据
                        'APItype':'uname',
                        'username':val1
                    },
                    success:function(str){//成功回调
                        var arr=JSON.parse(str);
                        // console.log(arr);
                        if(arr==1){
                            $('.tishi1 li').css('display','none');
                            $('.tishi1 .tip2').css('display','list-item');
                            isok1=true;
                        }else{
                            $('.tishi1 li').css('display','none');
                            $('.tishi1 .tip3').css('display','list-item');
                            isok1=false;
                        }
                    }
                });
            }else{
                $('.tishi1 li').css('display','none');
                $('.tishi1 .tip1').css('display','list-item');
                $('.tishi1 .tip1 span').html('用户名不合规则');
                isok1=false;
            }   
        }else{
            $('.tishi1 li').css('display','none');
            $('.tishi1 .tip1').css('display','list-item');
            // $('.tishi1 .tip1 span').html('请输入用户名');
            isok1=false;
        }
    });
    
    //2. 密码验证
    var isok2=false;
    $('.two').blur(function(){
        var val2=$('.two').val();
        val2=$.trim(val2);
        if(val2){
            if(checkReg.psw(val2)){
                isok2=true;
                $('.tishi2 li').css('display','none');
                $('.tishi2 .tip2').css('display','list-item');
            }
            else{
                $('.tishi2 li').css('display','none');
                $('.tishi2 .tip1').css('display','list-item');
                $('.tishi2 .tip1 span').html('密码不合规则');
                isok2=false;
            }
        }else{
            $('.tishi2 li').css('display','none');
            $('.tishi2 .tip1').css('display','list-item');
            isok2=false;
        }
    });

    //3.确认密码
    var isok3=false;
    $('.three').blur(function(){
        var val2=$('.two').val();
        val3=$('.three').val();
        if(val3){
            if(checkReg.confirm_pwd(val2,val3)){
                isok3=true;
                $('.tishi3 li').css('display','none');
                $('.tishi3 .tip2').css('display','list-item');
            }else{
                isok3=false;
                $('.tishi3 li').css('display','none');
                $('.tishi3 .tip1').css('display','list-item');
                $('.tishi3 .tip1 span').html('密码不合规则');
            }
        }else{
            isok3=false;
            $('.tishi3 li').css('display','none');
            $('.tishi3 .tip1').css('display','list-item');
        }
    });

    //4.手机号
    var isok4=false;
    $('.four').blur(function(){
        val4=$('.four').val();
        val4=$.trim(val4);
        if(val4){
            if(checkReg.tel(val4)){
                isok4=true;
                $('.tishi4 li').css('display','none');
                $('.tishi4 .tip2').css('display','list-item');
            }else{
                isok4=false;
                $('.tishi4 li').css('display','none');
                $('.tishi4 .tip1').css('display','list-item');
                $('.tishi4 .tip1 span').html('密码不合规则');
            }
        }else{
            isok4=false;
            $('.tishi4 li').css('display','none');
            $('.tishi4 .tip1').css('display','list-item');
        }
    });

    //5.验证码验证
    //点击更换验证码
    $('.other').click(function(){
            $('.code').html(randomCode());
        });

    var isok5=false;
    
    $('.five').blur(function(){

        var val5=$('.five').val();
        val5=$.trim(val5);
        var code = $('.code').html();
        // console.log(code);
        if(val5){
            if(val5==code){
                isok5=true;
                $('.tishi5 li').css('display','none');
                $('.tishi5 .tip2').css('display','list-item');
            }else{
                isok5=false;
                $('.tishi5 li').css('display','none');
                $('.tishi5 .tip1').css('display','list-item');
                $('.tishi5 .tip1 span').html('请输入正确的验证码');
            }
        }else{
            isok5=false;
            $('.tishi5 li').css('display','none');
            $('.tishi5 .tip1').css('display','list-item');
        }
    });
    
    //6.邮箱
    var isok6=false;
    $('.six').blur(function(){
        val6=$('.six').val();
        val6=$.trim(val6);
        if(val6){
            if(checkReg.email(val6)){
                isok6=true;
                $('.tishi6 li').css('display','none');
                $('.tishi6 .tip2').css('display','list-item');
            }else{
                isok6=false;
                $('.tishi6 li').css('display','none');
                $('.tishi6 .tip1').css('display','list-item');
                $('.tishi6 .tip1 span').html('邮箱不合规则');
            }
        }else{
            isok6=false;
            $('.tishi6 li').css('display','none');
            $('.tishi6 .tip1').css('display','list-item');
        }
    });
    


    //是否勾选百联条款

    $('.last button').click(function(){
        

        var val1=$('.one').val();
        val1=$.trim(val1);
        var val2=$('.two').val();
        val2=$.trim(val2);
        if(isok1&&isok2&&isok3&&isok4&&isok5&&isok6){
            if($('.check').prop('checked')){
                $.ajax({
                    type:"POST",//请求方式
                    url:"../api/users.php",//接口路径
                    async:true,//异步
                    data:{//传输数据
                        'APItype':'reg',
                        'username':val1,
                        'password':val2
                    },
                    success:function(str){//成功回调
                        var arr=JSON.parse(str);
                        // console.log(arr);
                        if(arr==1){
                            location.href='login.html';
                        }
                    }
                });
            }else{
                $('.agree').css('display','inline');
            }
        }else{
            alert('上面信息还有缺漏！');
        }
    }); 

    
});