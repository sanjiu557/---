$.ajaxPrefilter(function (obj) {
    obj.url = "http://api-breakingnews-web.itheima.net" + obj.url;
    obj.headers = {
        'Authorization': localStorage.getItem('token')
    };
    var reg = /obj.url/;
    // console.log(obj.url);
    if (obj.url.indexOf('/my') == -1) {
        obj.complete = function (xhr) {
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
    }
})