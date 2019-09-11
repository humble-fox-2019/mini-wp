//Not used anymore

$(document).ready(function(){

    $('btn-invitation-to-write, .btn-update-article').click(function(){
        $('#article-form').css({ display : 'block' })
    })

    $('btn-close-popup').click(function(){
        $('#article-form').css({ display : 'none'})
    })
 });

 