const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

export default function ProductLmg ({img, product }) {
    return (
    <div className="bg-gray-30 rounded py-md-10 px-md-8 p-6 h-100 productLmgHover">
        <img src={img} className="" alt={product.title} />
    </div>
    )
}

