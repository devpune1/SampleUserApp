$(document).ready(function () {
alert()
    $("#testingforms").validate({
        rules: {
            userName: {
                required: true
            }
        },
        // submitHandler only for demo
        // leave out for default form action
        // otherwise ajax() goes inside
        submitHandler: function (form) { // for demo
            alert('valid form submit');
            return false;
        }
    });

});
