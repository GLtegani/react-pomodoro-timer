import { HeaderContainer } from "./styles.ts"

export const Header = () => {
   return (
      <HeaderContainer> 
         <span>logo</span>
         <nav>
            <a href="#">
               timer
            </a>

            <a href="#">
               history
            </a>
         </nav>
      </HeaderContainer>
   )
}