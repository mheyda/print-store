

export default function SizeSelector( { product, handleChange } ) {

    const sizes = product.sizes;
    const prices = product.prices;

    return (
        <select className="size-selector cursor" required onChange={handleChange}>
            <option value="" disabled selected>Select Size</option>
            {sizes.map((size, index) => {
                return <option key={index} data-price={prices[index]} value={size}>{size}</option>
            })}
        </select>
      );

}