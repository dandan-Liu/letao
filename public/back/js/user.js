/**
 * Created by Administrator on 2018/4/7 0007.
 */
$(function(){
  var currentPage=1;
  var pageSize=5;
  //进入页面渲染
  render();

  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var str=template("tmp_user",info);
        $(".table tbody").html(str);

        //渲染分页
        $("#paninator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          //当前页
          currentPage:info.page,
          //总页数
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        });
      }
    });
  }

  //给禁用启用按钮注册委托事件
  $(".lt_content tbody").on("click",".btn",function(){
    $("#userModal").modal("show");
    var id=$(this).parent().data("id");
    var isDelete=$(this).hasClass("btn-success")?1:0;

    $("#submitBtn").off("click").on("click",function(){
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        dataType:"json",
        success:function(info){
          console.log(info);
          $("#userModal").modal("hide");
          render();
        }
      });
    });
  });
});