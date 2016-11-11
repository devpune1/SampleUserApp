

 $(document).ready(function() {

   // Setup form validation on the #register-form element
   $("#regform").validate({

       // Specify the validation rules
       rules: {
           fname: "required",

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
               maxlength:2
           },
           mobile: {
               required: true,
               maxlength:10
           },
          confirmpassword: {
               required: true,
               maxlength:2
           },
       },

       // Specify the validation error messages
       messages: {

           fname: "Please enter your first name",
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





   })

});
