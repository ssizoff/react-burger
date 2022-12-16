
export default class cartUtil {

    static itemKey(item) {
        return `${item.id}#${item.extra_id}`;
    }

    #items;

    get Items() {
        return this.#items;
    }

    constructor(items) {
        this.#items = items;
    }

    getIds() {
        return this.#items.map(i => i.id);
    }

    has(id) {
        return this.#items.some(i => i.id === id);
    }

    byId(id) {
        return this.#items.filter(i => i.id === id);
    }

    byKey(key) {
        return this.#items.find(i => cartUtil.itemKey(i) === key);
    }

    count(id) {
        return this.byId(id).length;
    }

    nextExtraId(id) {
        const items = this.byId(id);
        return items.length ? Math.max(...items.map(i => i.extra_id)) + 1 : 1;
    }

    toArray() {
        return this.#items.map(i => ({ key: cartUtil.itemKey(i), ...i }));
    }

    addItem(id, is_bun, toKey) {
        const items = is_bun ? this.#items.filter(i => !i.is_bun) : this.#items;
        const extra_id = this.nextExtraId(id);
        const newItem = { id, is_bun, extra_id };

        if (toKey !== undefined) {
            const toIdx = this.#items.indexOf(this.byKey(toKey));
            this.#items.splice(toIdx, 0, newItem);
        }
        else this.#items = [...items, newItem];
    }

    removeByKey(key) {
        this.#items = this.#items.filter(i => cartUtil.itemKey(i) !== key);
    }

    reoderByKey(fromKey, toKey) {
        const fromItem = this.byKey(fromKey);

        this.removeByKey(fromKey);

        const toIdx = this.#items.indexOf(this.byKey(toKey));

        this.#items.splice(toIdx, 0, fromItem);
    }

    getBun(ingredients) {
        const bun = this.#items.find(i => i.is_bun);

        if (bun)
            return ingredients.find(i => i._id === bun.id);
    }

    getCart(ingredients) {
        const map = new Map(ingredients.map(i => [i._id, i]));

        return this.toArray()
            .filter(i => !i.is_bun && map.has(i.id))
            .map(i => ({ ...i, item: map.get(i.id) }));
    }

    getTotalPrice(ingredients) {
        const bunPrice = this.getBun(ingredients)?.price ?? 0;
        const cartPrice = this.getCart(ingredients)
            .map(({ item }) => item.price)
            .reduce((total, price) => total + price, 0);

        return 2 * bunPrice + cartPrice;
    }
}