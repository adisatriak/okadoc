// Script for toggle sidebar
$(function() {
  $('.navbar__toggler').on('click', function() {
    $('.sidebar').toggleClass('shrink show');
  });
});

$(function() {
  $('.notify').on('click', function() {
    $('.control-sidebar').toggleClass('active');
  });
});

// var sidebarBox = document.querySelector('.control-sidebar'),
//   sidebarBtn = document.querySelector('.btn-test');

// sidebarBtn.addEventListener('click', function(event) {
//   sidebarBtn.classList.toggle('active');
//   sidebarBox.classList.toggle('active');
// });

// window.addEventListener('keydown', function(event) {
//   if (sidebarBox.classList.contains('active') && event.keyCode === 27) {
//     sidebarBtn.classList.remove('active');
//     sidebarBox.classList.remove('active');
//   }
// });
