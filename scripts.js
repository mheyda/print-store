const main = document.querySelector("main");

const detail = document.querySelector("#detail");

var queryString = location.search.substring(1);
var a = queryString.split("|")[1];
console.log("Q String: " + queryString);




async function loadData() {
    const response = await fetch("./products.json");
    const products = await response.json();
    return products;
}

window.addEventListener("DOMContentLoaded", async () => {
    const products = await loadData();
    
    
    if (a == products["product"][0]["id"]) {
        console.log("success");
    }
    console.log(a);
    if (a) {
        var titleContainer = detail.querySelector(".product-title");
        var imageContainer = detail.querySelector(".product-image-container");
        var thumbnailContainer = detail.querySelector(".thumbnail-container");
        var modalContainer = detail.querySelector(".modal-images");
        
        
        titleContainer.innerHTML = products["product"][a - 1]["name"];
        
        imageContainer.innerHTML = `<img class="product-image cursor" src="${products["product"][a - 1]["primaryImage"]}" alt="">`;
        



        var primaryImg = document.createElement("img");
        primaryImg.setAttribute('src', `${products["product"][a - 1]["primaryImage"]}`);
        primaryImg.classList.add("cursor");
        modalContainer.appendChild(primaryImg);
        
        numSecondaryImages = Object.keys(products["product"][a - 1]["secondaryImages"]).length;
        for (var i = 1; i < numSecondaryImages + 1; i++) {
            var newImg = document.createElement("img");
            newImg.setAttribute('src', `${products["product"][a - 1]["secondaryImages"][i]}`);
            newImg.classList.add("cursor");
            //newImg.setAttribute('alt', '');
            console.log(newImg);
            modalContainer.appendChild(newImg);


            var newThumbnail = document.createElement("img");
            newThumbnail.setAttribute('src', `${products["product"][a - 1]["thumbnailImages"][i]}`);
            newThumbnail.classList.add("thumbnail", "cursor");
            thumbnailContainer.appendChild(newThumbnail);
            //newThumbnail.setAttribute('alt', '');

        }
           
        
    }
    

    console.log(main);
    
    main.addEventListener("click", function (e) {
        console.log(e.target.dataset.id);
        const id = e.target.dataset.id;



        
        



    });
    
    populateMain(products);






    function populateMain(products) {
        var ul = document.querySelector(".products");

        for (var i = 0; i < products["product"].length; i++) {

            var li = document.createElement("li");
            li.className = "product-item";
            li.innerHTML = `
                        <a href="detail.html?${products["product"][i]["name"]}|${products["product"][i]["id"]}">
                            <div class="product-image-container">
                                <img class="product-image cursor" data-id="${i}" src="${products["product"][i]["primaryImage"]}" alt="">
                            </div>
                            <div class="product-content-container">
                                <p>
                                    ${products["product"][i]["name"]}<br>
                                    <span class="price">${products["product"][i]["startingPrice"]}</span><br>
                                </p>
                            </div>
                        </a>
            `;
            ul.appendChild(li);
    
            
        }
    }


    populateDetail(0);

    function populateDetail(index) {

    }



});




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
            document.body.style.overflow = "hidden";
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
            document.body.style.overflow = "auto";
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




