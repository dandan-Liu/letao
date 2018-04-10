/**
 * Created by Administrator on 2018/4/10 0010.
 */
$(function(){

  var key=getSearch("key");
  //console.log(key);
  $(".lt_search input").val(key);

  // 功能1: 根据 key, 进行ajax请求, 一进入页面就进行页面渲染
  render();


  // 功能2: 点击搜索按钮, 实现搜索功能
  $(".lt_search button").on("click",function(){
    render();
    var key=$(".lt_search input").val();
    var history=localStorage.getItem("search_list") || '[]';
    var arr=JSON.parse(history);
    if(arr.indexOf(key)!=-1){
      arr.splice(arr.indexOf(key),1);
    }
    if(arr.length>=10){
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("search_list",JSON.stringify(arr));
  });

  // 功能3: 点击排序按钮, 进行排序
  $(".lt_sort a[data-type]").on("click",function(){
    if($(this).hasClass("current")){
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }else {
      $(this).addClass("current").siblings().removeClass("current");
      $(".lt_sort a").find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    render();
  });


  function render(){
    var params={};
    params.proName=$(".lt_search input").val();
    params.page=1;
    params.pageSize=100;

    var $current=$(".lt_sort .current");
    if($current.length>0){
      var sortName=$current.data("type");
      var sortValue=$current.find("i").hasClass("fa-angle-down")?2:1;
      params[sortName]=sortValue;
    }
    $.ajax({
      type:"get",
      url:"/product/queryProduct",
      data:params,
      dataType:"json",
      success:function(info){
        //console.log(info);
        $(".lt_product").html(template("tmp_searchList",info));
      }
    });
  }

});