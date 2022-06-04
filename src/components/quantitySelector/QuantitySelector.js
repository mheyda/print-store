

export default function QuantitySelector( { product, handleChange } ) {

    const maxQuantity = product.maxQuantity;
    
    let quantities = [];    
    for (let i = 0; i < maxQuantity; i++) {
        quantities.push(i + 1);
    }

    return (
        <select className="quantity-selector cursor" required onChange={handleChange}>
            <option value="" disabled selected>Select Quantity</option>
            {quantities.map((quantity, index) => {
                return <option key={index} value={quantity}>{quantity}</option>;
            })}
        </select>
      );
}