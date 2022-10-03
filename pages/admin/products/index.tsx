import React from "react";

import {
  ProductCreate,
  ProductDetail,
  ProductList,
} from "../../../components/products";
import { generateRandomProducts } from "../../../lib/utilities";
import Container from "Container";

export async function getStaticProps() {
  const products = generateRandomProducts();
  return { props: { products } };
}
// export async function getStaticPaths() {}

function Products(props: any) {
  return (
    <Container>
      <ProductList products={props.products} />
      {/* <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="create" element={<ProductCreate />} />
        <Route path="detail/:id" element={<ProductDetail />} />
        <Route path="*" element={<div>NotFound</div>} />
      </Routes> */}
    </Container>
  );
}

export default Products;
