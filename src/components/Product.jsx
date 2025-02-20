import { useNavigate } from "react-router-dom";

export default function Product ({product}) {

    const Navigate = useNavigate();

    const handleProduct = () => {
        Navigate(`/products/${product.id}`)
    }

    return (
    <div
    onClick={() => handleProduct()}
    className="card mb-3 border-0 h-100"
    style={{cursor: "pointer"}}
    >
        <div className="mb-md-6 mb-2 bg-gray-30 rounded-3 card-padding h-100">
            <img src={product.imageUrl} className="" alt={product.title}/>
        </div>
        <div className="card-body p-0">
        <h5 className="card-title fs-md-8 fs-10 fw-normal text-gray-100 m-0 mb-md-2">{product.title}</h5>
        <p className="card-text fs-md-10 fs-11 text-gray-70 mb-md-4 mb-2">{product.description}</p>
        <p className="card-text fs-md-8 fs-9 fw-bold text-gray-100"><small className="text-muted">{`$${product.price}`}</small></p>
        </div>
    </div>
    )
}
