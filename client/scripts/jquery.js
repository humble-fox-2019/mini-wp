var quill = new Quill('#editor', {
  theme: 'snow'
});

$(document).ready(function () {
  console.log('ready!')
  preventClick()

  nav_buttons()
})

function preventClick() {
  $('a').click(function (event) {
    event.preventDefault()
  })

  $('button').click(function (event) {
    event.preventDefault()
  })
}

function nav_buttons() {
  homeBtn()
  postsBtn()
  navNewPost()
}

function homeBtn() {
  $('#nav-home').click(function () {
    showPage('#page-welcome')
  })
}

function postsBtn() {
  $('#nav-posts').click(function () {
    showPage('#page-post-list')
  })
}

function navNewPost() {
  $('#nav-new-post').click(function () {
    showPage('#page-post-new')
  })
}

function showPage(param) {
  const pageDict = ['#page-welcome', '#page-post-list', '#page-post-new']

  pageDict.forEach(page => {
    if (page === param) $(param).show()
    else $(page).hide()
  })
}