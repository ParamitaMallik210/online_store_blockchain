import React, { useState, useEffect } from 'react'

import { DisplayProductsBuy } from '../components';
import { useStateContext } from '../context'

const BoughtProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const { address, contract, getBuyerProducts } = useStateContext();

  const fetchProducts = async () => {
    setIsLoading(true);
    const data = await getBuyerProducts();
    setProducts(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchProducts();
  }, [address, contract]);

  return (
    <DisplayProductsBuy 
      title="Bought Products"
      isLoading={isLoading}
      products={products}
    />
  )
}

export default BoughtProduct