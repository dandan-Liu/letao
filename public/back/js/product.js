/**
 * Created by Administrator on 2018/4/9 0009.
 */
$(function(){
  var currentPage=1;
  var pageSize=2;
  var picArr=[];

  //一进来渲染页面
  render();


  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        //console.log(info);
        $(".lt_content tbody").html(template("tmp_product",info));

        //分页
        $("#paninator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          },
          itemTexts:function(type,page,current){
            switch (type){
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },

          tooltipTitles:function(type, page, current){
            switch (type){
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return "前往第" + page + "页";
            }
          }

        });
      }
    });
  }

  //点击添加商品按钮显示模态框
  $("#addBtn").on("click",function(){
    $("#addModal").modal("show");

    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
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

  //注册事件委托, 给 a 注册点击事件
  $(".dropdown-menu").on("click","a",function(){
    $(".dropdown-text").text($(this).text());
    var id=$(this).data("id");
    $("[name='brandId']").val(id);
    $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
  });

  //图片上传回调函数
  $("#fileupload").fileupload({
    dataType:"json",
    done:function(e,data){
      //console.log(data);
      var picObj=data.result;
      var picAddr=picObj.picAddr;
      picArr.unshift(picObj);

      $('#imgBox').prepend('<img src="'+picAddr+'" id="imgBox" width="100" alt="">');
      if(picArr.length>3){
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      if(picArr.length===3){
        $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
      }
    }
  });

  //表单验证
  $("#form").bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },

      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },

      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },

      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },

      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp:/^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },

      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          }
        }
      },

      price:{
        validators:{
          notEmpty:{
            message:"请输入商品价格"
          }
        }
      },

      picStatus:{
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }

    }
  });

  //表单验证成功
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    var params=$("#form").serialize();
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

    //console.log(params);
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:params,
      dataType:"json",
      success:function(info){
        console.log(info);
        $("#addModal").modal("hide");
        currentPage=1;
        render();
        //重置表单
        $("#form").data("bootstrapValidator").resetForm(true);
        $(".dropdown-text").text("请选择二级分类");
        picArr=[];
        $("#imgBox img").remove();
      }
    });
  });
});