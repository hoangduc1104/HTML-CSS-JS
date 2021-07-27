let Customer = {} || Customer

Customer.Sign_up = function() {
    var obj = {}
    obj.Name = $("#name").val();
    obj.PhoneNumber = $("#phone").val()
    obj.UserName = $("#username").val()
    obj.Pass = $("#pass").val()

    $.ajax({
        url: "http://localhost:3000/Customer",
        method: "POST",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(obj),
        success: function(data) {
            alert("da them du lieu")
            window.location.href = "../Home.html";
        }
    })

}

function addclass(data) {

}

function checkinfo() {
    let temp = true;
    if ($("#name").val() == "") {
        $("#name").parent().addClass("alert-validate")
        $("#nd").empty()
        $("#al").removeClass('d-none')
        temp = false;
    }
    if ($("#phone").val() == "") {
        $("#phone").parent().addClass("alert-validate")
        $("#nd").empty()
        $("#al").removeClass('d-none')
        temp = false;
    }
    if ($("#username").val() == "") {
        $("#username").parent().addClass("alert-validate")
        $("#nd").empty()
        $("#al").removeClass('d-none')
        temp = false;
    }
    if ($("#pass").val() == "") {
        $("#pass").parent().addClass("alert-validate")
        $("#nd").empty()
        $("#al").removeClass('d-none')
        temp = false;
    }
    if ($("#pass2").val() == "") {
        $("#pass2").parent().addClass("alert-validate")
        $("#nd").empty()
        $("#al").removeClass('d-none')
        temp = false;
    }
    if ($("#pass2").val() != $("#pass").val()) {
        $("#nd").empty()
        $("#nd").append('Mật khẩu xác nhận không đúng.')
        $("#al").removeClass('d-none')
        temp = false;
    }
    if (temp) {
        Customer.Sign_up()
    }
}
$('.validate-form .input100').each(function() {
    $(this).focus(function() {
        hideValidate(this);
    });
});

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

function addalert() {
    $("#al").addClass('d-none');
}