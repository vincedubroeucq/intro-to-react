import './sass/app.scss';
import React from 'react';
import Header from './components/Header';
import Cart from './components/Cart';
import Products from './components/Products';
import Footer from './components/Footer';

class App extends React.Component {
	constructor(props) {	
		super(props);
		this.state = {
			products: [
				{
					id: 1,
					name: "Beanie",
					description: "A nice beanie",
					image: "./images/beanie-2.jpg",
					price: 9
				},
				{
					id: 2,
					name: "Belt",
					description: "A beautiful belt",
					image: "./images/belt-2.jpg",
					price: 12
				},
				{
					id: 3,
					name: "Cap",
					description: "Just a cap",
					image: "./images/cap-2.jpg",
					price: 11
				},
				{
					id: 4,
					name: "Hoodie",
					description: "We love it.",
					image: "./images/hoodie-2.jpg",
					price: 19
				},
				{
					id: 5,
					name: "Logo Hoodie",
					description: "So nice !",
					image: "./images/hoodie-with-logo-2.jpg",
					price: 19
				},
				{
					id: 6,
					name: "Pocket Hoodie",
					description: "Keep your hands warm !",
					image: "./images/hoodie-with-pocket-2.jpg",
					price: 22
				},
				{
					id: 7,
					name: "Zipper Hoodie",
					description: "Convenient",
					image: "./images/hoodie-with-zipper-2.jpg",
					price: 25
				}
			],
			cart: [],
			subtotal: 0
		};
		this.addToCart  = this.addToCart.bind(this);
		this.updateQty  = this.updateQty.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	addToCart(productId) {
		this.setState(state => {
			let cart = [...state.cart];
			const index = cart.findIndex(item => item.id === productId);
			if( -1 !== index ){
				cart[index] = {...cart[index], qty: cart[index].qty + 1};
			} else {
				cart.push({id: productId, qty: 1})
			}
			return {cart};
		});
		this.updateSubtotal();
	}

	updateQty(productId, value) {
		this.setState(state => {
			let cart = [...state.cart];
			const index = cart.findIndex(item => item.id === productId);
			if( -1 !== index ) cart[index] = {...cart[index], qty: value};
			return {cart};
		});
		this.updateSubtotal();
	}

	deleteItem( productId ) {
		const reallyDelete = window.confirm( 'Delete item from cart ?' );
		if (reallyDelete) {
			this.setState(state => {
				const cart = [...state.cart].filter( item => item.id !== productId);
				return {cart};
			});
			this.updateSubtotal();
		}
	}

	updateSubtotal() {
		this.setState( state => {
			const cart = [...state.cart];
			const products = [...state.products];
			const subtotal = cart.reduce( ( acc, item ) => {
				const product = products.find( product => product.id === item.id );
				if (product) acc += item.qty * product.price;
				return acc;
			}, 0 );
			return {subtotal};
		} );
	}

  	render() {
	  	return (
			<div className="app">
				<Header title="React Shop" />
				<main>
					<h1>Browse our nice products</h1>
					<div className="wrapper grid main-grid">
						<Products products={this.state.products} addToCart={this.addToCart} />
						<Cart cart={this.state.cart} products={this.state.products} subtotal={this.state.subtotal} updateQty={this.updateQty} deleteItem={this.deleteItem} />
					</div>
				</main>
				<Footer />
			</div>
	  	);
  	}
}

export default App;
