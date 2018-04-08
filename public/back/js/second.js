/**
 * Created by Administrator on 2018/4/7 0007.
 */
$(function(){

  var currentPage=1;
  var pageSize=5;
  //页面一上来渲染
  render();


  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        //console.log(info);
        $(".lt_content tbody").html(template("tmp_second",info));

        //分页
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

  $("#addBtn").on("click",function(){
    $("#addModal").modal("show");

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        //console.log(info);
        $(".dropdown-menu").html(template("tmp_dropdown",info));
      }
    });
  });

  //通过委托事件给a注册事件
  $(".dropdown-menu").on("click","a",function(){
    var txt=$(this).text();
    var id=$(this).data("id");
    $(".dropdown-text").text(txt);
    $("[name='categoryId']").val(id);
  });

  //文件上传初始化
  $("#fileupload").fileupload({
    dataType:"json",
    done:function(e,data){
      //console.log(data.result.picAddr);
      var pic=data.result.picAddr;
      $("#imgBox").attr("src",pic);
      $("[name='brandLogo']").val(pic);
    }
  });

  //表单校验
  $("#form").bootstrapValidator({
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },

      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      }
    }
  });

  //表单校验成功事件
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        //console.log(info);
        $("#addModal").modal("hide");
        currentPage=1;
        render();
        $("#form").data("bootstrapValidator").resetForm(true);
        $(".dropdown-text").text("请选择一级分类");
        $("#imgBox").attr("src","images/none.png");
      }
    });
  });
});