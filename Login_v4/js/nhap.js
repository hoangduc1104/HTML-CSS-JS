var today = new Date();
var day = today.getDay();
var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var day_name = "";
let nhap = {} || nhap
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

nhap.getOrder = function() {
    $.ajax({
        url: " http://localhost:3000/nhap",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $.each(data, function(i, v) {
                nhap.getDetailOrder(v.ds, v.date, v.id);

            })
            $('#dataTable').DataTable();
        }
    })
}
nhap.getDetailOrder = function(ds, date, id) {
    for (let i = 0; i < ds.length; i++) {

        $('#dataAdmin').append(
            '<tr>' +
            '<td>' + id + '</td>' +
            '<td>' + ds[i].NameProduct + '</td>' +
            '<td>' + ds[i].Amount + '</td>' +
            '<td>' + ds[i].Price + '</td>' +
            '<td>' + date + '</td></tr>'
        )
    }

}


$(document).ready(function() {
    // Customer.hoten()

    nhap.getOrder();
})