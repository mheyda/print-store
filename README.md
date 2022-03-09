# Ecommerce Photography Print Store

## Overview
As a hobbyist photographer, I wanted to practice my frontend coding skills by developing a simple ecommerce site for photography prints from scratch. My intention was to solidify my knowledge of vanilla JavaScript, HTML, and CSS before learning a frontend framework, so I decided to build the entire site solely with these technologies. Future functionality could be added to process payments using an API.
### See it in action <a href="https://mheyda-print-store.netlify.app/" target="_blank"><ins>here</ins></a>*. :smile:
<br>

## File Structure
### HTML Files
The HTML files serve as templates that are filled with information from the JSON file using logic from JavaScript. This allows the templates to be responsive to the products available and the products the user has selected.

### JSON File
The JSON file acts similar to a database with all available product information. Since only frontend technologies were used, this was a practical alternative to a database and allows the product information to be easily adjusted when required.

### JavaScript File
This is where all of the logic for the application is stored. It is organized first according to the HTML template that is being displayed, followed by a collection of reusable functions. 

### CSS File
This holds all of the styling for the website and includes media queries for full responsiveness across any device screen size.

### Image Folder
This folder holds all of the product images and contains sub-folders for each primary image.


## Functionality
### Home Page
The home page displays every available product by pulling data from a local JSON file. For each product, the primary image and starting price is displayed for the user to see.

### Detail Page
When a product is clicked on, the user is brought to the detail page for that product. This displays the product's starting price, size options, quantity options, and a button to add to the shopping cart. Secondary product images can be viewed by clicking on one of the thumbnails or by opening the modal image gallery with a click on the primary image. 

### Shopping Cart Page
The shopping cart page displays all the products that the user has added to their cart. They have the option to remove the item completely, change the item quantity, or return to the detail page for any of their items. The price total for each product and the subtotal is displayed.

### Checkout Page
The checkout page displays an overview of the user's shopping cart, including the subtotal, taxes, shipping cost, and grand total. There are fields for the user to enter their email address, shipping address, and credit card information. Before submitting, the user can review and confirm all of their information.
