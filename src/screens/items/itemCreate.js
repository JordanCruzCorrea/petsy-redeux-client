import React, { useState, useEffect } from "react";
import { ItemForm } from "../../components/form";
import { DATA_ACTIONS } from "../../util/constants";
import { useFetchData } from "../../util/hooks";

let Filter = require("bad-words");
let filter = new Filter();

export function ItemCreate() {
	const data = useFetchData();
	const {
		name,
		category,
		description,
		price,
		image1,
		image2,
		image3,
	} = data.state;

	const formData = {
		name,
		category,
		description,
		price,
		image1,
		image2,
		image3,
	};
	const [isProfane, setIsProfane] = useState(false);

	useEffect(() => {
		const doTheThing = () => {
			data.dispatch({ type: DATA_ACTIONS.RESET });
		};

		return () => {
			doTheThing();
		};
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;

		const valueParse = () => {
			switch (name) {
				case "price":
					return Math.trunc(Math.floor(value));
				case "category":
					if (value === "Choose a category...") {
						return "";
					}
				default:
					return value;
			}
		};

		if (filter.isProfane(value)) {
			setIsProfane(true);
		} else {
			setIsProfane(false);
			data.dispatch({
				type: DATA_ACTIONS.INPUT,
				fieldName: name,
				payload: { value: valueParse() },
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isProfane) {
			return alert("Watch your profamity!");
		} else {
			return (
				data.addNewItem(formData), data.dispatch({ type: DATA_ACTIONS.RESET })
			);
		}
	};

	return (
		<>
			<ItemForm
				type="Add"
				isProfane={isProfane}
				formData={formData}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</>
	);
}
