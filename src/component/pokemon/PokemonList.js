import React, { Component } from 'react';
import axios from 'axios';

import PokemonCard from './PokemonCard';



export default class PokemonList extends Component {

state = {
  url: "https://pokeapi.co/api/v2/pokemon/",
  price: '',
  pokemon: null,
  shoppingCart: [],
  totalCount: 0
}

async componentDidMount() {
  const url = this.state.url;
  const res = await axios.get(url);


// add random price
  res.data['results'].map( result => {
    const pokemonIndex = result.url.split("/")[result.url.split('/').length - 2 ];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

    Object.assign(result, {price: Math.round(Math.random() * 100 )});
    Object.assign(result, {imgUrl: imageUrl});
    Object.assign(result, {count: null});

  })

  this.setState({
    pokemon: res.data['results']
  })
}

handleAddToCart(product) {
  //get the index
  const existingProductIndex = this.state.shoppingCart.findIndex(p => p.name === product.name);
  let  updatedTotalCount = 0;

  if(existingProductIndex >= 0)   {
    // a copy of pokemon array
    const cartProducts = this.state.shoppingCart.slice();
    const existingProduct = cartProducts[existingProductIndex];

    const updatedCountProduct = {
      //all the keys of the existing product
      ...existingProduct,
      //then we update it with actual count + product.count that value at 1
      count: existingProduct.count + product.count
    };


    cartProducts[existingProductIndex] = updatedCountProduct;
    updatedTotalCount += cartProducts[existingProductIndex].price;

    this.setState({
      shoppingCart: cartProducts
    })

  } else {
    updatedTotalCount = updatedTotalCount + (product.count * product.price);
    //if the product doesn't exist we simply gonna push the new product
    this.setState({
      shoppingCart: [...this.state.shoppingCart, product]
    })
  }

  this.state.shoppingCart.map( p => {
    updatedTotalCount = updatedTotalCount + (p.count * p.price);
  })

  this.setState({
    totalCount: updatedTotalCount
  })
}

// ================REMOVE======================//
removeFromCart(name, price) {
  //get the index
  const existingProductIndex = this.state.shoppingCart.findIndex(p => p.name === name);
  let  updatedTotalCount = this.state.totalCount;
  console.log('updatedTotalCount ', updatedTotalCount);

  // a copy of pokemon array
  const cartProducts = this.state.shoppingCart.slice();
  const existingProduct = cartProducts[existingProductIndex];

  console.log('existingProduct ', existingProduct);


  if(existingProduct.count > 1)   {


    const updatedCountProduct = {
      //all the keys of the existing product
      ...existingProduct,
      //then we update it with actual count + product.count that value at 1
      count: existingProduct.count - 1
    };

    console.log('updatedCountProduct ', updatedCountProduct);
    console.log('updatedTotalCount before ', updatedTotalCount);
    cartProducts[existingProductIndex] = updatedCountProduct;
    updatedTotalCount -= price;
    console.log('updatedTotalCount after ', updatedTotalCount );
    this.setState({
      shoppingCart: cartProducts
    })

  } else {
    updatedTotalCount -= price;
    //we remove it from the copy array and then we'll setstate
    cartProducts.splice(existingProductIndex, 1);

    this.setState({
      shoppingCart: cartProducts
    })
  }

  this.setState({
    totalCount: updatedTotalCount
  })
}

  render() {
    return (
      <>
        {this.state.pokemon ? (
          <div className="row" style={{paddingRight: '25%'}}>
            {this.state.pokemon.map( pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
                price={pokemon.price}
                addToCart={this.handleAddToCart.bind(this)}
              />
            ))}
            <div className="col-md-3"
                 style={{position: 'fixed', top: '4rem', right: '5px'}}>
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    <div className="row">
                      <div className="mx-auto">
                        <h5><span className="glyphicon glyphicon-shopping-cart"></span> Shopping Cart</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body" style={{overflowY: 'scroll', maxHeight: '70vh'}}>
                {/*Shopping cart row to add*/}
                  {this.state.shoppingCart.map( e =>
                    <div className="row">
                      <div className="row">
                      <div className="col-xs-2">
                        <img
                            className="card-img-top rounded mx-auto mt-2"
                            src={e.imageUrl}
                        />
                      </div>
                      <div className="col-xs-4 d-flex justify-content-center align-items-center">
                        <h4 className="product-name"><strong>{e.name}</strong></h4>
                      </div>
                      </div>
                      <div className="col-xs-6">
                        <div className="col-xs-6 text-right">
                          <button
                              onClick={() => this.removeFromCart(e.name, e.price)}
                              type="button"
                              className="btn btn-primary mx-auto">-</button>
                          <h6><strong>{e.price} €</strong></h6>
                        </div>
                        <div className="col-xs-4">
                          <input readOnly type="text" className="form-control input-sm" value={e.count} />
                        </div>
                        <div className="col-xs-2">
                          <button type="button" className="btn btn-link btn-xs">
                            <span className="glyphicon glyphicon-trash"> </span>
                          </button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <div className="row text-center">
                    <div className="col-xs-9">
                      <h4 className="text-right">Total <strong> {this.state.totalCount} €</strong></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)
          : (
            <h1>Loading Pokemon</h1>
        )}
      </>
    )
  }
}
