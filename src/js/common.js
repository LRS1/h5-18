/*
    getid(id):
    说明：通过id名查找节点元素
    参数：id名
*/
function getid(id){
    return document.getElementById(id);
}
/*
    randomCode():
    说明：随机生成一个4位验证码（包含字母）
*/
function randomCode(){
    var str = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var code = '';
    for(var i=0;i<4;i++){
        var index = parseInt(Math.random()*str.length) //不可能大于36
        code += str[index]
    }
    return code;
}
/*
 	randomNum(min, max):
 	说明：返回min到max之间的一个随机数，可用于随机点名、点歌等等
 	参数：最小值，最大值
*/
function randomNum(min, max) {
	return parseInt(Math.random() * (max - min + 1)) + min;
}
/*
    randomColor(str):
    说明：生成随机颜色
    参数：需要生成颜色的表示方法(16/'rgb')
*/
function randomColor(str) {
    if(str == 16) {
        var str = '0123456789abcdef';
        var color = '#';
        for(var i = 0; i < 6; i++) {
            color += str.charAt(parseInt(Math.random() * str.length));
        }
        return color;
    } 
    else if(str == 'rgb') {
        var r = parseInt(Math.random() * 256);
        var g = parseInt(Math.random() * 256);
        var b = parseInt(Math.random() * 256);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    } 
    else {
        alert('参数传错了');
    }
}
/*
    filter(str):
    说明：过滤不文明用语
    参数：需过滤不文明用语的字符串
*/
function filter(str){
    var word = "fuck,吃屎".split(",");
    word.forEach(function(item){
        var reg = new RegExp(item,"gi");
        str = str.replace(reg,"**");
    });
    return str;
}
/*
    norepeat(arr):
    说明：去除数组中重复的项,还可用ES6中的set集合
    参数：需去除重复项的数组
*/
function norepeat(arr){
    var res=[];
    for(i=0;i<arr.length;i++){
        if(res.indexOf(arr[i])==-1){
            res.push(arr[i]);
        }
    }
    return res;
}
/*
    showChar(str):
    说明：统计字符串中字符出现的次数
    参数：需统计字符出现次数的字符串
*/
function showChar(str){
    var obj = {};
    for(var i=0;i<str.length;i++){
        //如果当前字符对应的属性不存在（值为undefined），则为第一次出现（数量为1）
        if(obj[str[i]] === undefined){
            obj[str[i]] = 1;
        }
        else{
            obj[str[i]]++;
        }
    }
    var res = '';
    for(var char in obj){
        res += char + '出现：' + obj[char] + '次, '
    }
    return res;
}
/*
    addZero(num):
    说明：日期中不够10的数字前面补零
    参数：需要补零的数字
*/
function addZero(num) {
    if(num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}
/*
    nowTime():
    说明：把当地时间格式化，可用于做时钟    
*/
function nowTime(){
    var time=new Date();
    var year=time.getFullYear();
    var month=time.getMonth()+1;
    var day=time.getDate();
    var week=time.getDay();
    var hour=time.getHours();
    var min=time.getMinutes();
    var sec=time.getSeconds();
    var arr=['日','一','二','三','四','五','六'];
    var week_w=arr[week];
    return{
        year:year,
        month:addZero(month),
        day:addZero(day),
        hour:addZero(hour),
        min:addZero(min),
        sec:addZero(sec),
        week:week_w
    }
}
/*
    changeSec(num):
    说明：传入日期得到的秒数转化成XX天XX时XX分XX秒
    参数：传入的秒数
*/
function changeSec(num) {
    var sec = addZero(num % 60); //秒
    var min = addZero(Math.floor(num / 60) % 60); //分
    var hour = addZero(Math.floor(num / 60 / 60) % 24); //小时
    var day = addZero(Math.floor(num / 60 / 60 / 24));
    return {//想返回多个数的时候，做成json数据
        sec:sec,
        min:min,
        hour:hour,
        day:day
    };
}
/*
    countDown(endTime,startTime):
    说明：得到两个日期相差的时间，可用于倒计时
    参数：截止日期，开始日期(毫秒数与日期都可以)   
    格式：'xx-xx-xx xx:xx:xx''xx/xx/xx xx:xx:xx'  new Date()...
*/
function countDown(endTime,startTime){
    var distance=Date.parse(endTime)-Date.parse(startTime);//毫秒数
    var distanceSec=distance/1000;//秒数
    var distanceTime=changeSec(distanceSec);
    return (distanceTime.day+'天 '+distanceTime.hour+':'+distanceTime.min+':'+distanceTime.sec);
}
/*
    strToObj(str):
    说明：将传入的字符串转成对象，用于页面传输数据
    参数：字符串
    格式：id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&sale=5888&color=土豪金
    返回值：{id: "001", name: "iphone7 plugs", imgurl: "img/ip7.jpg", sale: "5888"}
*/
function strToObj(str) {
    var arr = str.split('&');
    var obj = {};
    for(var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}
/*
    objToStr(obj):
    说明：将传入的对象转为字符串，用于页面传输数据
    参数：对象
    格式：{id: "001", name: "iphone7 plugs", imgurl: "img/ip7.jpg", sale: "5888"}
    返回值：id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&sale=5888&color=土豪金
*/
function objToStr(obj) {
    var html = '';
    for(var key in obj) {
        html += key + '=' + obj[key] + '&';
    }
    html = html.slice(0, -1);
    return html;
}
/*
    bind(ele,type,fn)：
    说明：事件监听兼容性处理
    参数：节点名，事件名称(字符串),事件处理函数
 */
function bind(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);//ie9+ 主流
    }
    else{
        ele.attachEvent('on'+type,fn);//ie8-
    }
}
/*
    getstyle(obj, name) :
    说明：可以用js获取行内和非行内样式
    参数：节点名，属性名    
 */
