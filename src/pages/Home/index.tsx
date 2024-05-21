import { Play } from "phosphor-react"
import { useForm } from 'react-hook-form'

import { 
   HomeContainer, 
   CountdownContainer, 
   FormContainer, 
   Separator, 
   StartCountdownButton, 
   TaskInput,
   MinutesAmountInput, 
} from "./styles.ts" 

export const Home = () => {
   const {register, handleSubmit} = useForm()

   const handleCreateNewCycle = (data) => {

   }

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
                  {...register('minutesAmount')}
               />

               <span>minutos.</span>
            </FormContainer>
           
            <CountdownContainer>
               <span>0</span>
               <span>0</span>
               <Separator>:</Separator>
               <span>0</span>
               <span>0</span>
            </CountdownContainer>

            <StartCountdownButton type="submit">
               <Play size={24} />
               Começar
            </StartCountdownButton>
         </form>
      </HomeContainer>
   )
}