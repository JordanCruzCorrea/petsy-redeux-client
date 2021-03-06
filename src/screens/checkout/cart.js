import React from "react";
import { CartItem, CartTotal } from "../../components/cart";
import { View } from "../../components/view";
import { useCart } from "../../util/hooks";

export function Cart() {
	const cartContext = useCart();
	const { state, calculateNumItemsInCart } = cartContext;

	const renderCart = () => {
		if (state.cart.length === 0) {
			return <h1>Your cart is empty.</h1>;
		} else {
			return state.cart.map((item, index) => (
				<CartItem key={index} item={item} index={index} />
			));
		}
	};

	return (
		<View title="Shopping Cart" class="container">
			<div className="flex flex-col md:my-16 lg:justify-between lg:flex-row">
				<section className="flex flex-col w-full p-4 rounded shadow-lg lg:w-7/12">
					<h2 className="my-4 text-xl font-bold">
						{state.cart.length && calculateNumItemsInCart()} Item(s)
					</h2>
					<span className="divide-y-2">{state.cart && renderCart()}</span>
				</section>

				<section className="flex-col w-full px-4 py-6 my-6 rounded shadow-lg lg:my-0 lg:w-1/3">
					<CartTotal />
				</section>
			</div>
		</View>
	);
}
