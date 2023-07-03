const items = require('./fakeDb');

class Item {
	constructor (name, price) {
		this.name = name;
		this.price = price;
		items.push(this);
	}
	static findItems () {
		return items;
	}
	static updateCart (name, data) {
		let selectItem = Item.findItems(name);
		if (selectItem === undefined) {
			throw { msg: 'Not Availible', status: 404 };
		}
		selectItem.name = data.name;
		selectItem.price = data.price;
		return selectItem;
	}

	static searchItem (name) {
		const searchItem = items.find(i => i.name === name);
		if (searchItem === undefined) {
			throw { msg: 'Not Availible', status: 404 };
		}
		return selectItem;
	}

	static remove (name) {
		let foundIdx = items.findIndex((i) => i.name === name);
		if (foundIdx === -1) {
			throw { msg: 'Not Found', status: 404 };
		}
		items.splice(foundIdx, 1);
	}
}

module.exports = Item;
