import React from "react";
import { gql, useQuery } from '@apollo/client';
import {category} from './ActivityCache'
//designs
import Slider from 'react-slick'

const GET_CATEGORIES = gql`
  {
    categories {
      id
      name
    }
  }
`;

const settings = {
  infinite: false,
  className: "slider center variable-width",
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  arrows: false,
  centerPadding: '0px',
}

export default function Categories() {
  const { loading, error, data, client } = useQuery(GET_CATEGORIES);

  const asignCategory = (name) => {
    category(name)
  }
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="col-12">
      <Slider {...settings}>
        {data.categories.map(category => (
          <div key={category.id} className="white-text text-center">
            <button onClick={() => asignCategory(category.name)} className="btn btn-sm btn-blue btn-rounded btn-yellow">{category.name}</button>
          </div>
        ))}
      </Slider>
    </div>
  )
}