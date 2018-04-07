/**
 * Created by Administrator on 2018/4/6 0006.
 */
$(document).ajaxStart(function(){
  NProgress.start();
});
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },500);
});

$(function(){
  //二级菜单下拉功能
  $(".category").on("click",function(){
    $(this).next().stop().slideToggle();
  });

  //顶部菜单栏切换功能
  $(".icon_menu").on("click",function(){
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
    $(".lt_topbar").toggleClass("hidemenu");
  });

  //模态框
  $(".icon_logout").on("click",function(){
    $("#logoutModal").modal("show");
  });

  $("#logoutBtn").on("click",function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        //console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    });
  });

  //登录拦截
  if(location.href.indexOf("login.html")===-1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      dataType:"json",
      success:function(info){
        //console.log(info);
        if(info.error==400){
          location.href="login.html";
        }
      }

    });
  }
});