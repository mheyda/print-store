//sessionStorage.clear()

// Get query string, product index, and html page name
var queryString = location.search.substring(1);
var productIndex = queryString.split("|")[0];
var htmlPage = window.location.pathname;

// Get main sections for index, detail, and cart pages
const indexMain = document.querySelector("#index");
const detailMain = document.querySelector("#detail");
const cartMain = document.querySelector("#cart");

// If cart is empty, create one
if (sessionStorage.getItem("products") === null) {
    cart = [];
    sessionStorage.setItem("products", JSON.stringify(cart));
}

// Keep cart quantity on nav updated
updateCartQuantity();

// Auto update copyright year
document.querySelector(".copyright-year").innerHTML = new Date().getFullYear();

// ----------------- //
// detail.html page  //
// ----------------- //
if (htmlPage === "/detail.html") {
    window.addEventListener("DOMContentLoaded", async () => {
        // Get product data
        const products = await loadData();

        // Populate title, primary image, starting price, modal images, thumbnail images, sizes and quantities
        populateTitle(products, detailMain, productIndex);
        primaryImage = populatePrimaryImage(products, detailMain, productIndex);
        populateStartingPrice(products, detailMain, productIndex);
        populateModal(products, detailMain);
        populateThumbnails(products, detailMain);
        sizeSelector = populateSizes(products, detailMain, productIndex);
        quantitySelector = populateQuantities(products, detailMain, productIndex);
        
        // Initialize previously selected SIZE value
        var previousSizeIndex = 0;
        var previousSizeHTML = "Select Size";
        // If size is changed, update the size box to show `Size: ${selected size}` and replace previously selected size with original value
        sizeSelector.onchange = function() {
            sizeSelector.querySelectorAll("option")[previousSizeIndex].innerHTML = previousSizeHTML;
            previousSizeIndex = sizeSelector.selectedIndex;
            previousSizeHTML = sizeSelector.querySelectorAll("option")[previousSizeIndex].innerHTML;
            var selectedOption = sizeSelector.querySelectorAll("option")[sizeSelector.selectedIndex];
            selectedOption.innerHTML = `Size: ${selectedOption.innerHTML}`;
            var price = sizeSelector.options[sizeSelector.selectedIndex].dataset.price;
            detailMain.querySelector('.price').innerHTML = `$${price}`;
        }

        // Initialize previously selected QUANTITY value
        var previousQtyIndex = 0;
        var previousQtyHTML = "Quantity";
        // If quantity is changed, update quantity box to show `Quantity: ${selected amount}` and replace previously selected quantity with original value
        quantitySelector.onchange = function() {
            quantitySelector.querySelectorAll("option")[previousQtyIndex].innerHTML = previousQtyHTML;
            quantitySelector.querySelectorAll("option")[quantitySelector.selectedIndex].innerHTML = `Quantity: ${quantitySelector.selectedIndex}`;
            previousQtyIndex = quantitySelector.selectedIndex;
            previousQtyHTML = quantitySelector.selectedIndex;
        }

        // Modal and thumbnail functions
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
        // Close modal box
        detailMain.querySelector(".close").onclick = function() {
            detailMain.querySelector(".modal-container").style.display = "none";
            showThumb(slideIndex);
            document.body.style.overflow = "auto";
        }
        // Update modal box image
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
        // Change product image based on thumbnail that was clicked or modal image that was closed
        function showThumb(imageIndex) {
            primaryImage.setAttribute("src", `${products[productIndex]["productImages"][imageIndex]["mainSrc"]}`);
            primaryImage.setAttribute("alt", `${products[productIndex]["productImages"][imageIndex]["mainAlt"]}`)
            console.log(primaryImage.src);
        } 
        // When a thumbnail is clicked, update primary image and update image index
        thumbnails = detailMain.querySelectorAll(".thumbnail");
        thumbnails.forEach(function(thumbnail, imageIndex) {
            thumbnail.onclick = function() {
                showThumb(imageIndex);
                updateImageIndex(imageIndex);
            }
        });

        // Add item to cart from detail page
        detailMain.querySelector("#add-to-cart").onsubmit = function() {
            // Get product name, quantity, and size that user wants to add to cart
            productName = detailMain.querySelector(".product-title").innerHTML;
            productQuantity = detailMain.querySelector(".quantity").options[detailMain.querySelector(".quantity").selectedIndex].value;
            productSize = detailMain.querySelector(".size").options[detailMain.querySelector(".size").selectedIndex].value;
            productPrice = detailMain.querySelector(".price").innerHTML;

            // Pull cart data from storage
            cart = JSON.parse(sessionStorage.getItem("products"));
            
            // Loop through existing objects and see if the item user wants to add to cart is already in their cart
            // If it is, add the selected quantity to the existing quantity
            var alreadyExists = false;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i]["name"] === productName && cart[i]["size"] === productSize) {
                    alreadyExists = true;
                    if ((parseInt(cart[i]["quantity"]) + parseInt(productQuantity)) > parseInt(products[cart[i]["index"]]["maxQuantity"])) {
                        alert("Maximum quantity for this item is " + String(parseInt(products[cart[i]["index"]]["maxQuantity"])) + ".");
                    }
                    else {
                        cart[i]["quantity"] = String(parseInt(cart[i]["quantity"]) + parseInt(productQuantity));
                    }
                }
            }
            // If it's not already in the cart, add it to the cart
            if (alreadyExists === false) {
                cart.push({name: `${productName}`, size: `${productSize}`, quantity: `${productQuantity}`, price:`${productPrice}`, index:`${productIndex}`});
            }
            // Push cart back to session storage
            sessionStorage.setItem("products", JSON.stringify(cart));  

            // Update cart quantity
            updateCartQuantity();

            // Notify user that item has been added to cart
            addToCartButton = detailMain.querySelector(".add-to-cart");
            addToCartButton.value = "Item has been added!";
            timeout = setTimeout(addedToCartMessage, 3000);
            function addedToCartMessage() {
                console.log("Waiting")
                detailMain.querySelector(".add-to-cart").value = "Add to Cart";
            }

            // Don't refresh page
            return false;     
        }
    })
}
// ----------------- //
// cart.html page   //
// ----------------- //
else if (htmlPage === "/cart.html") {
    window.addEventListener("DOMContentLoaded", async () => {
        // Get product data
        const products = await loadData();

        cart = JSON.parse(sessionStorage.getItem("products"));

        cartList = cartMain.querySelector("ul");

        // If cart is empty, display a message
        if (cart.length === 0) {
            cartMain.querySelector("#empty-cart").style.display = "block";
            cartMain.querySelector("#cart-header").style.display = "none";
            cartMain.querySelector("#subtotal").style.display = "none";
            cartMain.querySelector("#checkout-button").style.display = "none";
        }

        // Loop through cart items and add them to cart.html
        for (var i = 0; i < cart.length; i++) {
            // Hide empty cart message and display header and subtotal
            cartMain.querySelector("#empty-cart").style.display = "none";
            cartMain.querySelector("#cart-header").style.display = "flex";
            cartMain.querySelector("#subtotal").style.display = "block";
            cartMain.querySelector("#checkout-button").style.display = "flex";
            // Find JSON array index of product in cart to get image src
            for (var j = 0; j < products.length; j++) {
                if (cart[i]["name"] === products[j]["name"].replace(/-/g, " ")) {
                    var cartImageSrc = products[j]["productImages"][0]["mainSrc"];
                    var cartImageAlt = products[j]["productImages"][0]["mainAlt"]
                    var cartMaxQuantity = products[j]["maxQuantity"];
                }
            }
            // Create list item to add to cart list with proper information
            var li = document.createElement("li");
            li.classList.add("cart-item");
            li.innerHTML = 
                `<a href="/cart.html" class="remove-from-cart cursor">&times;</a>
                <a href="detail.html?${cart[i]["index"]}|${cart[i]["name"]}"><img class="cart-image cursor" src="${cartImageSrc}" alt="${cartImageAlt}"></a>
                <div class="cart-description">
                    <span class="cart-product-name">${cart[i]["name"]}</span>
                    <br>
                    <span class="cart-product-size">Size: ${cart[i]["size"]}</span>
                </div>
                <input class="cart-quantity" type="number" value="${parseInt(cart[i]["quantity"])}" min="1" max="${cartMaxQuantity}">
                
                <span class="cart-price">$${(parseFloat(cart[i]["price"].replace("$", "")) * parseInt(cart[i]["quantity"])).toFixed(2)}</span>`
            cartList.appendChild(li);
        }
        
        // Initialize subtotal
        updateSubtotal();


        // Listen for user to change quantity
        cartQuantityInputs = cartMain.querySelectorAll(".cart-quantity");
        cartQuantityInputs.forEach(function(cartQuantityInput, index) {
            cartQuantityInput.onchange = function() {
                // Don't allow user to input less than 1
                if (cartQuantityInput.value < 1) {
                    cartQuantityInput.value = 1;
                    alert("Quantity must be greater than zero.");
                    updateSubtotal();
                }
                // Don't allow user to input more than max quantity allowed for item
                if (cartQuantityInput.value > parseInt(products[cart[index]["index"]]["maxQuantity"])) {
                    console.log("Input value: " + cartQuantityInput.value);
                    console.log("Max quant: " + products[cart[index]["index"]]["maxQuantity"]);
                    cartQuantityInput.value = products[cart[index]["index"]]["maxQuantity"];
                    alert("Maximum quantity for this item is " + String(products[cart[index]["index"]]["maxQuantity"]) + ".")
                    updateSubtotal();
                }
                cart[index]["quantity"] = cartQuantityInput.value;
                // Push cart back to session storage
                sessionStorage.setItem("products", JSON.stringify(cart)); 
                // Update nav shopping cart value
                updateCartQuantity();
                // Update total item price
                totalItemPrice = (cartQuantityInput.value * parseFloat(cart[index]["price"].replace("$", ""))).toFixed(2);
                cartMain.querySelectorAll(".cart-price")[index].innerHTML = "$" + totalItemPrice;
                // Update subtotal
                updateSubtotal();
            }
        });


        // Listen for user to delete an item from their cart
        removeButtons = cartMain.querySelectorAll(".remove-from-cart");
        removeButtons.forEach(function(removeButton, index) {
            removeButton.onclick = function() {
                cart.splice(index, 1);
                sessionStorage.setItem("products", JSON.stringify(cart)); 
                updateSubtotal();
            }
        });

        // Update subtotal
        function updateSubtotal() {
            productCartTotals = cartMain.querySelectorAll(".cart-price");
            console.log(productCartTotals)
            var subtotal = 0;
            productCartTotals.forEach(function(productCartTotal) {
                subtotal = subtotal + parseFloat(productCartTotal.innerHTML.replace("$", ""));
                console.log(parseFloat(productCartTotal.innerHTML.replace("$", "")));
            })
            subtotal = subtotal.toFixed(2);
            cartMain.querySelector("#subtotal").innerHTML = `Subtotal: $${subtotal}`
            console.log("Subtotal: " + subtotal)
        }
    });
}

