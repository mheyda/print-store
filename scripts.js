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

    var imageIndex = 0;
    function updateImageIndex(newImageIndex) {
        imageIndex = newImageIndex;
    }
    
    // Function to change product image based on thumbnail that is clicked
    productItem.querySelectorAll(".thumbnail").forEach(function(thumbnail, imageIndex) {
        // Listen for a click on the thumbnail image
        console.log("Thumbnail imageIndex: " + imageIndex);
        thumbnail.onclick = function() {
            console.log("Thumbnail imageIndex: " + imageIndex);
            // Call function to change the product image to the selected thumbnail
            showThumb(productIndex, imageIndex);
            updateImageIndex(imageIndex);
        }
    })

    // Function to open modal box for selected product
    productItem.querySelectorAll(".product-image").forEach(function(productImage) {
        console.log("NEW IMAGEINDEX: " + imageIndex);
        // Listen for a click on the product image
        productImage.onclick = function() {
            // Open modal box
            document.querySelectorAll(".modal")[productIndex].style.display = "block";
            // Show selected image
            console.log("Open modal passing in imageIndex: " + imageIndex);
            imageIndex = showSlides(productIndex, imageIndex);
            console.log("Open modal now has imageIndex: " + imageIndex);
        }

        // Modal box switch to next image
        productItem.querySelector(".next").onclick = function() {
            console.log("Next button received imageIndex: " + imageIndex);
            imageIndex += 1;
            console.log("Next button passing in imageIndex: " + imageIndex);
            imageIndex = showSlides(productIndex, imageIndex);
            console.log("Next button now has imageIndex: " + imageIndex);
        }

        // Modal box switch to previous image
        productItem.querySelector(".prev").onclick = function() {
            console.log("Previous button received imageIndex: " + imageIndex);
            imageIndex -= 1;
            console.log("Previous button passing in imageIndex: " + imageIndex);
            imageIndex = showSlides(productIndex, imageIndex);
            console.log("Previous button now has imageIndex: " + imageIndex);
        }
        

        // Close modal box for selected product
        productItem.querySelector(".close").onclick = function() {
            console.log("Closed button received imageIndex: " + imageIndex);
            productItem.querySelector(".modal").style.display = "none";
            showThumb(productIndex, imageIndex);
            console.log("Closed button now has imageIndex: " + imageIndex);
        }
    })

});



function showThumb(productIndex, imageIndex) {
    var item = document.querySelectorAll(".product-item")[productIndex];
    var slides = item.querySelectorAll(".product-image");
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[imageIndex].style.display = "block";
}


function showSlides(productIndex, imageIndex) {
    var item = document.querySelectorAll(".product-item")[productIndex];
    var slides = item.querySelectorAll(".mySlides");
    if (imageIndex >= slides.length) {imageIndex = 0}
    if (imageIndex < 0) {imageIndex = slides.length - 1}
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[imageIndex].style.display = "block";
    return imageIndex;
}

