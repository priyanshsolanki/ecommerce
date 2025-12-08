export default function CartItem({ item }) {
    return (
      <div className="p-4 border rounded flex justify-between">
        <div>
          <h3 className="font-bold">{item.name}</h3>
          <p>Qty: {item.qty}</p>
          <p className="text-green-600">${item.unitPrice}</p>
        </div>
        <p className="font-bold">${item.subtotal}</p>
      </div>
    );
  }
  