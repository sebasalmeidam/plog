import React, {useContext} from "react";
import { ActivityContext } from '../context/ActivityContext';

export default function Access() {
  const { state, dispatch } = useContext(ActivityContext);
  
  const validateCode = (e) => {
    if (e.target.value.length > 6) {
      let code = e.target.value
      const url = `/sa/validate-access?code=${code}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.status == 200 || data.status == 204) {
            dispatch({ type: "grantAccess" });
          }
        })
    }
  }

  const cancelContinue = (e) => {
    e.preventDefault()
    dispatch({type: "cancelContinue"})
  }

  const getAcess = () => {
    dispatch({ type: "continueTrue" })
  }

  const shouldContinue = () => {
    if (state.continue) {
      return (
        <div className="row">
          <div className="col-12 col-md-6 offset-3">
            <input onChange={validateCode} type="password" className='form-control mb-3' placeholder='Insert Code' autoFocus />
            <a href="#" onClick={cancelContinue}>Cancel</a>
            <div className="small darker-font"><em>Just in case you didn't see the code: torre.co</em></div>
          </div>
        </div>
      )
    } else {
      return <button onClick={getAcess} className="btn btn-rounded" style={{ background: '#cddc39', color: 'black' }}>Continue</button>
    }
  }

  return(
    <div>
      {shouldContinue()}
    </div>
  )
}