$('#goto-register').on('click', function () {
    $('#login').hide();
    $('#register').show();
});
$('#goto-login').on('click', function () {
    $('#login').show();
    $('#register').hide();
});


var layer = layui.layer,
    form = layui.form;
// 验证信息 
form.verify({
    // length: function (value, form) {
    //     /^\s{6,12}$/
    // }
    length: [/^[\S]{6,12}$/, '密码格式错误'],
    same: function (val) {
        //val:重复密码
        if ($('#password').val() != val) {
            return '两次密码输入的不一致'
        }
    }
});
// 收集数据  
$('#register form').on('submit', function (e) {
    e.preventDefault();
    var params = $(this).serialize();
    $.ajax({
        url: "/api/reguser",
        type: "post",
        data: params,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                $('#login').show();
                $('#register').hide();
            } else {
                $('#username').val('')
            }
        },
        // complete: function (res) {
        //     var info = JSON.parse(res.responseText);
        //     if (info.status == 1 && info.message === "身份认证失败！") {
        //         localStorage.removeItem('token');
        //         location.href = '../login.html';
        //     }
        // }
    })

});
$('#login form').on('submit', function (e) {
    e.preventDefault();
    var params = $(this).serialize();
    $.ajax({
        url: "/api/login",
        type: "post",
        data: params,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                location.href = '../index.html';
                localStorage.setItem('token', res.token);
            }
        }
    })

});