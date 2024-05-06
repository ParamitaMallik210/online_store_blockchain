import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { DisplayProducts } from '../components';
import { useStateContext } from '../context';

const UserDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [product2, setProduct2] = useState([]);

    const location = useLocation();
    const { address, contract, getUserProducts, getAdminProductsSell, getAdminProductsBuy } = useStateContext();

    const fetchProducts = async () => {
        setIsLoading(true);
        const data = await getAdminProductsSell(location.state.address); 
        setProducts(data);
        setIsLoading(false);
    };

    const fetchProducts2 = async () => {
        setIsLoading(true);
        const data = await getAdminProductsBuy(location.state.address); // Use address from location state
        setProduct2(data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (contract && address) {
            fetchProducts();
            fetchProducts2();
        } // Check if contract and address are available
    }, [address, contract]);

    return (
        <>
            <DisplayProducts
                title="Products Sold By The User"
                isLoading={isLoading}
                products={products}
            />
            <DisplayProducts
                title="Products Bought By The User"
                isLoading={isLoading}
                products={product2}
            />
        </>

    );
};

export default UserDetails;
