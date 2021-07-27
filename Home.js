var today = new Date();
var day = today.getDay();
var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var day_name = "";
let products = {} || product
switch (day) {
    case 0:
        day_name = "Chủ nhật";
        break;
    case 1:
        day_name = "Thứ hai";
        break;
    case 2:
        day_name = "Thứ ba";
        break;
    case 3:
        day_name = "Thứ tư";
        break;
    case 4:
        day_name = "Thứ năm";
        break;
    case 5:
        day_name = "Thứ sau";
        break;
    case 6:
        day_name = "Thứ bảy";
}

$("#date").append(day_name + "," + date)

products.datahome = function() {
    $.ajax({
        url: " http://localhost:3000/products",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $.each(data, function(i, v) {
                let p = +v.Price;
                p = p.toLocaleString("it-IT", { style: "currency", currency: "VND" }),
                    $("#datahome").append(
                        '<tr><th scope="row">' + (i + 1) + '</th>' +
                        '<td>' + v.NameProduct + '</td>' +
                        '<td><div id="tinhtrang' + i + '"></div></td>' +
                        '<td>' + v.Amount + '</td>' +
                        '<td>' + p + '</td>' +
                        '</tr> ')
                if (v.Amount == 0) {
                    $("#tinhtrang" + i).append('<div class="alert alert-danger" role="alert">' +
                        'Đã hết hàng' +
                        '</div>')
                }
                if (v.Amount <= 2 && v.Amount > 0) {
                    $("#tinhtrang" + i).append('<div class="alert alert-waring" role="alert">' +
                        'Sắp hết hàng' +
                        '</div>')
                }
                if (v.Amount > 2) {
                    $("#tinhtrang" + i).append('<div class="alert alert-success" role="alert">' +
                        'Còn' +
                        '</div>')
                }
            })

        }
    })
}

$(document).ready(function() {
    products.datahome();
})