//用户信息
$.ajax({
    url: 'http://ajax.frontend.itheima.net/my/userinfo',
    headers: {
        'Authorization': localStorage.getItem('token')
    },
    success: function (res) {
        console.log(res);
        if (res.status == 0) {
            var name = res.data.nickname || res.data.username;
            $('.username').text(name);

            if (res.data.user_pic) {
                $('.layui-nav-img').attr('src', res.data.user_pic).show();
                $('.avatar').hide();
            } else {
                var first = name.substr(0, 1).toUpperCase();
                $('.avatar').text(first).css('display', 'inline-block');
                $('.layui-nav-img').hide();
            }
        };
    },
    complete: function (xhr) {
        // console.log(xhr.responseJSON);
        // console.log(xhr.responseText);
        var info = JSON.parse(xhr.responseText);
        // console.log(info);
        if (info.status == 1 && info.message === "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = '../login.html';
            // layer.msg('你这还想白嫖？')
        }
    }
});
// var layer = layui.layer;
$('#logout').on('click', function () {

    layer.confirm('你确定不再康康吗？', function (index) {
        localStorage.removeItem('token');
        location.href = '../login.html';
        layer.close(index);
    })
});