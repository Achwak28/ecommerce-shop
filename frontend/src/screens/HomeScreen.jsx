import React from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../componenets/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Message from "../componenets/Message";
import Loader from "../componenets/Loader";

const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{isError?.data?.message || isError?.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;

/*
before using redux toolkit

import axios from "axios";
import { useEffect, useState } from "react";


const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);
*/
