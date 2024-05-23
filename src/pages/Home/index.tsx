import { HandPalm, Play } from "phosphor-react"
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import{ zodResolver } from "@hookform/resolvers/zod"
import { differenceInSeconds } from 'date-fns'

import { 
   HomeContainer, 
   StartCountdownButton, 
   StopCountdownButton, 
} from "./styles.ts" 
import { createContext, useEffect, useState } from "react"
import { NewCycleForm } from "./components/NewCycleForm/index.tsx"
import { Countdown } from "./components/Countdown/index.tsx"

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
   id: string
   task: string
   minutesAmount: number
   startDate: Date
   interruptedDate?: Date
   finishedDate?: Date
}

interface CycleContextType {
   activeCycle: Cycle | undefined
   activeCycleId: string | null
   markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

export const Home = () => {
   const [cycles, setCycles] = useState<Cycle[]>([])
   const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
   
   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

   const markCurrentCycleAsFinished = () => {
      setCycles(state => state.map(cycle => {
         if(cycle.id === activeCycleId) {
            return {...cycle, finishedDate: new Date()}
         } else {
            return cycle
         }
      }))
   }

   const handleCreateNewCycle = (data: NewCycleFormData) => {
      const newCycle: Cycle = {
         id: String(new Date().getTime()),
         task: data.task,
         minutesAmount: data.minutesAmount,
         startDate: new Date(),
      }

      setCycles((state) => [...state, newCycle])
      setActiveCycleId(newCycle.id)
      setAmountSecondsPassed(0)
      reset()
   }

   const handleInterruptCycle = () => {
      setCycles(state => state.map(cycle => {
         if(cycle.id === activeCycleId) {
            return {...cycle, interruptedDate: new Date()}
         } else {
            return cycle
         }
      }))

      setActiveCycleId(null)
   }

   const task = watch('task')
   const isSubmitDisabled = !task

   return (
      <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
         <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
               <NewCycleForm />
            
               <Countdown />

               {activeCycle ? (
                  <StopCountdownButton onClick={handleInterruptCycle} type="button">
                     <HandPalm size={24} />
                     Interromper
                  </StopCountdownButton>
               ) : (
                  <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                     <Play size={24} />
                  Começar
                  </StartCountdownButton>
               )}
            </form>
         </HomeContainer>
      </CyclesContext.Provider>
   )
}