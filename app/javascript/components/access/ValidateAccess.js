import React, {useContext} from 'react';
import { ActivityContext } from '../context/ActivityContext'
import Access from './Access'
import Activities from '../activity/Activities'

export default function ValidateAccess() {
  const { state, dispatch } = useContext(ActivityContext)
  
  const validateAccess = () => {
    if (state.access) {
      return <Activities />
    } else {
      return <Access />
    }
  }
  
  return(
    <div className="text-center">
      {validateAccess()}
    </div>
  )
}