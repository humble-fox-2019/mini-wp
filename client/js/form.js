function registerPage() {
    $('#signin-page').hide();
    $('#register-page').show();
}
function loginPage() {
    $('#signin-page').show();
    $('#register-page').hide();
}
function userNameValidation( username , registerPage = false ) {
    if ( username.length < 5 ) {
        const err = "Username Min(5) Char"
        if ( registerPage ) 
            $('#usernameError-register').html(err)
        else 
            $('#usernameError').html(err)
    } else {
        if ( registerPage ) 
            $('#usernameError-register').html('')
        else 
            $('#usernameError').html('')
    }
}
function passwordValidation ( password , registerPage = false ) {
    if ( password.length < 5 ) {
        const err = "Password Min(5) Char"
        if ( registerPage ) 
            $('#passwordError-register').html(err)
        else
            $('#passwordError').html(err)
    } else {
        if ( registerPage ) 
            $('#passwordError-register').html('')
        else
            $('#passwordError').html('')
    }
}
function reenterPassword( password ) {
    const retype = $('#password-register').val()
    console.log ( password , retype )
    if ( password !=  retype) {
        $('#re-passwordError-register').html("please re-type the same password")
    } else {
        $('#re-passwordError-register').html('')
    }
}
function emailValidation ( email ) {

}

