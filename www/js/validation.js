$(function() {

   // Setup form validation on the #register-form element
   $("#register-form").validate({

       // Specify the validation rules
       rules: {
           name: "required",
          userid: "required",
           email: {
               required: true,
               email: true
           },
           userdate: {
               required: true,

           },
           password: {
               required: true,
               minlength: 5
           },
           mobile: {
               required: true,
               maxlength:10
           },
          confirmpassword: {
               required: true,
               minlength: 5
           },
       },

       // Specify the validation error messages
       messages: {
           name: "Please enter your first name",
           userid: "Please enter your last name",
          mobile: {
               required: "Please provide a password",
               minlength: "Your password must be at least 8 characters long"
           },
           password: {
               required: "Please provide a password",
               minlength: "Your password must be at least 5 characters long"
           },
           confirmpassword: {
               required: "Please provide a password",
               minlength: "Your password must be at least 5 characters long"
           },
           email: "Please enter a valid email address",
           userDate: "Please proper date",
       },

       submitHandler: function(form) {
           form.submit();
       }




   });

 });
