# Ecommerce Photography Print Store

## Overview
As a hobbyist photographer, I wanted to practice my frontend engineering skills by developing a simple, fully responsive ecommerce site from scratch for photography prints. My intention was to solidify my knowledge of JavaScript, HTML, and CSS before learning a frontend framework, so I decided to build the entire site solely with these technologies. The overall site is intended to act as a photography portfolio, but the main focus is the "SHOP" tab where users can shop for products.
#### See it in action <a href="https://mheyda-print-store.netlify.app/shop.html" target="_blank"><ins>here</ins></a>. :smile:

## Project Challenges
One of the biggest challenges I faced while working on this project was deciding how to store and serve product data without the help of a backend database. I opted for a local JSON file, which allowed me to easily add, remove, or update product data in a similar way to a database. 
<br>
<br>
Another aspect that was challenging for me was the design of the project. Since I built it from scratch, I spent a lot of time throughout the project adjusting my vision for how I wanted the finished project to look and function. I got a lot of inspiration looking at other photographer's portfolios and ultimately came out with a simple, but attractive user interface. 

## Areas for Improvement
<ul>
    <li>Accessibility</li>
    <li>Contact Form Submission</li>
    <li>Secure Payment Processing</li>
    <li>404 Page and Error Handling</li>
    <li>User Experience (more animations, better interactivity)</li>
</ul>

## Functionality
### Shop Page (shop.html)
The shop page is where all of the available products are displayed, including the primary image and starting price for each, by pulling data from the local JSON file. Users have the option to select a product that they want to view in more detail.

### Detail Page (detail.html)
When a product is clicked on, the user is brought to the detail page for that product. This displays the product's starting price, size options, quantity options, and a button to add to the shopping cart. Secondary product images can be viewed by clicking on one of the thumbnails or by opening the modal image gallery with a click on the primary image. 

### Shopping Cart Page (cart.html)
The shopping cart page displays all the products that the user has added to their cart, which utilizes session storage. They have the option to remove the item completely, change the item quantity, or return to the detail page for any of their items. The price total for each product and the subtotal is displayed.

### Checkout Page (checkout.html)
The checkout page displays an overview of the user's shopping cart, including the subtotal, taxes, shipping cost, and grand total. There are fields for the user to enter their email address, shipping address, and credit card information. Before submitting, the user can review and confirm all of their information. To process payments, more functionality would need to be added on the backend.

### Home/About Page (index.html)
The home page serves as a simple entry point into the site and has an "About Me" section, which is currently filled with placeholder text. 

### Contact Page (contact.html)
The contact page allows a user to send a message by filling out the HTML form. This part is not actually functional, but it could be improved with the help of a backend.
