import React, { useContext } from "react";
import {StateProvider} from './context/ActivityContext'
import ValidateAccess from './access/ValidateAccess'

export default function ActivityContainer() {
  
  return (
    <StateProvider>
      <ValidateAccess />
    </StateProvider>
  );
}
