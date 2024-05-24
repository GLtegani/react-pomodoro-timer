import { HandPalm, Play } from "phosphor-react"
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import{ zodResolver } from "@hookform/resolvers/zod"
import { 
   HomeContainer, 
   StartCountdownButton, 
   StopCountdownButton, 
} from "./styles.ts" 
import { createContext, useState } from "react"
import { NewCycleForm } from "./components/NewCycleForm/index.tsx"
import { Countdown } from "./components/Countdown/index.tsx"

const newCycleFormValidationSchema = zod.object({
   task: zod.string().min(1, 'Informe a tarefa'),
   minutesAmount: zod
      .number()
      .min(1, 'O ciclo precisa ser de no mínimo 1 minuto.')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})

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
   amountSecondsPassed: number
   markCurrentCycleAsFinished: () => void
   setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CycleContextType)

export const Home = () => {
   const [cycles, setCycles] = useState<Cycle[]>([])
   const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
   
   const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

   const setSecondsPassed = (seconds: number) => {
      setAmountSecondsPassed(seconds)
   }

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

   const newCycleForm = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: '',
         minutesAmount: 0,
      }
   })

   const {handleSubmit, watch, reset} = newCycleForm

   const task = watch('task')
   const isSubmitDisabled = !task

   return (
      <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed}}>
         <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

               <FormProvider {...newCycleForm}>
                  <NewCycleForm />
               </FormProvider>
            
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