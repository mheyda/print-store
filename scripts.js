document.addEventListener('DOMContentLoaded', () => {

    // Update the price of an item when the user selects a size
    document.querySelectorAll('select').forEach(function(select, i) {
        select.onchange = function() {
            var price = select.options[select.selectedIndex].dataset.price;
            document.querySelectorAll('.price')[i].innerHTML = `$${price}`;
        }
    });


    
});


document.querySelectorAll(".thumbnail-small").forEach(function(item, i) {
    item.onclick = function() {
        showThumb(i + 1);
    }
});




showThumb(1);

function showThumb(n) {
    var slides = document.getElementsByClassName("myThumbSlides");
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[n-1].style.display = "block";
}








function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

