import React from 'react';
import {
  ProductWrapper,
  ProductImage,
  ProductTitle,
  ProductDescription,
  ProductPrice,
  HeartWrapper,
  HeartIcon,
  ImageOne,
  ImageTwo,
  HeartIconOutLine,
  PriceRatingsBasketWrapper,
} from './productStyles';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      liked: false,
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleHeartClick = this.handleHeartClick.bind(this);
  }

  handleMouseOver() {
    this.setState({ hovering: true });
  }

  handleMouseOut() {
    this.setState({ hovering: false });
  }

  handleChangeId(id) {
    const { setMainProductId } = this.props;
    setMainProductId(id);
  }

  handleHeartClick() {
    const { liked } = this.state;
    this.setState({ liked: !liked });
  }

  render() {
    const {
      id,
      productName,
      price,
      briefDescription,
      imageTwoUrl,
      imageOneUrl,
      AddBasket,
      StarRatings,
    } = this.props;
    const {
      hovering,
      liked,
    } = this.state;
    // console.log('PRODUCT mapping ', id);
    return (
      <ProductWrapper
        onMouseOver={this.handleMouseOver}
        onFocus={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onBlur={this.handleMouseOut}
      >
        <HeartWrapper onClick={this.handleHeartClick}>
          <svg focusable="false" width="100%" viewBox="0 0 24 24">
            <HeartIconOutLine hovering={hovering} liked={liked} />
            <HeartIcon hovering={hovering} liked={liked} />
          </svg>
        </HeartWrapper>
        <div className="setIdWrapper" onClick={this.handleChangeId.bind(this, id)} aria-hidden>
          <ProductImage>
            <ImageOne hovering={hovering} src={imageOneUrl} alt="ikea product" />
            <ImageTwo hovering={hovering} src={imageTwoUrl} alt="ikea product" />
          </ProductImage>
          <ProductTitle hovering={hovering}>{productName}</ProductTitle>
          <ProductDescription>{briefDescription}</ProductDescription>
        </div>
        <PriceRatingsBasketWrapper>
          <div>
            <ProductPrice>{`${price}`}</ProductPrice>
            <StarRatings id={id} />
          </div>
          <div>
            <AddBasket hovering={hovering} />
          </div>
        </PriceRatingsBasketWrapper>
      </ProductWrapper>
    );
  }
}
