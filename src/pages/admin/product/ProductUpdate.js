import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";

import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue', 'Red', 'Gold'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus', 'MSI', 'Google', 'HP', 'Dell', 'Acer'],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match }) => {
    // state
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
  
    const { user } = useSelector((state) => ({ ...state }));
    // router
    const { slug } = match.params;
  
    useEffect(() => {
      loadProduct();
      loadCategories();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const loadProduct = () => {
        getProduct(slug).then((p) => {
          // console.log("single product", p);
          // 1 load single proudct
          setValues({ ...values, ...p.data });
          // 2 load single product category subs
          getCategorySubs(p.data.category._id).then((res) => {
            setSubOptions(res.data); // on first load, show default subs
            console.log('DEFAULT SUBS', res.data);
          });
          // 3 prepare array of sub ids to show as default sub values in antd Select
          let arr = [];
          p.data.subs.map((s) => {
            arr.push(s._id);
          });
          console.log("ARR", arr);
          setArrayOfSubs((prev) => arr); // required for ant design select to work.  Required for state, prev value is replace with new value
        });
      };

    const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      //
    };
  
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      // console.log(e.target.name, " ----- ", e.target.value);
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value).then((res) => {
          console.log("SUB OPTIONS ON CATGORY CLICK", res);
          setSubOptions(res.data);
        });
      };
  
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
  
          <div className="col-md-10">
            <h4>Product update</h4>
             {JSON.stringify(values)} 
  
            <ProductUpdateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setValues={setValues}
                values={values}
                handleCatagoryChange={handleCategoryChange}
                categories={categories}
                subOptions={subOptions}
                arrayOfSubs={arrayOfSubs}
                setArrayOfSubs={setArrayOfSubs}
            />
            <hr />
          </div>
        </div>
      </div>
    );
  };

export default ProductUpdate;