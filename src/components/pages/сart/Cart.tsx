import React, { Component } from "react";
import { connect } from "react-redux";
import {
  makeOrder,
  productCount,
  removeProduct,
} from "../../../state/actions/handleProdutInCart";
import {
  increasetTotalPrice,
  reduceTotalPrice,
} from "../../../state/actions/changePrices";
import ProductForCart from "../product/components/productForCart/ProductForCart";
import { ProductDataWithActiveAttr } from "../../../types/types";
import { Title } from "../../../styles/global";
import {
  BlockForEmptyBin,
  EmptyText,
  OrderButton,
  ProductWrapper,
  StyledIcon,
  SuccessOrderBlock,
  SuccessOrderModal,
  SuccessOrderText,
  ToShoppingLink,
  TotalBlockKey,
  TotalBlockValue,
  TotalKey,
  TotalPriceBlock,
  TotalValue,
  Wrapper,
} from "./styles";
import { setTotalPrice } from "../../../state/actions/setTotalPrice";

class Cart extends Component<any, {}> {
  state = {
    order: false,
  };

  render(): React.ReactNode {
    const {
      cartReducer,
      currency,
      increasetTotalPrice,
      reduceTotalPrice,
      removeProduct,
      productCount,
      makeOrder,
    } = this.props;

    const products = localStorage.getItem("productArr")
      ? JSON.parse(localStorage.getItem("productArr")!)
      : cartReducer.data;
    const stateCurrency = currency.currency;

    let quantity = 0;
    products.map((el: any) =>
      el.count ? (quantity += el.count) : (quantity += 1)
    );

    const getTotalPrice = (price: number, inc: boolean, decr: boolean) => {
      inc && increasetTotalPrice(price);
      decr && reduceTotalPrice(price);
    };

    const totalPrice = localStorage.getItem("totalPrice");
    const tax = localStorage.getItem("tax");

    return (
      <Wrapper>
        <Title>Cart</Title>
        {products && products.length ? (
          products.map((el: ProductDataWithActiveAttr, index: number) => {
            return (
              <ProductWrapper key={index}>
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
                  getProductCount={productCount}
                  productCount={el.count}
                  id={el.id}
                />
              </ProductWrapper>
            );
          })
        ) : (
          <BlockForEmptyBin>
            <EmptyText>The cart is empty</EmptyText>
            <ToShoppingLink to={"/all"}>
              <EmptyText className={"inButton"}>
                Go ahead to shopping!
              </EmptyText>
            </ToShoppingLink>
          </BlockForEmptyBin>
        )}
        {products && products.length !== 0 && (
          <TotalPriceBlock>
            <TotalBlockKey>
              Tax 21%:
              <TotalBlockValue>{" " + stateCurrency + tax}</TotalBlockValue>
            </TotalBlockKey>
            <TotalBlockKey>
              Quantity: <TotalBlockValue>{quantity}</TotalBlockValue>
            </TotalBlockKey>
            <TotalKey>
              Total: <TotalValue>{stateCurrency + totalPrice}</TotalValue>
            </TotalKey>
            <OrderButton
              onClick={() => {
                this.setState({ order: true });
                makeOrder();
                localStorage.setItem("productArr", JSON.stringify([]));
              }}
            >
              ORDER
            </OrderButton>
          </TotalPriceBlock>
        )}
        {this.state.order && (
          <SuccessOrderBlock onClick={() => this.setState({ order: false })}>
            <SuccessOrderModal>
              <StyledIcon />
              <SuccessOrderText>The order was completed</SuccessOrderText>
            </SuccessOrderModal>
          </SuccessOrderBlock>
        )}
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

const mapDuspatchToProps = () => {
  return {
    removeProduct,
    increasetTotalPrice,
    reduceTotalPrice,
    productCount,
    makeOrder,
    setTotalPrice,
  };
};

export default connect(mapStateToProps, mapDuspatchToProps())(Cart);
