/**
 * Created by Administrator on 2018/4/9 0009.
 */
$(function(){

  //左侧分类
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
      console.log(info);
      $(".category_left ul").html(template("tmp_left",info));
      render(info.rows[0].id);
    }
  });

  //右侧分类渲染

  $(".category_left ul").on("click","a",function(){
    var id=$(this).data("id");
    //console.log(id);
    render(id);
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
  });

  function render(id){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      dataType:"json",
      success:function(info){
        //console.log(info);
        $(".category_right ul").html(template("tmp_right",info));
      }
    });
  }

});