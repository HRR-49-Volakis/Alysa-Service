import React from 'react';
import {
  OuterListWrapper,
  InnerListWrapper,
  ArrowRight,
  ArrowLeft,
  ListTitle,
  ArrowListWrapper,
  InnerArrowWrapper,
  LeftArrowWrapper,
  RightArrowWrapper,
} from './productListStyles';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    };
    this.listref = React.createRef();

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.scrollright = this.scrollright.bind(this);
    this.scrollleft = this.scrollleft.bind(this);
  }

  handleMouseOver() {
    this.setState({ hovering: true });
  }

  handleMouseOut() {
    this.setState({ hovering: false });
  }

  scrollright() {
    const node = this.listref.current;
    node.scrollLeft += 740;
  }

  scrollleft() {
    const node = this.listref.current;
    node.scrollLeft -= 740;
  }

  render() {
    const {
      hovering,
    } = this.state;
    const {
      Product,
      AddBasket,
      relatedProducts,
      setMainProductId,
      listTitle,
      StarRatings,
    } = this.props;
    console.log('ProductList ', relatedProducts);
    return (
      <OuterListWrapper>
        <ListTitle>{listTitle}</ListTitle>
        <ArrowListWrapper
          onMouseOver={this.handleMouseOver}
          onFocus={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onBlur={this.handleMouseOut}
        >
          <RightArrowWrapper onClick={this.scrollright} hovering={hovering}>
            <InnerArrowWrapper>
              <svg viewBox="0 0 24 24">
                <ArrowRight />
              </svg>
            </InnerArrowWrapper>
          </RightArrowWrapper>
          <InnerListWrapper ref={this.listref}>
            {relatedProducts.map((p) => (
              <Product
                AddBasket={AddBasket}
                StarRatings={StarRatings}
                key={p.id}
                id={p.id}
                productName={p.product_name}
                imageOneUrl={p.image_one_url}
                imageTwoUrl={p.image_two_url}
                pageUrl={p.page_url}
                price={p.price}
                hearted={p.hearted}
                briefDescription={p.brief_description}
                collectionName={p.collection_name}
                setMainProductId={setMainProductId}
              />
            ))}
          </InnerListWrapper>
          <LeftArrowWrapper onClick={this.scrollleft} hovering={hovering}>
            <InnerArrowWrapper>
              <svg viewBox="0 0 24 24">
                <ArrowLeft />
              </svg>
            </InnerArrowWrapper>
          </LeftArrowWrapper>
        </ArrowListWrapper>
      </OuterListWrapper>
    );
  }
}
