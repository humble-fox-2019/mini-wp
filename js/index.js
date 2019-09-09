
var editor = new Quill('#editor', {
    theme: 'snow'
});

$(document).ready(function () {
    preventDefault()
    
    $('.dashboardBtn').click(() => { showMenu('dashboard') })
    $('#postsBtn').click(() => { showMenu('posts') })
    $('#mediaBtn').click(() => { showMenu('media') })
    $('#commentsBtn').click(() => { showMenu('comments') })
    $('#appearanceBtn').click(() => { showMenu('appearance') })
    $('#pluginsBtn').click(() => { showMenu('plugins') })
    $('.usersBtn').click(() => { showMenu('users') })
    $('#toolsBtn').click(() => { showMenu('tools') })
    $('#settingsBtn').click(() => { showMenu('settings') })
    $('#addNewPostBtn').click(() => { showMenu('addNewPost') })
    $('#publish').click(() => {
        $.growl.notice({
            title: "Hi,",
            message: "Website is under construction"
    }) })
})

function preventDefault() {
    $('a').click(function () {
        event.preventDefault()
    })
}

function showMenu(param) {
    const menus = ['dashboard', 'posts', 'media', 'comments', 'appearance', 'plugins', 'users', 'tools', 'settings', 'addNewPost']

    menus.forEach(menu => {
        if (menu === param) $(`#${param}`).show()
        else $(`#${menu}`).hide()
    })
}