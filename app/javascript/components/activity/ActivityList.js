import React from "react";
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { category, summary } from './ActivityCache'

const GET_ACTIVITIES = gql`
    query Activity($category: String!){
      activities(category: $category) {
        id
        name
        details
        totalTime
        category
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
          <div className="card black" style={{borderTop: 'solid 1px'}}>
            <div className="card-body px-0">
              <h5 className="card-title">{activity.name}</h5>
              <ul className="mb-2">
                {activity.details.map((detail, i) => (
                  <li key={`${activity.id}_${i}`} className="card-text">{detail}</li>
                ))}
              </ul>
              <p className="card-text mb-1"><b>Activity Time:</b> {activity.totalTime} minutes </p>
              <p className="card-text"><b>Category:</b> {activity.category} </p>
            </div>
          </div>
        </div>
      ))}

    </React.Fragment>
  )
}