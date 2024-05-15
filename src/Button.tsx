import { ButtonContainer, ButtonVariant } from "./Button.styles.ts"

interface ButtonProps {
   variant?: ButtonVariant
}

export const Button = ({variant = 'primary'}: ButtonProps) => {
   return (
      <>
         <ButtonContainer variant={variant}>
            Clique
         </ButtonContainer>
         
      </>
   )
}