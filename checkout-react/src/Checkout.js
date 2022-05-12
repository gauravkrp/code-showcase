import styles from "./Checkout.module.css";
import { LoadingIcon } from "./Icons";
import { getProducts } from "./dataService";
import React, { useCallback, useState, useEffect } from "react";

const to2DecimalPlaces = (number) => Number(number.toFixed(2));

const Product = ({
  id,
  name,
  availableCount,
  price,
  orderedQuantity,
  total,
  onIncreaseQty,
  onDecreaseQty,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price}</td>
      <td>{orderedQuantity}</td>
      <td>${total}</td>
      <td>
        <button
          onClick={onIncreaseQty}
          disabled={orderedQuantity === availableCount}
          className={styles.actionButton}
        >
          +
        </button>
        <button
          onClick={onDecreaseQty}
          disabled={orderedQuantity === 0}
          className={styles.actionButton}
        >
          -
        </button>
      </td>
    </tr>
  );
};

const Checkout = () => {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState({
    amount: 0,
    discount: 0,
  });

  const fetchProducts = async () => {
    const products = await getProducts();
    const productsWithQty = products.map((p) => ({
      ...p,
      orderedQuantity: 0,
      total: 0,
    }));
    setProducts(productsWithQty);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onChangeQty = (pId, operation) => {
    const products_ = [...products];
    const product = products_.find((p) => p.id === pId);
    if (operation === "add") {
      if (product.orderedQuantity < product.availableCount) {
        product.orderedQuantity = product.orderedQuantity + 1;
      }
    }
    if (operation === "sub") {
      if (product.availableCount > 0) {
        product.orderedQuantity = product.orderedQuantity - 1;
      }
    }
    const totalAmount = product.price * product.orderedQuantity;
    product.total = to2DecimalPlaces(totalAmount);
    setProducts(products_);
  };

  const calculateTotal = useCallback(() => {
    let amount = 0;
    let discount = 0;
    products.forEach((p) => {
      amount += p.total;
    });
    if (amount > 1000) {
      discount = to2DecimalPlaces(amount * 0.1);
      amount = to2DecimalPlaces(amount * 0.9);
    }
    setTotal({
      amount,
      discount
    });
  }, [products]);

  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <div>
      <header className={styles.header}>
        <h1>My Shopping Cart</h1>
      </header>
      <main>
        {isLoading && <LoadingIcon />}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((p) => (
                <Product
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  availableCount={p.availableCount}
                  price={p.price}
                  orderedQuantity={p.orderedQuantity}
                  total={p.total}
                  onIncreaseQty={() => onChangeQty(p.id, "add")}
                  onDecreaseQty={() => onChangeQty(p.id, "sub")}
                />
              ))}
          </tbody>
        </table>
        <h2>Order summary</h2>
        {total.discount > 0 && <p>Discount: {total.discount}$ </p>}
        <p>Total: {total.amount}$ </p>
      </main>
    </div>
  );
};

export default Checkout;
