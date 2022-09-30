window.onload = function(){ document.getElementById("loaderAnim").style.display = "none" };


// // 
// // SELECTIZE JS
//$(document).ready(function () {
//            $('#select-state').selectize({
//                sortField: 'text'
//            });
//        });
//
//$(document).ready(function () {
//    $('#select-city').selectize({
//        sortField: 'text'
//    });
//});

// FULL YEAR JS
const d = new Date();
        let year = d.getFullYear();
        document.getElementById('yearSpan').innerHTML = year;
// FULL YEAR JS


// document.getElementById('aoBtn').addEventListener('click' ,showAo);

// function showAo(){
//     var showBtn = document.getElementById('aoTable');
//     showBtn.classList.toggle('show-button')
// }