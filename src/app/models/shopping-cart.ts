import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';
export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: {[productId: string]: ShoppingCartItem}) {
        for (const productId in itemsMap) {
            const item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }
    // get  productIds () {
    //     // will give all the keys in the items object as an array
    //    return Object.keys(this.items);
    // }
    get totalItemsCount() {
        let count = 0;
        for (const productId in this.itemsMap) {
          count += this.itemsMap[productId]['quantity'];
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (const productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    getQuantity(product: Product) {
        if (!this.itemsMap) {
            return 0;
        }
        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
      }
}
