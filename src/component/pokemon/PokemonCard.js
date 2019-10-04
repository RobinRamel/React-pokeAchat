import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -0-user-select: none;
  user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &active {
    text-decoration: none;
  }
`;

const PokemonCard = ({name, url, price, addToCart}) => {

    const pokemonIndex = url.split("/")[url.split('/').length - 2 ];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

      return (
        <div className="mb-5 col-md-3 col-sm-6">
          <Card className="card">
          <StyledLink to={`pokemon/${pokemonIndex}`}>

              <h5 className="card-header">{pokemonIndex}</h5>
              <div className="d-flex justify-content-center">
                <Sprite
                  className="card-img-top rounded mx-auto mt-2"
                  src={imageUrl}
                >
                </Sprite>
              </div>
              <div className="card-body d-flex justify-content-center">
                <h6 className="card-title">
                {name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(' ')}
                </h6>
              </div>
              </StyledLink>
              <div className="card-footer text-center" style={{backgroundColor: '#D9EDF7'}}>
                <div className="row">
                <div className="col-md-4">

                </div>
                <div className="col-md-4">
                  <h6 className="card-title">
                    {price} €
                  </h6>
                </div>
                <div className="col-md-4">
                  <button
                      type="button"
                      className="btn btn-primary mx-auto"
                      onClick={ () => addToCart({pokemonIndex, name, url, imageUrl, price, count: 1})}
                      >+</button>
                </div>
                </div>
              </div>
           </Card>
        </div>
      )
    };

export default PokemonCard;
