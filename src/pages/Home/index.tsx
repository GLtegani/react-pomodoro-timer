import { Play } from "phosphor-react"
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import{ zodResolver } from "@hookform/resolvers/zod"

import { 
   HomeContainer, 
   CountdownContainer, 
   FormContainer, 
   Separator,  
   StartCountdownButton, 
   TaskInput,
   MinutesAmountInput, 
} from "./styles.ts" 
import { useState } from "react"

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
}

export const Home = () => {
   const [cycles, setCycles] = useState<Cycle[]>([])
   const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

   const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: '',
         minutesAmount: 0,
      }
   })

   const handleCreateNewCycle = (data: NewCycleFormData) => {
      const newCycle: Cycle = {
         id: String(new Date().getTime()),
         task: data.task,
         minutesAmount: data.minutesAmount
      }

      setCycles((state) => [...state, newCycle])
      setActiveCycleId(newCycle.id)
      reset()
   }

   const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
   console.log(activeCycle)

   const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
   const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
   const minutesAmount = Math.floor(currentSeconds / 60)
   const secondsAmount = currentSeconds % 60

   const minutes = String(minutesAmount).padStart(2, '0')
   const seconds = String(secondsAmount).padStart(2, '0')

   const task = watch('task')
   const isSubmitDisabled = !task

   return (
      <HomeContainer>
         <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
            <FormContainer>
               <label htmlFor="task">Vou trabalhar em</label>
               <TaskInput 
                  id="task" 
                  list="task-suggestions" 
                  placeholder="Nome do projeto"
                  {...register('task')}
               />
               
               <datalist id="task-suggestions">
                  <option value="Projeto"></option>
                  <option value="Projeto"></option>
                  <option value="Projeto"></option>
                  <option value="Projeto"></option>

               </datalist>

               <label htmlFor="minutesAmount">durante</label>
               <MinutesAmountInput 
                  id="minutesAmount" 
                  type="number" 
                  placeholder="00"
                  step={5}
                  max={60}
                  min={0}
                  {...register('minutesAmount', {valueAsNumber: true})}
               />

               <span>minutos.</span>
            </FormContainer>
           
            <CountdownContainer>
               <span>{minutes[0]}</span>
               <span>{minutes[0]}</span>
               <Separator>:</Separator>
               <span>{seconds[0]}</span>
               <span>{seconds[0]}</span>
            </CountdownContainer>

            <StartCountdownButton disabled={isSubmitDisabled} type="submit">
               <Play size={24} />
               Começar
            </StartCountdownButton>
         </form>
      </HomeContainer>
   )
}