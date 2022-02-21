const main = document.querySelector("main");

var queryString = location.search.substring(1);
var productIndex = queryString.split("|")[1];
var htmlPage = window.location.pathname;


window.addEventListener("DOMContentLoaded", async () => {
    // Get product data and main section
    const products = await loadData();

    // If on detail page
    if (htmlPage === "/detail.html") {
        const detailMain = document.querySelector("#detail");
        console.log("At detail.html");
        
        populateTitle(products, detailMain, productIndex);
        primaryImage = populatePrimaryImage(products, detailMain, productIndex);
        populateModal(products, detailMain);
        populateThumbnails(products, detailMain);

        // Populate Size, Price, and Quantity Content
        var sizeSelector = detailMain.querySelector(".size");
        var quantitySelector = detailMain.querySelector(".quantity");
        

        // Get number of size options
        numProductSizes = products[productIndex]["sizes"].length;
        for (var i = 0; i < numProductSizes; i++) {
            // Create size options
            var newSize = document.createElement("option");
            newSize.dataset.price = `${products[productIndex]["prices"][i]}`;
            newSize.value = `${products[productIndex]["sizes"][i]}`;
            newSize.innerHTML = `${products[productIndex]["sizes"][i]}`;
            sizeSelector.appendChild(newSize);
        }



        var slideIndex = 0;
    
        // Update image index
        function updateImageIndex(newSlideIndex) {
            slideIndex = newSlideIndex;
        }


        // Open modal box
        primaryImage.onclick = function() {
            detailMain.querySelector(".modal-container").style.display = "block";
            // Show selected image
            console.log("Image index: " + slideIndex);
            slideIndex = showSlides(slideIndex);
            document.body.style.overflow = "hidden";
        }
        // Modal box switch to next image
        detailMain.querySelector(".next").onclick = function() {
            slideIndex += 1;
            slideIndex = showSlides(slideIndex);
            showThumb(slideIndex);
        }
        // Modal box switch to previous image
        detailMain.querySelector(".prev").onclick = function() {
            slideIndex -= 1;
            slideIndex = showSlides(slideIndex);
            showThumb(slideIndex);
        }
        // Close modal box for selected product
        detailMain.querySelector(".close").onclick = function() {
            detailMain.querySelector(".modal-container").style.display = "none";
            showThumb(slideIndex);
            document.body.style.overflow = "auto";
        }

        // Change modal box image
        function showSlides(imageIndex) {
            var slides = detailMain.querySelectorAll(".modal-image");
            if (imageIndex >= slides.length) {imageIndex = 0}
            if (imageIndex < 0) {imageIndex = slides.length - 1}
            for (var i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[imageIndex].style.display = "block";
            return imageIndex;
        }

        // Thumbnail image functions
        detailMain.querySelectorAll(".thumbnail").forEach(function(thumbnail, imageIndex) {
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
        
        



        // Populate starting price value
        populateStartingPrice(products, detailMain, productIndex);


        // Initialize previously selected size value
        var previousSizeIndex = 0;
        var previousSizeHTML = "Select Size";

        sizeSelector.onchange = function() {
            // Update the size box to show `Size: ${selected size}` and replace previously selected size with original value
            sizeSelector.querySelectorAll("option")[previousSizeIndex].innerHTML = previousSizeHTML;
            previousSizeIndex = sizeSelector.selectedIndex;
            previousSizeHTML = sizeSelector.querySelectorAll("option")[previousSizeIndex].innerHTML;
            var selectedOption = sizeSelector.querySelectorAll("option")[sizeSelector.selectedIndex];
            selectedOption.innerHTML = `Size: ${selectedOption.innerHTML}`;

            // Update the price of a product when the user selects a size
            var price = sizeSelector.options[sizeSelector.selectedIndex].dataset.price;
            detailMain.querySelector('.price').innerHTML = `$${price}`;
        }


        // Initialize previously selected quantity value
        var previousQtyIndex = 0;
        var previousQtyHTML = "Quantity";

        var maxQuantity = products[productIndex]["maxQuantity"];

        // Create options for every quantity select box
        for (var i = 0; i < maxQuantity; i++) {
            var option = document.createElement('option');
            option.value = i + 1;
            option.innerHTML = i + 1;
            quantitySelector.appendChild(option);
        }
        // If quantity is changed, update quantity box to show `Quantity: ${selected amount}` and replace previously selected quantity with original value
        quantitySelector.onchange = function() {
            quantitySelector.querySelectorAll("option")[previousQtyIndex].innerHTML = previousQtyHTML;
            quantitySelector.querySelectorAll("option")[quantitySelector.selectedIndex].innerHTML = `Quantity: ${quantitySelector.selectedIndex}`;
            previousQtyIndex = quantitySelector.selectedIndex;
            previousQtyHTML = quantitySelector.selectedIndex;
        }





    }
    
    // If at index.html with no search query, populate with products
    else if (htmlPage === "/index.html") {
        console.log("At index.html");
        const indexMain = document.querySelector("#index");
        populateMain(products, indexMain);
    }
    

});



// Method to load JSON product data
async function loadData() {
    const response = await fetch("./products.json");
    const products = await response.json();
    return products;
}

// Method to populate index.html with all the products in "products.json"
function populateMain(products, indexMain) {
    // Create unordered list
    productList = document.createElement("ul");
    productList.classList.add("products");

    // Loop through all products, creating a list index for each
    for (var i = 0; i < products.length; i++) {
        var li = document.createElement("li");
        li.className = "product-item";
        li.innerHTML = `
                    <a href="detail.html?${products[i]["name"]}|${i}">
                        <div class="product-image-container">
                            <img class="product-image cursor">
                        </div>
                        <div class="product-content-container">
                            <p>
                                <h1 class="product-title"></h1>
                                <p class="price"></p>
                            </p>
                        </div>
                    </a>
        `;
        // Populate the title, primary image, and starting price for each product
        populateTitle(products, li, i);
        populatePrimaryImage(products, li, i);
        populateStartingPrice(products, li, i);

        // Add list index to unordered list
        productList.appendChild(li);
    }
    // Add unordered list to main
    indexMain.appendChild(productList); 
}



// Method to Populate Title Content
function populateTitle(products, container, productIndex) {
    container.querySelector(".product-title").innerHTML = products[productIndex]["name"];
}

// Method to Populate Primary Image Content
function populatePrimaryImage(products, container, productIndex) {
    primaryImage = container.querySelector(".product-image");
    primaryImage.src = `${products[productIndex]["productImages"][0]["mainSrc"]}`;
    primaryImage.alt = `${products[productIndex]["productImages"][0]["mainAlt"]}`;
    return primaryImage;
}

// Method to Populate Modal Images Content
function populateModal(products, container) {
    var modalContainer = container.querySelector(".modal-images");
    numModalImages = products[productIndex]["productImages"].length;
    for (var i = 0; i < numModalImages; i++) {
        // Create modal images
        var newModalImage = document.createElement("img");
        newModalImage.classList.add("modal-image", "cursor");
        newModalImage.setAttribute('src', `${products[productIndex]["productImages"][i]["mainSrc"]}`);
        newModalImage.setAttribute('alt', `${products[productIndex]["productImages"][i]["mainAlt"]}`);
        modalContainer.appendChild(newModalImage);
    }
}

// Method to Populate Thumbnail Images
function populateThumbnails(products, container) {
    var thumbnailContainer = container.querySelector(".thumbnail-container");
    numThumbnails = products[productIndex]["productImages"].length;
    for (var i = 0; i < numThumbnails; i++) {
        // Create thumbnails
        var newThumbnail = document.createElement("img");
        newThumbnail.classList.add("thumbnail", "cursor");
        newThumbnail.setAttribute('src', `${products[productIndex]["productImages"][i]["thumbSrc"]}`);
        newThumbnail.setAttribute('alt', `${products[productIndex]["productImages"][i]["thumbAlt"]}`);
        thumbnailContainer.appendChild(newThumbnail);
    }
}

// Method to Populate Starting Price
function populateStartingPrice(products, container, productIndex) {
    container.querySelector(".price").innerHTML = `From $${products[productIndex]["prices"][0]}`;
}







// Get copyright year
document.querySelector(".copyright-year").innerHTML = new Date().getFullYear();




