import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  retrieveProducts() {
    axios.get("http://localhost:8000/products").then((res) => {
      if (res.data.success) {
        this.setState({
          products: res.data.existingProducts,
        });
        console.log(this.state.products);
      }
    });
  }

  filterData(products, searchKey) {
    const result = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchKey) ||
        product.description.toLowerCase().includes(searchKey) ||
        product.productCategory.toLowerCase().includes(searchKey)
    );
    this.setState({ products: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/products").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingProducts, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2- mb-2">
            <h4>All products</h4>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Product Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((products, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a
                    href={`/product/${products._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      alt="products.productUrl"
                      className="photo"
                      src={products.productUrl}
                      width={300}
                      height={200}
                    />
                  </a>
                </td>
                <td>{products.productName}</td>
                <td>{products.productCategory}</td>
                <td>{products.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
