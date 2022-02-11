document.addEventListener('DOMContentLoaded', () => {

    // Update the price of an item when the user selects a size
    document.querySelectorAll('select').forEach(function(select, i) {
        select.onchange = function() {
            var price = select.options[select.selectedIndex].dataset.price;
            document.querySelectorAll('.price')[i].innerHTML = price;
        }
    });



});