import { gql } from "@apollo/client/core";
import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import styled from "styled-components";
import ProductCard from "../../productCard/ProductCard";
import { ProductCardWrapper, Title, Wrapper } from "../../../styles/global";
import { getAllItem } from "../../../api/getAll";

interface AllProps {
  category?: any;
}

class All extends Component<any, {}> {
  render(): React.ReactNode {
    const { products } = this.props.data.category;

    return (
      <Wrapper>
        <Title>All</Title>
        <ProductCardWrapper>
          {products.map((el: any) => {
            return (
              <ProductCard
                imageUrl={el.gallery[0] ? el.gallery[0] : ""}
                name={el.name}
                price={el.prices[0].currency.symbol + el.prices[0].amount}
              />
            );
          })}
        </ProductCardWrapper>
      </Wrapper>
    );
  }
}

export default graphql(getAllItem)(All);
