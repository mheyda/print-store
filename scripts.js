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
            console.log("Open modal passing in imageIndex: " + imageIndex);
            imageIndex = showSlides(productIndex, imageIndex);
            console.log("Open modal now has imageIndex: " + imageIndex);
        }

        // Modal box switch to previous image
        productItem.querySelector(".prev").onclick = function() {
            console.log("Previous button received imageIndex: " + imageIndex);
            imageIndex -= 1;
            console.log("Previous button passing in imageIndex: " + imageIndex);
            imageIndex = showSlides(productIndex, imageIndex);
            console.log("Previous button now has imageIndex: " + imageIndex);
        }
        // Modal box switch to next image
        productItem.querySelector(".next").onclick = function() {
            console.log("Next button received imageIndex: " + imageIndex);
            imageIndex += 1;
            console.log("Next button passing in imageIndex: " + imageIndex);
            imageIndex = showSlides(productIndex, imageIndex);
            console.log("Next button now has imageIndex: " + imageIndex);
        }
    })

    // Close modal box for selected product
    productItem.querySelector(".close").onclick = function() {
        productItem.querySelector(".modal").style.display = "none";
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


function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(productIndex, imageIndex) {
    console.log(imageIndex);
    var item = document.querySelectorAll(".product-item")[productIndex];
    var slides = item.querySelectorAll(".mySlides");
    
    console.log("Slide: " + slides + "\nSlide length: " + slides.length);

    if (imageIndex >= slides.length) {
        console.log(imageIndex);
        console.log("YES");
        imageIndex = 0;
        console.log(imageIndex);
    }
    if (imageIndex < 0) {imageIndex = slides.length - 1}
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    console.log("Product Index: " + String(productIndex) + "\nImage Index: " + String(imageIndex));
    slides[imageIndex].style.display = "block";
    console.log(slides[imageIndex]);
    return imageIndex;
}

