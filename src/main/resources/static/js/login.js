
$(function () {
    form.render();
})


//监听提交
form.on('submit(signIn)', function(data){
    // console.log(data.field.identity);
    if (data.field.identity == 1){
        doctorSignIn(data.field)
    }
    if (data.field.identity == 0){
        csSignIn(data.field)
    }
    
    return false;
});

function csSignIn(data) {
    var load = layer.load();
    $.post("https://evekykeb.qcloud.la/CustomerService/signIn",data,function (res) {

        if (res.status == 300){
            layer.close(load);
            layer.msg('用户名或密码错误', {icon: 5});
        }else {
            window.location.href = "https://evekykeb.qcloud.la/CustomerService/toWork"
        }

    },"json");
}

function doctorSignIn(data) {
    var load = layer.load();
    $.post("https://evekykeb.qcloud.la/Doctor/signIn",data,function (res) {
        if (res.status == 300){
            layer.close(load);
            layer.msg('用户名或密码错误', {icon: 5});
        }else {
            window.location.href = "https://evekykeb.qcloud.la/Doctor/toWork"
        }

    },"json");
}