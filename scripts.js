

// Initialize the product images
var listItems = document.querySelectorAll(".product-item");
for (var i = 0; i < listItems.length; i++) {
    showThumb(i, 0);
}


// Select all product items
document.querySelectorAll(".product-item").forEach(function(productItem, productIndex) {

    var imageIndex = 0;
    
    // Update image index
    function updateImageIndex(newImageIndex) {
        imageIndex = newImageIndex;
    }
    
    // Thumbnail image functions
    productItem.querySelectorAll(".thumbnail").forEach(function(thumbnail, imageIndex) {
        // Change product image to selected thumbnail
        thumbnail.onclick = function() {
            showThumb(productIndex, imageIndex);
            updateImageIndex(imageIndex);
        }
    })

    // Modal box functions
    productItem.querySelectorAll(".product-image").forEach(function(productImage) {
        // Open modal box
        productImage.onclick = function() {
            document.querySelectorAll(".modal-container")[productIndex].style.display = "block";
            // Show selected image
            imageIndex = showSlides(productIndex, imageIndex);
        }
        // Modal box switch to next image
        productItem.querySelector(".next").onclick = function() {
            imageIndex += 1;
            imageIndex = showSlides(productIndex, imageIndex);
        }
        // Modal box switch to previous image
        productItem.querySelector(".prev").onclick = function() {
            imageIndex -= 1;
            imageIndex = showSlides(productIndex, imageIndex);
        }
        // Close modal box for selected product
        productItem.querySelector(".close").onclick = function() {
            productItem.querySelector(".modal-container").style.display = "none";
            showThumb(productIndex, imageIndex);
        }
    })
});


// Change product image based on thumbnail that was clicked
function showThumb(productIndex, imageIndex) {
    var item = document.querySelectorAll(".product-item")[productIndex];
    var slides = item.querySelectorAll(".product-image");
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[imageIndex].style.display = "block";
}

// Change modal box image
function showSlides(productIndex, imageIndex) {
    var item = document.querySelectorAll(".product-item")[productIndex];
    var slides = item.querySelectorAll(".modal-image");
    if (imageIndex >= slides.length) {imageIndex = 0}
    if (imageIndex < 0) {imageIndex = slides.length - 1}
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[imageIndex].style.display = "block";
    return imageIndex;
}





// Initialize previously selected size value
var previousSizeIndex = 0;
var previousSizeHTML = "Select Size";
// Select size box for all product items
document.querySelectorAll('.size').forEach(function(sizeSelect, i) {
    
    sizeSelect.onchange = function() {
        // Update the size box to show `Size: ${selected size}` and replace previously selected size with original value
        sizeSelect.querySelectorAll("option")[previousSizeIndex].innerHTML = previousSizeHTML;
        previousSizeIndex = sizeSelect.selectedIndex;
        previousSizeHTML = sizeSelect.querySelectorAll("option")[previousSizeIndex].innerHTML;
        var selectedOption = sizeSelect.querySelectorAll("option")[sizeSelect.selectedIndex];
        selectedOption.innerHTML = `Size: ${selectedOption.innerHTML}`;

        // Update the price of a product when the user selects a size
        var price = sizeSelect.options[sizeSelect.selectedIndex].dataset.price;
        document.querySelectorAll('.price')[i].innerHTML = `$${price}`;
    }
});



// Initialize previously selected quantity value
var previousQtyIndex = 0;
// Select quantity box for all product items
document.querySelectorAll(".quantity").forEach(function(quantitySelect) {
    // Create options for every quantity select box
    for (var i = 1; i < 31; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        quantitySelect.appendChild(option);
    }
    // If quantity is changed, update quantity box to show `Quantity: ${selected amount}` and replace previously selected quantity with original value
    quantitySelect.onchange = function() {
        quantitySelect.querySelectorAll("option")[previousQtyIndex].innerHTML = previousQtyIndex;
        quantitySelect.querySelectorAll("option")[quantitySelect.selectedIndex].innerHTML = `Quantity: ${quantitySelect.selectedIndex}`;
        previousQtyIndex = quantitySelect.selectedIndex;
    }
});




// Get copyright year
document.querySelector(".copyright-year").innerHTML = new Date().getFullYear();