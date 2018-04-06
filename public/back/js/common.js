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