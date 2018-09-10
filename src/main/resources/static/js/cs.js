$(function(){
    cs_task();
    me();
});

function cs_task(){
    var load = layer.load();
    $.post(
        "https://evekykeb.qcloud.la/CustomerService/task",
        function(res){
            if (res.data == null){
                layer.close(load);
                layer.msg('暂时没有任务了!休息一下吧', {icon: 6});
                $("#workDiv").html("");
                return ;
            }
            if (res.data.inspect_photo != null){
                res.data.inspect_photo = res.data.inspect_photo.split(",");
            }
            if (res.data.drug_photo != null){
                res.data.drug_photo = res.data.drug_photo.split(",");
            }

            if (res.data.sex != null){
                res.data.sex = res.data.sex == 0 ? "女":"男";
            }
            if (res.data.birthday != null){
                var date=new Date;
                var nowYear=date.getFullYear();
                var birthdayYear = res.data.birthday.substring(0,4);
                res.data.birthday = nowYear - birthdayYear;
            }

            var getter = document.getElementById('conditionsTemplate').innerHTML;  //获取拼接部分的内容
            laytpl(getter).render(res.data, function (html) {
                //給拼接的模板绑定数据
                document.getElementById('workDiv').innerHTML = html;    // 吧生成的结构绑定在负责呈现内容的div中。
            });
            layer.close(load);
        }
        ,"json"
    )
}

function me() {
    var load = layer.load();
    $.post(
        "https://evekykeb.qcloud.la/CustomerService/me",
        function(res){
            layer.close(load);
            console.log(res);
            $("#me").html("客服:"+res.data.realname);
        }
        ,"json"
    )
}

function diagnosis(de_id,de_name) {
    var content = "<div style='color:#767676'>确认分诊"+de_name+"吗?</div>";
    var co_id = $("#co_ul").attr("co_id");

    layer.open({
        title: ['温馨提示'],
        content: content,
        btn: ['确定', '取消'],
        shadeClose: true,
        yes: function(index, layero){
            var load = layer.load();
            $.post(
                "https://evekykeb.qcloud.la/CustomerService/diagnosis",
                {'de_id':de_id, 'co_id':co_id},
                function(result){
                    layer.close(load);
                    layer.msg('分诊成功', {icon: 6});
                    cs_task();
                }
            )
        }

    });
}

function invalidConditions() {
    var co_id = $("#co_ul").attr("co_id");

    layer.open({
        title: ['温馨提示'],
        content: "确认订单无效吗",
        btn: ['确定', '取消'],
        shadeClose: true,
        yes: function(index, layero){
            var load = layer.load();
            $.post(
                "https://evekykeb.qcloud.la/CustomerService/invalidConditions",
                {'co_id':co_id},
                function(result){
                    layer.close(load);
                    layer.msg('处理完成', {icon: 6});
                    cs_task();
                }
            )
        }

    });
}

function signOut() {
    $.post("https://evekykeb.qcloud.la/CustomerService/signOut");
    window.location.href="https://evekykeb.qcloud.la/CustomerService/toLogin";
}