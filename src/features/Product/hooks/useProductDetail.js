import { useEffect, useState } from "react"
import productApi from "../../../api/productApi"

export default function useProductDetail(productId){
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await productApi.get(productId);
                setProduct(response)
            } catch (error) {
                console.log('Failed to fetch product details: ',error);
            }
            setLoading(false)
        })()
    }, [productId])


    return { product, loading }
}