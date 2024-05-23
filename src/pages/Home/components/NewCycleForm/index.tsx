import { useForm } from "react-hook-form"
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles.ts"
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

const newCycleFormValidationSchema = zod.object({
   task: zod.string().min(1, 'Informe a tarefa'),
   minutesAmount: zod
      .number()
      .min(1, 'O ciclo precisa ser de no mínimo 1 minuto.')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})

export const NewCycleForm = () => {
   const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: '',
         minutesAmount: 0,
      }
   })

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

