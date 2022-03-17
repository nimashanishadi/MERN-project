import React, { Component } from "react";
import axios from "axios";

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: {},
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8000/product/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          products: res.data.product,
        });
        console.log(this.state.products);
      }
    });
  }

  render() {
    const { productUrl, productName, productCategory, description, price } =
      this.state.products;

    return (
      <div>
        <h4>{productName}</h4>
        <hr />
        <div>
          <img
            alt="products.productUrl"
            className="photo"
            src={productUrl}
            width={300}
            height={200}
          />
        </div>
        <dl className="row">
          <dt className="col-sm-3">Category</dt>
          <dd className="col-sm-9">{productCategory}</dd>

          <dt className="col-sm-3">Description</dt>
          <dd className="col-sm-9">{description}</dd>

          <dt className="col-sm-3">Price</dt>
          <dd className="col-sm-9">{price}</dd>
        </dl>
      </div>
    );
  }
}
