import React, { useState, useEffect } from 'react'

import { DisplayProducts } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const { address, contract, getProducts } = useStateContext();

  const fetchProducts = async () => {
    setIsLoading(true);
    const data = await getProducts();
    setProducts(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchProducts();
  }, [address, contract]);

  return (
    <DisplayProducts 
      title="All Products"
      isLoading={isLoading}
      products={products}
    />
  )
}

export default Home