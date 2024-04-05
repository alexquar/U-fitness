import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

export function WorkoutsContextProvider({children}){
  
    return (
        <WorkoutsContext.Provider>
        {children}
      </WorkoutsContext.Provider>
    )
}
