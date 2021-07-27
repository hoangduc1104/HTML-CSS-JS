let user = {} || user;
let Customer = {} || Customer;
let tratien = {} || tratien;
let no
let tra
user.getInfor = function() {
    $.ajax({
        url: "http://localhost:3000/session/0",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            user.getUser(data.cus_id)
            Customer.anhdaidien(data.cus_id)
                // user.getUser2(data.cus_id)
        }
    })
}
user.getUser = function(id) {
    $.ajax({
        url: "http://localhost:3000/Customer/" + id,
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $("#hoten").append(data.Name)
            xuat.getOrder(data.Name);
            tratien.lstratien(data.Name)
        }
    })

}

// user.getUser2 = function(id) {
//     $.ajax({
//         url: "http://localhost:3000/Customer/" + id,
//         method: "GET",
//         dataType: "JSON",
//         success: function(data) {
//             tratien.lstratien(data.Name)

//         }
//     })

// }

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


xuat.getOrder = function(hoten) {
    let t = 0
    $.ajax({
        url: " http://localhost:3000/xuat",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $('#dataTable').DataTable().destroy();

            $.each(data, function(i, v) {
                if (hoten == v.Customer) {
                    $('#datatb').append(
                        '<tr>' +
                        '<td>' + v.NameProduct + '</td>' +
                        '<td>' + v.Amount + '</td>' +
                        '<td>' + v.Price + '</td>' +
                        '<td>' + v.Date + '</td>' +
                        '<td>' + v.tinhtrang + '</td></tr>'
                    )
                    t += v.Price
                    no = t
                    $("#tongno").empty()
                    $("#tongno").append(t.toLocaleString("it-IT", { style: "currency", currency: "VND" }))
                }
            })
            $('#dataTable').DataTable();
        }
    })
}

tratien.lstratien = function(hoten) {
    let t = 0
    $.ajax({
        url: " http://localhost:3000/tratien",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $.each(data, function(i, v) {
                if (hoten == v.name) {
                    t += v.sotien
                    tra = t;
                    $("#tiendatra").empty()
                    $("#tiendatra").append(t.toLocaleString("it-IT", { style: "currency", currency: "VND" }))
                    conno(no, tra);
                }
            })
        }
    })
}

Customer.anhdaidien = function(id) {
    $.ajax({
        url: " http://localhost:3000/Customer/" + id,
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $("#anhdaidien").attr("src", data.Image)
        }
    })
}

function conno(no, tra) {
    $("#tienconno").append((no - tra).toLocaleString("it-IT", { style: "currency", currency: "VND" }))
}
$(document).ready(function() {
    // Customer.hoten()
    user.getInfor();
    xuat.getOrder();

})