import React from "react";
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { category } from './ActivityCache'

const GET_ACTIVITIES = gql`
    query Categories($name: String!){
    categories(name: $name) {
      id
      name
      totalActivities
      totalTime
    }
  }
`;

export default function Summary() {
  const categoryName = useReactiveVar(category);  
  const { loading, error, data } = useQuery(GET_ACTIVITIES, {
    variables: { "name": categoryName }
  });

  let overallTime = 0
  let overallActivities = 0

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="col-12">
      <div className="card black" style={{ borderTop: 'solid 1px #cddc39' }}>
        <div className="card-body">
          {data.categories.map(category => {
            overallActivities += category.totalActivities
            overallTime += category.totalTime
            return (
              <div key={category.id} className="text-left mb-3">
                <h5 className="card-title mb-2 lighter-font">{category.name}</h5>
                <p className="card-text mb-1 darker-font"><b>No. Activities:</b> {category.totalActivities}  </p>
                <p className="card-text mb-1 darker-font"><b>Total Time:</b> {category.totalTime} minutes </p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="card black" style={{ borderTop: 'solid 1px #cddc39' }}>
        <div className="card-body">
          <div className="text-left mb-3">
            <h5 className="card-title mb-2">Overall</h5>
            <p className="card-text mb-1"><b>Total Activities:</b> {overallActivities} </p>
            <p className="card-text mb-1"><b>Total Time:</b> {overallTime} minutes </p>
          </div>
        </div>
      </div>
    </div>
  )
}