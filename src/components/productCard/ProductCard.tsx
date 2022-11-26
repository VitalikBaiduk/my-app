import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 355px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  box-sizing: border-box;
  transition: 0.1s linear;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    transform: scale(1.1);
  }
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 330px;
  object-fit: cover;
`;

const ProductName = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  color: #1d1f22;
`;

const ProductPrice = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  text-align: right;
  color: #1d1f22;
`;

interface ProductCardProps {
  imageUrl: string;
  name: string;
  price: string;
}

class ProductCard extends Component<ProductCardProps, {}> {
  render(): React.ReactNode {
    const { imageUrl, name, price } = this.props;

    return (
      <Wrapper>
        <StyledImage src={imageUrl} />
        <ProductName>{name}</ProductName>
        <ProductPrice>{price}</ProductPrice>
      </Wrapper>
    );
  }
}

export default ProductCard;