// ----------------- //
// index.html page   //
// ----------------- //
else {
    window.addEventListener("DOMContentLoaded", async () => {
        // Get product data and main section
        const products = await loadData();
        console.log("At index.html");
        populateMain(products, indexMain);
    });
}



// ------------------ //
// FUNCTIONS          //
// ------------------ //

// Function to load JSON product data
async function loadData() {
    const response = await fetch("./products.json");
    const products = await response.json();
    return products;
}

// Function to populate index.html with all the products in "products.json"
function populateMain(products, indexMain) {
    // Create unordered list
    productList = document.createElement("ul");
    productList.classList.add("products");

    // Loop through all products, creating a list index for each
    for (var i = 0; i < products.length; i++) {
        var li = document.createElement("li");
        li.classList.add("index-item", "hover-opacity", "two-sec-ease");
        li.innerHTML = `
                    <a href="detail.html?${i}|${products[i]["name"]}">
                        <img class="product-image index-image object-fit-contain cursor">
                        <h3 class="product-title text-align-center"></h3>
                        <p class="price text-align-center"></p>
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



// Function to Populate Title Content
function populateTitle(products, container, productIndex) {
    container.querySelector(".product-title").innerHTML = products[productIndex]["name"].replace(/-/g, " ");
}

// Function to Populate Primary Image Content
function populatePrimaryImage(products, container, productIndex) {
    primaryImage = container.querySelector(".product-image");
    primaryImage.src = `${products[productIndex]["productImages"][0]["mainSrc"]}`;
    primaryImage.alt = `${products[productIndex]["productImages"][0]["mainAlt"]}`;
    return primaryImage;
}

// Function to Populate Modal Images Content
function populateModal(products, container) {
    var modalContainer = container.querySelector(".modal-images");
    numModalImages = products[productIndex]["productImages"].length;
    for (var i = 0; i < numModalImages; i++) {
        // Create modal images
        var newModalImage = document.createElement("img");
        newModalImage.classList.add("modal-image", "object-fit-contain");
        newModalImage.setAttribute('src', `${products[productIndex]["productImages"][i]["mainSrc"]}`);
        newModalImage.setAttribute('alt', `${products[productIndex]["productImages"][i]["mainAlt"]}`);
        newModalImage.style.display = "none";
        modalContainer.appendChild(newModalImage);
    }
}

// Function to Populate Thumbnail Images
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

// Function to Populate Starting Price
function populateStartingPrice(products, container, productIndex) {
    container.querySelector(".price").innerHTML = `From $${products[productIndex]["prices"][0]}`;
}

// Function to Populate Size Selector
function populateSizes(products, container, productIndex) {
    var sizeSelector = container.querySelector(".size");
    numProductSizes = products[productIndex]["sizes"].length;
    for (var i = 0; i < numProductSizes; i++) {
        var newSize = document.createElement("option");
        newSize.dataset.price = `${products[productIndex]["prices"][i]}`;
        newSize.value = `${products[productIndex]["sizes"][i]}`;
        newSize.innerHTML = `${products[productIndex]["sizes"][i]}`;
        sizeSelector.appendChild(newSize);
    }
    return sizeSelector;
}

// Function to Populate Quantity Selector
function populateQuantities(products, container, productIndex) {
    var quantitySelector = container.querySelector(".quantity");
    var maxQuantity = products[productIndex]["maxQuantity"];
    for (var i = 0; i < maxQuantity; i++) {
        var option = document.createElement('option');
        option.value = i + 1;
        option.innerHTML = i + 1;
        quantitySelector.appendChild(option);
    }
    return quantitySelector;
}

// Function to update cart quantity
function updateCartQuantity() {
    cartObjects = JSON.parse(sessionStorage.getItem("products"));
    cartQuantity = 0;
    for (var i = 0; i < cartObjects.length; i++) {
        cartQuantity = cartQuantity + parseInt(cartObjects[i]["quantity"]);
    }
    if (cartQuantity > 100) {
        document.querySelector(".cart-count").innerHTML = "100+";
    }
    else {
        document.querySelector(".cart-count").innerHTML = String(cartQuantity);
    }
}

