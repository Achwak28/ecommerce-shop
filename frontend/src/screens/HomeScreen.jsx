import React from "react";
import { Col, Row } from "react-bootstrap";
import {useParams} from "react-router-dom";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate"

const HomeScreen = () => {

  const { pageNumber } = useParams()
  const { data, isLoading, isError } = useGetProductsQuery({pageNumber});

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
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
          pages={data.pages}
          page={data.page}/>
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
