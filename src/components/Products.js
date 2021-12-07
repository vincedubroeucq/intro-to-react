const Products = ( { products, addToCart } ) => {
    return (
        <div className="products">
            <div className="grid products-grid">
                { products && products.map( product => 
                    <div key={product.id} className="product">
                        {product.image && <img src={product.image} alt={product.name} />}
                        <h2 className="name">{product.name}</h2>
                        {product.description && <p className="description">{product.description}</p>}
                        {product.price && <p className="price bold txt-6">{product.price}€</p>}
                        <button className="add-to-cart-button" onClick={ e => addToCart( product.id ) }>
                            <span>Add to cart</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Products;