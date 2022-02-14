document.addEventListener('DOMContentLoaded', () => {

    // Update the price of an item when the user selects a size
    document.querySelectorAll('select').forEach(function(select, i) {
        select.onchange = function() {
            var price = select.options[select.selectedIndex].dataset.price;
            document.querySelectorAll('.price')[i].innerHTML = `$${price}`;
        }
    });


    
});

// Initialize the product images
var listItems = document.querySelectorAll(".product-item");
for (var i = 0; i < listItems.length; i++) {
    showThumb(i, 0);
}


// Select all product items
document.querySelectorAll(".product-item").forEach(function(productItem, productIndex) {
    
    // Function to change product image based on thumbnail that is clicked
    productItem.querySelectorAll(".thumbnail").forEach(function(thumbnail, thumbIndex) {
        // Listen for a click on the thumbnail image
        thumbnail.onclick = function() {
            // Call function to change the product image to the selected thumbnail
            showThumb(productIndex, thumbIndex);
        }
    })

    // Function to open modal box for selected product
    productItem.querySelectorAll(".product-image").forEach(function(productImage, imageIndex) {
        // Listen for a click on the product image
        productImage.onclick = function() {
            // Open modal box
            document.querySelectorAll(".modal")[productIndex].style.display = "block";
            // Show selected image
            showSlides(productIndex, imageIndex);
        }
    })

    // Close modal box for selected product
    productItem.querySelector(".close").onclick = function() {
        document.querySelectorAll(".modal")[productIndex].style.display = "none";
    }
});



function showThumb(productIndex, thumbIndex) {
    var item = document.querySelectorAll(".product-item")[productIndex];
    var slides = item.querySelectorAll(".product-image");
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[thumbIndex].style.display = "block";
}

function plusSlides(n) {
    imageIndex += n;
    showSlides(productIndex, imageIndex);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(productIndex, imageIndex) {
    console.log("Product Index: " + String(productIndex) + "\nImage Index: " + String(imageIndex));
    var item = document.querySelectorAll(".product-item")[productIndex];
    var slides = item.querySelectorAll(".mySlides");
    
    if (imageIndex >= slides.length) {slideIndex = 0}
    if (imageIndex < 0) {slideIndex = slides.length - 1}
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[imageIndex].style.display = "block";
    console.log(slides[imageIndex]);
}

