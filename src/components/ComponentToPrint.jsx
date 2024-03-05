import React, { useEffect } from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount } = props;

  const timestamp = Date.now();
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Adding 1 since getMonth() returns zero-based index
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDay = (day < 10 ? "0" : "") + day;
  const formattedMonth = (month < 10 ? "0" : "") + month;

  const formattedHours = (hours < 10 ? "0" : "") + hours;
  const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
  const formattedSeconds = (seconds < 10 ? "0" : "") + seconds;

  const formattedDateTime = `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return (
    <div ref={ref}>
      <div className="mb-3">
        <h3 className="text-center text-xs">Jomaa's Pizza</h3>
        <p className="text-center text-[8px]">{formattedDateTime}</p>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-b-black text-[8px]">
            <td>ID</td>
            <td>Name</td>
            <td>Price</td>
            <td>Qty</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {cart
            ? cart.map((cartProduct, key) => (
                <tr key={key} className="text-[8px]">
                  <td>{cartProduct.id}</td>
                  <td>{cartProduct.name}</td>
                  <td>{cartProduct.price}</td>
                  <td>{cartProduct.quantity}</td>
                  <td>{cartProduct.totalAmount}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
      <h4 className="mt-3 text-[8px]">Total Amount: ${totalAmount}</h4>
    </div>
  );
});
