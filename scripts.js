const main = document.querySelector("main");

var queryString = location.search.substring(1);
var productIndex = queryString.split("|")[1];
var htmlPage = window.location.pathname;


window.addEventListener("DOMContentLoaded", async () => {
    // Get product data
    const products = await loadData();

    // If on detail page
    if (htmlPage === "/detail.html") {
        console.log("At detail.html");
        // Get containers from detail page
        const detail = document.querySelector("#detail");
        var titleContainer = detail.querySelector(".product-title");
        var imageContainer = detail.querySelector(".product-image-container");
        var thumbnailContainer = detail.querySelector(".thumbnail-container");
        var modalContainer = detail.querySelector(".modal-images");
        
        // Update title for selected product
        titleContainer.innerHTML = products[productIndex]["name"];
        
        // Populate image container for selected product
        primaryImage = document.createElement("img");
        primaryImage.classList.add("product-image", "cursor");
        primaryImage.setAttribute("src", `${products[productIndex]["productImages"][0]["mainSrc"]}`);
        primaryImage.setAttribute("alt", `${products[productIndex]["productImages"][0]["mainAlt"]}`);
        imageContainer.appendChild(primaryImage);
        
        // Get number of thumbnails/modal images
        numProductImages = Object.keys(products[productIndex]["productImages"]).length;
        console.log("length product images: " + numProductImages);
        // Loop through creating html elements for every thumbnail and every modal image
        for (var i = 0; i < numProductImages; i++) {
            // Create thumbnails
            var newThumbnail = document.createElement("img");
            newThumbnail.classList.add("thumbnail", "cursor");
            newThumbnail.setAttribute('src', `${products[productIndex]["productImages"][i]["thumbSrc"]}`);
            newThumbnail.setAttribute('alt', `${products[productIndex]["productImages"][i]["thumbAlt"]}`);
            thumbnailContainer.appendChild(newThumbnail);
            
            // Create modal images
            var newImg = document.createElement("img");
            newImg.classList.add("modal-image", "cursor");
            newImg.setAttribute('src', `${products[productIndex]["productImages"][i]["mainSrc"]}`);
            newImg.setAttribute('alt', `${products[productIndex]["productImages"][i]["mainAlt"]}`);
            console.log(newImg);
            modalContainer.appendChild(newImg);
        }




        var imageIndex = 0;
    
        // Update image index
        function updateImageIndex(newImageIndex) {
            imageIndex = newImageIndex;
        }


        // Open modal box
        primaryImage.onclick = function() {
            detail.querySelector(".modal-container").style.display = "block";
            // Show selected image
            console.log("Image index: " + imageIndex);
            imageIndex = showSlides(imageIndex);
            document.body.style.overflow = "hidden";
        }
        // Modal box switch to next image
        detail.querySelector(".next").onclick = function() {
            imageIndex += 1;
            imageIndex = showSlides(imageIndex);
            showThumb(imageIndex);
        }
        // Modal box switch to previous image
        detail.querySelector(".prev").onclick = function() {
            imageIndex -= 1;
            imageIndex = showSlides(imageIndex);
            showThumb(imageIndex);
        }
        // Close modal box for selected product
        detail.querySelector(".close").onclick = function() {
            detail.querySelector(".modal-container").style.display = "none";
            showThumb(imageIndex);
            document.body.style.overflow = "auto";
        }

        // Change modal box image
        function showSlides(imageIndex) {
            var slides = detail.querySelectorAll(".modal-image");
            if (imageIndex >= slides.length) {imageIndex = 0}
            if (imageIndex < 0) {imageIndex = slides.length - 1}
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[imageIndex].style.display = "block";
            return imageIndex;
        }

        // Thumbnail image functions
        detail.querySelectorAll(".thumbnail").forEach(function(thumbnail, imageIndex) {
            // Change product image to selected thumbnail
            thumbnail.onclick = function() {
                showThumb(imageIndex);
                updateImageIndex(imageIndex);
            }
        })

        // Change product image based on thumbnail that was clicked
        function showThumb(imageIndex) {
            primaryImage.setAttribute("src", `${products[productIndex]["productImages"][imageIndex]["mainSrc"]}`);
            primaryImage.setAttribute("alt", `${products[productIndex]["productImages"][imageIndex]["mainAlt"]}`)
            console.log(primaryImage.src);
        }        
    }
    
    // If at index.html with no search query, populate with products
    else if (htmlPage === "/index.html") {
        console.log("At index.html");
        populateMain(products);
    }
    

});



// Method to load JSON product data
async function loadData() {
    const response = await fetch("./products.json");
    const products = await response.json();
    return products;
}

// Method to populate index.html with all the products in "products.json"
function populateMain(products) {
    var productList = document.querySelector(".products");

    for (var i = 0; i < products.length; i++) {
        var li = document.createElement("li");
        li.className = "product-item";
        li.innerHTML = `
                    <a href="detail.html?${products[i]["name"]}|${i}">
                        <div class="product-image-container">
                            <img class="product-image cursor" data-id="${i}" src="${products[i]["productImages"][0]["mainSrc"]}" alt="${products[i]["productImages"][0]["mainAlt"]}">
                        </div>
                        <div class="product-content-container">
                            <p>
                                ${products[i]["name"]}<br>
                                <span class="price">${products[i]["startingPrice"]}</span><br>
                            </p>
                        </div>
                    </a>
        `;
        productList.appendChild(li);   
    }
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




