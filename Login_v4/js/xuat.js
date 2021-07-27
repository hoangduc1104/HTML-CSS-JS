var today = new Date();
var day = today.getDay();
var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var day_name = "";
let xuat = {} || xuat
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

xuat.getOrder = function() {
    $.ajax({
        url: " http://localhost:3000/xuat",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $.each(data, function(i, v) {
                $('#dataAdmin').append(
                    '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + v.Customer + '</td>' +
                    '<td>' + v.NameProduct + '</td>' +
                    '<td>' + v.Amount + '</td>' +
                    '<td>' + v.Price + '</td>' +
                    '<td>' + v.Date + '</td>' +
                    '<td>' + v.tinhtrang + '</td></tr>'
                )

            })
            $('#dataTable').DataTable();
        }
    })
}


$(document).ready(function() {
    // Customer.hoten()

    xuat.getOrder();
})