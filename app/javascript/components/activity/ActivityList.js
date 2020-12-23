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
        category
        startTime
        finishTime
      }
    }
  `;

export default function ActivityList() {
  const categoryName = useReactiveVar(category);  
  const { loading, error, data } = useQuery(GET_ACTIVITIES, {
    variables: {"category": categoryName}
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <React.Fragment>
      
      {data.activities.map(activity => (
        <div key={activity.id} className="text-left col-12">
          <div className="card black" style={{ borderTop: 'solid 1px #cddc39'}}>
            <div className="card-body darker-font">
              <h5 className="card-title lighter-font">{activity.name}</h5>
              <ul className="mb-2">
                {activity.details.map((detail, i) => (
                  <li key={`${activity.id}_${i}`} className="card-text darker-font">{detail}</li>
                ))}
              </ul>
              <p className="card-text mb-1 darker-font"><b>Start:</b> {activity.startTime} </p>
              <p className="card-text mb-1 darker-font"><b>Finish:</b> {activity.finishTime} </p>
              <p className="card-text mb-1 darker-font"><b>Activity Time:</b> {activity.totalTime} minutes </p>
              <p className="card-text darker-font"><b>Category:</b> {activity.category} </p>
            </div>
          </div>
        </div>
      ))}

    </React.Fragment>
  )
}