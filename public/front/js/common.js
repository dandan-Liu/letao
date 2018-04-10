/**
 * Created by Administrator on 2018/4/9 0009.
 */
$(function(){
  mui(".mui-scroll-wrapper").scroll({
    indicators: false
  });

  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });

})
//解析地址栏
function getSearch(key){
  var search=location.search;
  search=search.slice(1);
  search=decodeURI(search);
  var arr=search.split("&");
  var obj={};
  //["key=耐克", "name=pp"]
  arr.forEach(function(element,value){
    var k=element.split("=")[0];
    var v=element.split("=")[1];
    obj[k]=v;
  });
  return obj[key];
}
