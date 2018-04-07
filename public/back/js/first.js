/**
 * Created by Administrator on 2018/4/7 0007.
 */
$(function(){
  var currentPage=1;
  var pageSize=5;

  //页面刷新渲染
  render();

  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        $(".lt_content tbody").html(template("tmp_first",info));
        $("#paninator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        });
      }
    });
  }

  //点击添加分类功能
  $("#addBtn").on("click",function(){
    $("#addModal").modal("show");
  });

  //表单校验功能
  $("#form").bootstrapValidator({
    //小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类"
          }
        }
      }
    }
  });

  //注册表单校验成功事件
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        $("#addModal").modal("hide");
        currentPage=1;
        render();
        $("#form").data("bootstrapValidator").resetForm(true);

      }
    });
  });
});