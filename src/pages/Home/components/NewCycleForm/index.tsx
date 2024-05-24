import { useFormContext } from "react-hook-form"
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles.ts"
import { useContext } from "react"
import { CyclesContext } from "../../../../contexts/CyclesContext.tsx"



export const NewCycleForm = () => {
   const {activeCycle}= useContext(CyclesContext)
   const {register} = useFormContext()

   return (
      <FormContainer>
         <label htmlFor="task">Vou trabalhar em</label>
         <TaskInput 
            id="task" 
            list="task-suggestions" 
            placeholder="Nome do projeto"
            disabled={!!activeCycle}
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
            max={60}
            min={0}
            disabled={!!activeCycle}
            {...register('minutesAmount', {valueAsNumber: true})}
         />

         <span>minutos.</span>
      </FormContainer>
   )
}

