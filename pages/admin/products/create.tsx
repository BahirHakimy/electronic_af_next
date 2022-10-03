import React from "react";
import ProductCreate from "products/ProductCreate";
import Container from "Container";

type createProps = {};

function create(props: createProps) {
  return (
    <Container>
      <ProductCreate />
    </Container>
  );
}

export default create;
