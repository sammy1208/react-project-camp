export default function ProductLmg({ img, product }) {
  return (
    <div className="productLmg-img bg-gray-30 rounded">
      <img src={img} alt={product.title} />
    </div>
  );
}