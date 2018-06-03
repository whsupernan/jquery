/*
* @Author: Marte
* @Date:   2018-05-21 15:13:59
* @Last Modified by:   Marte
* @Last Modified time: 2018-05-23 15:55:59
*/

'use strict';
//文档加载就绪
$(function(){
//(一）初始值获取
    var sWidth=$("#focus").width();//获取图片宽度
    var len=$("#focus ul li").length;//获取图片数量
    var index=0;//索引号
    var picTimer;//声明定时器

//( 二 )左右按钮的添加，并设置为半透明
//（ 三 ）索引条的添加，并设置为半透明
    var btn= "<div class='btnBg'></div><div class='btn'>";
    for(var i=0;i<len;i++){
        btn+="<span></span>";
    }
    btn+="</div><div class='preNext pre'></div><div class='preNext next'></div>"
        //创建按钮节点
    $("#focus").append(btn);
        //调用DOM中追加节点方法
    $("#focus .btnBg").css("opacity",0.5);
    //showPic(2);执行下面的函数
        //设置按钮的css为半透明

    // $("#focus.btn").fadin(1000);
        //为小按钮添加鼠标划入时间，以显示相应的内容
        //上一页，下一页按钮鼠标移入时透明度变为1
        //单机上一页按钮
    $("#focus .pre").click(function(){
        index-=1;
        //判断index是否为-1，如果等于-1，则index为最后一张图片的索引号
        if(index==-1){
            index=len-1;
        }
        showPic(index);
    });
        //单机下一页按钮
    $("#focus .next").click(function(){
        index+=1;
        if(index==len){
            index=0;
        }
        showPic(index);
    });
        //图片左右滚动
        //鼠标滑入图片是停止自动播放，滑出时恢复自动播放
    $("#focus").hover(function(){
        clearInterval(picTimer);//鼠标移入
    },function(){
        picTimer=setInterval(function(){
            showPic(index);
            //索引号自增
            index++;
            //判断索引号是否等于图片数量，等于则将索引号归零
            if(index==len){
                index=0;
            };
        },1500);
    });
        //显示图片函数，根据接收的index值计算相应显示的图片
    function showPic(index){
        //通过index和轮播图的宽度计算出移动的距离
        var nowLeft = -index*sWidth;
        //使用animate方法让ul进行滚动
        $("#focus>ul").stop(true,true).animate({left:nowLeft},300);
        //为当前的索引按钮切换到选中的效果
        $("#focus .btn span").stop(true,true).animate({opacity:0.4},300)
        .eq(index).stop(true,true).animate({opacity:1},300);
    }

})