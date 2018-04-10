/**
 * Created by Administrator on 2018/4/10 0010.
 */
$(function(){

  //var arr=["耐克","匡威","阿迪","悟空","唐僧","八戒"];
  //localStorage.setItem("search_list",JSON.stringify(arr));
  //localStorage.removeItem("search_list");

  // 功能1: 渲染搜索历史记录
  renderHistory();


  // 功能2: 删除功能, 删除本地历史记录数组里面一项
  $(".lt_history").on("click",".btn_delete",function(){
    var that=this;
    mui.confirm("你确认要删除吗?","温馨提示",["确认","取消"],function(e){
      //console.log(e);
      if(e.index===0){
        var index=$(that).data("index");
        var arr=getHistory();
        arr.splice(index,1);
        localStorage.setItem("search_list",JSON.stringify(arr));
        renderHistory();
      }
    });


  })


  // 功能3: 清空功能
  $(".lt_history").on("click",".btn_empty",function(){
    mui.confirm("你确认要清空吗?","温馨提示",["确认","取消"],function(e){
      if(e.index===0){
        localStorage.removeItem("search_list");
        renderHistory();
      }
    });
  });


  // 功能4: 添加功能
  $(".lt_search button").on("click",function(){
    var key=$(".lt_search input").val().trim();
    if(key==""){
      mui.toast("请输入搜索关键字",{
        duration:1000
      });
    }else {
      var arr=getHistory();
      if(arr.indexOf(key)!=-1){
        arr.splice(arr.indexOf(key),1);
      }
      if(arr.length>=10){
        arr.pop();
      }

      arr.unshift(key);

      localStorage.setItem("search_list",JSON.stringify(arr));
      renderHistory();
      $(".lt_search input").val("");
    }
  });

  // 专门用于读取本地存储中的历史记录数组的函数
  function getHistory(){
    var history=localStorage.getItem("search_list")||'[]';
    var arr=JSON.parse(history);
    return arr;
  }

  //渲染历史记录的函数
  function renderHistory(){
    var arr=getHistory();
    //console.log(arr);
    $(".lt_history").html(template("tmp_history",{arr:arr}));
  }

});