const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

///py-md-10 px-md-8 p-6 h-100 
export default function ProductLmg({ img, product }) {
  return (
    <div className="productLmg-img bg-gray-30 rounded productLmgHover">
      <img src={img} alt={product.title} />
    </div>
  );
}