function getstyle(obj, name) {
    //获取样式
    if(obj.currentStyle) {
        return obj.currentStyle[name];//ie8-
    } else {
        return getComputedStyle(obj, false)[name];//主流浏览器
    }
}
/*
    startMove(obj, json, fnend)：
    说明：运动框架，动画效果，多对象，多属性，链式运动框架(运动队列)
    参数：对象名，{键名(属性名)：键值(目标值(不带单位))}{'width':200,'heigth':400},回调函数(可选参数)
    startMove(box,{'width':200},function(){
        startMove(box,{'height':200},function(){
            //链式运动，先变化外层，再变化里层
        })
    })
 */
function startMove(obj, json, fnend) {
    clearInterval(obj.timer);//防止定时器叠加  obj.timer每个对象都有自己定时器
    obj.timer = setInterval(function() {
        var istrue = true;
        for(var key in json) {
            var cur = 0; //存初始值
            if(key == 'opacity') {//透明度
                cur = getstyle(obj, key) * 100; //获取初始值
            } else {
                cur = parseInt(getstyle(obj, key)); //width heigth borderwidth px为单位的
            }
            var speed = (json[key] - cur) / 6;//(目标值-初始值)速度可以自己改
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动
            if(cur != json[key]) { 
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //达到目标值
            }
            //运动
            if(key == 'opacity') {//透明度不带单位放在另外的分支
                obj.style.opacity = (cur + speed) / 100;//主流
                obj.style.filter = `alpha(opacity:${cur+speed})`;//ie8-
            } else {
                obj.style[key] = cur + speed + 'px';//针对普通属性 left  top height 
            }
        }
        //回调函数:准备开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if(istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if(fnend) {//有此函数才调用
                fnend();
            }
        }
    }, 30); 
}
/*
    checkReg
    说明：进行表单验证
    checkReg.trim(str)：去掉前后空格
    checkReg.tel(str)：电话号码正则
    checkReg.email(str)：邮箱正则
    checkReg.IDcard(str)：身份证正则
    checkReg.psw(str)：密码正则，6-18位首字母开头
    checkReg.confirm_pwd(str1, str2)：确认密码正则
    checkReg.urlAdr(str)：网址正则
    checkReg.username(str)：账号正则，字母开头,6-20位
    checkReg.nickname(str)：昵称正则
    checkReg.birthday(str)：生日正则
 */
