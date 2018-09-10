$(function () {
    d_task();
    me();
    doctorNewsNum(0);
})

function d_task() {
    var load = layer.load();
    stopChat();
    $.post("https://evekykeb.qcloud.la/Doctor/task",function (res) {

        if (res.data == null){
            layer.close(load);
            layer.msg('暂时没有任务了!休息一下吧', {icon: 6});
            $("#workDiv").html("");
            return ;
        }

        doctorChat(res.data.id, 0);
        res = manage(res);
        var getter = document.getElementById('conditionsTemplate').innerHTML;  //获取拼接部分的内容
        laytpl(getter).render(res.data, function (html) {
            //給拼接的模板绑定数据
            document.getElementById('workDiv').innerHTML = html;    // 吧生成的结构绑定在负责呈现内容的div中。
        });
        layer.close(load);
    },"json")


}

function myTreatment(currentPage) {
    var load = layer.load();
    stopChat();
    $("#chatMsgDiv").html("");
    $.post("https://evekykeb.qcloud.la/Doctor/myTreatment",{currentPage:currentPage, pageSize:5}, function (res) {
        if (res.data == null){
            layer.msg("没有接诊记录,快去接诊吧!",{icon: 6});
            return ;
        }
        var getter = document.getElementById('treatmentHistoryTemplate').innerHTML;
        laytpl(getter).render(res.data, function (html) {
            document.getElementById('workDiv').innerHTML = html;
        });
        laypage.render({
            elem: 'leaf',//注意，这里的 test1 是 ID，不用加 # 号
            count: res.totalCount ,//数据总数，从服务端得到
            limit: 5,
            curr: res.currentPage,//当前页
            layout: ['count','prev', 'page', 'next','skip','groups'], //分页部分显示内容
            jump: function(obj,first){
                if(!first){
                    myTreatment(obj.curr);
                }
            }
        })
        layer.close(load)
    },"json");
}

function myTreatmentInfo(co_id) {
    var load = layer.load();
    stopChat();
    doctorChat(co_id, 0);
    $.post("https://evekykeb.qcloud.la/Doctor/TreatmentInfo", {"co_id":co_id}, function (res) {
        res = manage(res);
        var getter = document.getElementById('conditionsTemplate').innerHTML;  //获取拼接部分的内容
        laytpl(getter).render(res.data, function (html) {
            //給拼接的模板绑定数据
            document.getElementById('workDiv').innerHTML = html;    // 吧生成的结构绑定在负责呈现内容的div中。
        });
        layer.close(load)
    },"json");
}

function me(){
    var load = layer.load();
    $.post(
        "https://evekykeb.qcloud.la/Doctor/me",
        function(res){
            var me = "医生:"+res.data.realname;
            $("#me").html(me);
            layer.close(load);
        },
        "json"
    )
}

function doctorNewsNum(ldnn) {
    $.post("https://evekykeb.qcloud.la/Doctor/doctorNewsNum", {"ldnn":ldnn},function (res) {
        if (res.status == 200){
            $("#newsBtn").html("新消息 : " + res.data);
            if (res.data > 0){
                $("#newsBtn").attr("class","layui-btn layui-btn-warm");
                $("#newsBtn").attr("onclick","newsInfo()");
            }else {
                $("#newsBtn").attr("class","layui-btn layui-btn-disabled");
                $("#newsBtn").attr("onclick","javascript:void(0)");
            }

            ldnn = res.data;
        }
        doctorNewsNum(ldnn);
    },"json");
}

function newsInfo() {
    var load = layer.load();
    $.post("https://evekykeb.qcloud.la/Doctor/newsInfo", function (res) {
        if (res.status == 200){
            doctorChat(res.data.id, 0);
            res = manage(res);

            var getter = document.getElementById('conditionsTemplate').innerHTML;
            laytpl(getter).render(res.data, function (html) {
                //給拼接的模板绑定数据
                document.getElementById('workDiv').innerHTML = html;
            });
            layer.close(load);
        }

    },"json");
}

function newsInfo() {
    stopChat();
    var load = layer.load();
    $.post("https://evekykeb.qcloud.la/Doctor/newsInfo", function (res) {
        if (res.status == 200){
            doctorChat(res.data.id, 0);
            res = manage(res);

            var getter = document.getElementById('conditionsTemplate').innerHTML;
            laytpl(getter).render(res.data, function (html) {
                //給拼接的模板绑定数据
                document.getElementById('workDiv').innerHTML = html;
            });
            layer.close(load);
        }

    },"json");
}

stopChat = function () {};
function doctorChat(co_id, co_do_len) {
    stopChat();
    var flag = 0;
    $.post("https://evekykeb.qcloud.la/Conditions/doctorChat",{"co_id":co_id, "co_do_len":co_do_len},function (res) {
        if (res.status == 200){
            if (res.data == null){
                $("#chatMsgDiv").html("");
                return ;
            }
            var getter = document.getElementById('chatTemplate').innerHTML;
            var chatMsgDiv = document.getElementById('chatMsgDiv');
            var chatDiv = document.getElementById('chatDiv');
            laytpl(getter).render(res.data.co_do, function (html) {

                //給拼接的模板绑定数据
                chatMsgDiv.innerHTML = html;
            });
            chatDiv.scrollTop = chatDiv.scrollHeight;
            co_do_len = res.data.co_do.length;
        }
        if (flag == 0){
            doctorChat(co_id, co_do_len);
        };

    },"json");

    stopChat = function () {
        flag = 1;
    };

}

$(document).keyup(function(event){

    if(event.keyCode == 13){
        reply();
    }
});

function reply() {
    var msg = $("#replyMsg").val();
    var co_id = $("#co_ul").attr("co_id");
    $("#replyMsg").val("");
    if (msg != "" && co_id != null){
        var load = layer.load();
        $.post(
            "https://evekykeb.qcloud.la/Doctor/reply",
            {"co_id":co_id, "reply": msg},
            function(result){
                layer.close(load);
            }
        )
    }

}

function signOut() {
    stopChat();
    $.post("https://evekykeb.qcloud.la/Doctor/signOut");
    window.location.href="https://evekykeb.qcloud.la/Doctor/toLogin";
}


function manage(res) {
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

    return res;
}