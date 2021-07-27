(function($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function() {
        $(this).on('blur', function() {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);




let Customer = {} || Customer

Customer.login = function() {
    let temp = false;
    let un = $("#username").val()
    let p = $("#pass").val()
    $.ajax({
        url: "http://localhost:3000/Customer",
        method: "GET",
        dataType: "JSON",
        success: function(data) {
            $.each(data, function(i, v) {
                if (p == v.Pass && un == v.UserName) {
                    temp = true;
                    session(v.id);
                    window.location.href = "file:///C:/Users/PC/Desktop/QuanLyPhanBon/startbootstrap-sb-admin-2-gh-pages/customer.html";
                }
                if (!temp) {
                    $("#al").removeClass('d-none')
                }
            })
        }
    })
}

function session(id) {
    let sessionObj = {}; //
    sessionObj.id = 0;
    sessionObj.cus_id = id;
    $.ajax({
        url: 'http://localhost:3000/session/0',
        method: "PUT",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(sessionObj),
        success: function(data) {

        }
    })
}


function addalert() {
    $("#al").addClass('d-none');
}

$(document).ready(function() {

})