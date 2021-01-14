/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import GlobalStyle, { AppWrapper } from './globalStyles';
import ProductList from './components/ProductList/ProductList.jsx';
import Product from './components/Product/Product.jsx';
import AddBasket from './components/AddBasket/AddBasket.jsx';
import StarRatings from './components/StarRatings/StarRatings.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { mainProductId } = props;
    this.state = {
      mainProductId,
      relatedDescriptions: [],
      relatedCollection: [],
    };
    this.setMainProductId = this.setMainProductId.bind(this);
  }

  componentDidMount() {
    const { mainProductId } = this.state;
    this.getRelatedProducts(mainProductId);
  }

  setMainProductId(id) {
    console.log('got id= ', id);
    this.getRelatedProducts(id);
  }

  getRelatedProducts(id) {
    let tempCollection;
    let tempDescription;
    axios.get(`/api/product_scroller/products/collection/id=${id}`)
      .then((res) => {
        tempCollection = res.data;
        return axios.get(`/api/product_scroller/products/similar/id=${id}`);
      })
      .then((res) => {
        tempDescription = res.data;
      })
      .then(() => {
        this.setState({
          mainProductId: id,
          relatedCollection: tempCollection,
          relatedDescriptions: tempDescription,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
    const { mainProductId, relatedDescriptions, relatedCollection } = this.state;
    console.log('relatedDescriptions ', relatedDescriptions);
    console.log('relatedCollection ', relatedCollection);
    return (

      <AppWrapper>
        <GlobalStyle />
        <ProductList
          Product={Product}
          AddBasket={AddBasket}
          StarRatings={StarRatings}
          listTitle="Similar products"
          mainProductId={mainProductId}
          relatedProducts={relatedDescriptions}
          setMainProductId={this.setMainProductId}
          style
        />
        <ProductList
          Product={Product}
          AddBasket={AddBasket}
          StarRatings={StarRatings}
          listTitle={`More in the ${relatedCollection[0] ? relatedCollection[0].collection_name : ''} collection`}
          mainProductId={mainProductId}
          relatedProducts={relatedCollection}
          setMainProductId={this.setMainProductId}
        />
      </AppWrapper>
    );
  }
}

export default App;
