

export default function ProductLmg ({img, product }) {
    return (
    <div className="bg-gray-30 rounded py-md-10 px-md-8 p-6 h-100">
        <img src={img} className="" alt={product.title} />
    </div>
    )
}