var checkReg = {
    trim: function(str) {
        var reg = /^\s+|\s+$/g;
        return str.replace(reg, '');
    },
    tel: function(str) { 
        var reg = /^1[3-9]\d{9}$/
        return reg.test(str);
    },
    email: function(str) {  
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return reg.test(str);
    },
    IDcard: function(str) {
        var reg = /^(\d{17}|\d{14})[\dX]$/;
        return reg.test(str);
    },
    psw: function(str) { 
        var reg = /^[a-zA-Z]\w{5,17}$/;
        return reg.test(str);
    },
    confirm_pwd: function(str1, str2) {
        return str1 === str2; //全等
    },
    urlAdr: function(str) {
        var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        return reg.test(str);
    },
    username:function(str){
        var reg=/^[a-zA-Z][\w\-]{5,19}$/;
        return reg.test(str);
    },
    nickname:function(str){
        var reg=/^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    birthday:function(str){
        var reg=/^[12][0-9]{3}\-(0[1-9]|1[0-2])\-(0[1-9]|[12]9[0-9]|3[0-1])$/;
        return reg.test(str);
    },
}
/*
    Cookie
    说明：存、取、删cookie信息
    存: Cookie.set(name,value,prop)prop：可选,为json {expires:now}
    取: Cookie.get(key)
    删: Cookie.remove(key)
 */
var Cookie={
    set:function(name,value,prop){//存
        var str=name+'='+value;
        //设置失效时间
        if(prop.expires){
            str+=';expires='+prop.expires.toUTCString();
        }
        //设置path路径
        if(prop.path){
            str+=';path='+prop.path;
        }
        //domain设置可访问cookie的域名
        if(prop.domain){
            str+=';domain='+prop.domain;
        }
        //写到cookie
        document.cookie=str;
    },
    get:function(key){//取，有空格
        var cookies=document.cookie;//name=tiantian; age=18;
        var arr=cookies.split('; ');//['name=tiantian','age=18']
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//['name','tiantian']
            if(key==arr2[0]){
                return arr2[1];
            }
        }
    },
    remove:function(key){
        //删的原理:设置过期时间，不设置浏览器删掉就删除cookie
        var now=new Date();
        now.setDate(now.getDate()-1);
        this.set(key,'no',{expires:now});//重新设置cookie
    }
}
/*
    ES6：设置配置参数和默认参数的关系：有配置用配置参数，没有就默认 
*/
function extendObj(obj1, obj2) { //obj1主角(配置参数) obj2替补(默认参数)
    for(var key in obj1) {
        obj2[key] = obj1[key];
    }
}
/*
    ES6：对象的深度拷贝
*/
function cloneDeep(obj) {
    var str = JSON.stringify(obj); //先把对象转成字符串
    var newobj = JSON.parse(str); //再把字符串转成对象
    return newobj;
}
/*
    ajax函数封装：
        参数一：请求方式：GET  POST
        参数二：接口路径
        参数三：数据(可选)  name='tiantian'&psw=123456  传给后端的数据
        参数四：成功的回调函数(可选的)
*/
function ajax(mechod,url,data,success){   
    //1.创建对象
    var xhr=new XMLHttpRequest();  
    if(mechod=='GET' && data){//请求方式是get并且有数据
        url+='?'+data; 
    }  
    //2.发送请求 
    xhr.open(mechod,url,true);   
    if(mechod=='GET'){
        xhr.send();//如果是get方式，直接发送请求
    }else{//post方式
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data);
    }
    //3.后台做
    //4.接收数据
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){//步骤到达
            if(xhr.status==200){//数据无误
                if(success){//如果有回调，就用回调
                    success(xhr.responseText);//实参，一般为字符串
                }
            }else{
                alert('出错了，状态码是：'+xhr.status);//404 408..
            }
        }
    }
}

