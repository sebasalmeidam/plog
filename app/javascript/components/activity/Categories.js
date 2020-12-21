import React from "react";
import { gql, useQuery, useReactiveVar } from '@apollo/client';
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
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const categoryName = useReactiveVar(category);  

  const asignCategory = (name) => {
    category(name)
  }
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="col-12 pl-1">
      <Slider {...settings}>
        {data.categories.map(categoryItem => (
          <div key={categoryItem.id} className="white-text text-center">
            <button onClick={() => asignCategory(categoryItem.name)} className={`btn btn-sm btn-rounded btn-yellow ${categoryName == categoryItem.name ? 'active' : ''}`}>{categoryItem.name}</button>
          </div>
        ))}
        <div className="white-text text-center">
          <button onClick={() => asignCategory("")} className={`btn btn-sm btn-rounded btn-yellow ${categoryName == '' ? 'active' : ''}`}>All</button>
        </div>
      </Slider>
    </div>
  )
}