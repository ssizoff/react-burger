import { IIngredient } from '../utils/burger-api';

export type TCartItem = {
    key: string;
    id: string;
    extra_id: number;
    is_bun: boolean;
};

export default class CartUtil {
    static itemKey(item: TCartItem): string {
        return `${item.id}#${item.extra_id}`;
    }

    constructor(private _items: TCartItem[]) {}

    getIds(): string[] {
        return this._items.map(i => i.id);
    }

    has(id: string): boolean {
        return this._items.some(i => i.id === id);
    }

    byId(id: string): TCartItem[] {
        return this._items.filter(i => i.id === id);
    }

    byKey(key: string): TCartItem | undefined {
        return this._items.find(i => CartUtil.itemKey(i) === key);
    }

    count(id: string): number {
        return this.byId(id).length;
    }

    nextExtraId(id: string): number {
        const items = this.byId(id);
        return items.length ? Math.max(...items.map(i => i.extra_id)) + 1 : 1;
    }

    toArray(): TCartItem[] {
        return this._items.map(i => ({ ...i, key: CartUtil.itemKey(i) }));
    }

    addItem(id: string, is_bun: boolean, toKey?: string) {
        const items = is_bun ? this._items.filter(i => !i.is_bun) : this._items;
        const extra_id = this.nextExtraId(id);
        const newItem = { id, key: id, is_bun, extra_id };

        if (toKey !== undefined) {
            const toIdx = this._items.indexOf(this.byKey(toKey)!);
            this._items.splice(toIdx, 0, newItem);
        } else {
            this._items = [...items, newItem];
            if (is_bun)
                this._items.push({
                    id,
                    key: id,
                    is_bun,
                    extra_id: this.nextExtraId(id),
                });
        }
    }

    removeByKey(key: string) {
        this._items = this._items.filter(i => CartUtil.itemKey(i) !== key);
    }

    reoderByKey(fromKey: string, toKey: string) {
        const fromItem = this.byKey(fromKey)!;

        this.removeByKey(fromKey);

        const toIdx = this._items.indexOf(this.byKey(toKey)!);

        this._items.splice(toIdx, 0, fromItem);
    }

    getBun(ingredients: IIngredient[]): IIngredient | undefined {
        const bun = this._items.find(i => i.is_bun);
        return bun && ingredients.find(i => i._id === bun.id);
    }

    getCart(
        ingredients: IIngredient[]
    ): Array<TCartItem & { item: IIngredient }> {
        const map = new Map(ingredients.map(i => [i._id, i]));

        return this.toArray()
            .filter(i => !i.is_bun && map.has(i.id))
            .map(i => ({ ...i, item: map.get(i.id)! }));
    }

    getTotalPrice(ingredients: IIngredient[]): number {
        const bunPrice = this.getBun(ingredients)?.price ?? 0;
        const cartPrice = this.getCart(ingredients)
            .map(({ item }) => item.price)
            .reduce((total, price) => total + price, 0);

        return 2 * bunPrice + cartPrice;
    }
}
