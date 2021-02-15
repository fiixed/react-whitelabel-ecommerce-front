import React, { useEffect, useState } from 'react'
import { getProductsByCount } from '../functions/product'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(3)
          .then((res) => {
            setProducts(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      };

    return (
        <div>
            <p>Home</p>
            {JSON.stringify(products)}
        </div>
    )
}

export default Home
