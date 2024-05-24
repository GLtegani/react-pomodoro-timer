import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer.ts'
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions.ts";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
   task: string
   minutesAmount: number
}

interface CycleContextType {
   cycles: Cycle[]
   activeCycle: Cycle | undefined
   activeCycleId: string | null
   amountSecondsPassed: number
   markCurrentCycleAsFinished: () => void
   setSecondsPassed: (seconds: number) => void
   createNewCycle: (data: CreateCycleData) => void
   interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
   children: ReactNode
}

export const CyclesContext = createContext({} as CycleContextType)

export const CyclesContextProvider = ({children}: CyclesContextProviderProps) => {

   const [cyclesState, dispatch] = useReducer(cyclesReducer, {
      cycles: [],
      activeCycleId: null,
   }, () => {
      const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

      if(storedStateAsJSON) {
         return JSON.parse(storedStateAsJSON)
      }
   })

   const {cycles, activeCycleId} = cyclesState
   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
   
   const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
      if(activeCycle) {
         return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
      }

      return 0
   })
   
   useEffect(() => {
      const stateJSON = JSON.stringify(cyclesState)

      localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
   }, [cyclesState])



   const setSecondsPassed = (seconds: number) => {
      setAmountSecondsPassed(seconds)
   }

   const markCurrentCycleAsFinished = () => {
      dispatch(markCurrentCycleAsFinishedAction())
   }

   const createNewCycle = (data: CreateCycleData) => {
      const newCycle: Cycle = {
         id: String(new Date().getTime()),
         task: data.task,
         minutesAmount: data.minutesAmount,
         startDate: new Date(),
      }

      dispatch(addNewCycleAction(newCycle))

      setAmountSecondsPassed(0)
   }

   const interruptCurrentCycle = () => {
      dispatch(interruptCurrentCycleAction())
   }
   
   return (
      <CyclesContext.Provider 
         value={{
            cycles,
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed, 
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle
         }}
      >
         {children}
      </CyclesContext.Provider>
      
   )
}