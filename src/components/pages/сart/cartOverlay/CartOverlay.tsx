import React, { Component } from "react";
import { connect } from "react-redux";

import { changeCartOvelayStatus } from "../../../../state/actions/changeCartOvelayStatus";
import {
  increasetTotalPrice,
  reduceTotalPrice,
} from "../../../../state/actions/changePrices";
import {
  productCount,
  removeProduct,
} from "../../../../state/actions/handleProdutInCart";
import { ProductDataWithActiveAttr } from "../../../../types/types";
import ProductForCart from "../../product/components/productForCart/ProductForCart";
import {
  ButtonBlock,
  ButtonText,
  Price,
  ProductCount,
  ProductWrapper,
  StyledText,
  Title,
  TotalPriceBlock,
  Wrapper,
} from "./styles";

export class CartOverlay extends Component<any, any> {
  render(): React.ReactNode {
    const {
      cartReducer,
      currency,
      removeProduct,
      productCount,
      increasetTotalPrice,
      reduceTotalPrice,
      changeCartOvelayStatus,
    } = this.props;

    const products = localStorage.getItem("productArr")
      ? JSON.parse(localStorage.getItem("productArr")!)
      : cartReducer.data;

    const getTotalPrice = (price: number, inc: boolean, decr: boolean) => {
      inc && increasetTotalPrice(price);
      decr && reduceTotalPrice(price);
    };

    const totalPrice = localStorage.getItem("totalPrice");

    return (
      <Wrapper>
        <Title>
          My Bag, <ProductCount>{products.length} items</ProductCount>
        </Title>
        <ProductWrapper>
          {products.length !== 0 &&
            products.map((el: ProductDataWithActiveAttr, index: number) => {
              return (
                <ProductForCart
                  key={index}
                  attributes={el.attributes}
                  brand={el.brand}
                  gallery={el.gallery}
                  name={el.name}
                  prices={el.prices}
                  __typename={el.__typename}
                  currency={currency}
                  removeProduct={removeProduct}
                  getTotalPrice={getTotalPrice}
                  updatedPrices={cartReducer.updatedPrices}
                  attributeState={el.activeAttebutes}
                  className={"overlay"}
                  getProductCount={productCount}
                  productCount={el.count}
                  id={el.id}
                />
              );
            })}
        </ProductWrapper>
        <TotalPriceBlock>
          <StyledText>Total:</StyledText>
          <Price>{currency.currency + totalPrice}</Price>
        </TotalPriceBlock>
        <ButtonBlock>
          <ButtonText
            padding={"12px 35px"}
            to={"/cart"}
            border={"1px solid #1D1F22"}
            background={"#FFFFFF"}
            color={"#1d1f22"}
            onClick={() => changeCartOvelayStatus(false)}
          >
            View bag
          </ButtonText>
          <ButtonText
            padding={"13px 36px"}
            to={""}
            border={"none"}
            background={"#5ECE7B"}
            color={"#FFFFFF"}
          >
            CHECK OUT
          </ButtonText>
        </ButtonBlock>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currency: state.currency,
    cartReducer: state.cartReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    removeProduct,
    increasetTotalPrice,
    reduceTotalPrice,
    productCount,
    changeCartOvelayStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(CartOverlay);
