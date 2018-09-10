layer = layui.layer;
laytpl = layui.laytpl;
form = layui.form;
laypage = layui.laypage;

function showImg(url){
    var img = "<img src='" + url + "' />";

    var theImage = new Image();
    theImage.src = url;
    var wid = window.innerWidth-200 > theImage.width ? theImage.width : window.innerWidth-200;
    var hei = window.innerHeight-200 > theImage.height ? theImage.height : window.innerHeight-200;

    layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        area:[wid+'px',hei+'px'],
        content: img, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function () {
            //layer.msg('图片查看结束！', { time: 5000, icon: 6 });
        }
    });
}