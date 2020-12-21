import React from "react";
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { category } from './ActivityCache'

const GET_ACTIVITIES = gql`
    query Activity($category: String!){
      activities(category: $category) {
        id
        name
        details
        totalTime
      }
    }
  `;

export default function Summary() {
  const categoryName = useReactiveVar(category);  
  const { loading, error, data } = useQuery(GET_ACTIVITIES, {
    variables: { "category": categoryName }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="col-12">
      <div className="card black" style={{ borderTop: 'solid 1px' }}>
        <div className="card-body px-0">
          {data.activities.map(activity => (
            <div key={activity.id} className="text-left mb-3">
              <h5 className="card-title mb-2">category.name</h5>
              <p className="card-text mb-1"><b>No. Activities:</b> activity.number </p>
              <p className="card-text mb-1"><b>Total Time:</b> category.totalTime minutes </p>
            </div>
          ))}
        </div>
      </div>
      <div className="card black" style={{ borderTop: 'solid 1px' }}>
        <div className="card-body px-0">
          <div className="text-left mb-3">
            <h5 className="card-title mb-2">Overall</h5>
            <p className="card-text mb-1"><b>Total Activities:</b> activity.number </p>
            <p className="card-text mb-1"><b>Total Time:</b> category.totalTime minutes </p>
          </div>
        </div>
      </div>
    </div>
  )
}