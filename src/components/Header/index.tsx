import { HeaderContainer } from "./styles.ts"
import { Timer, Scroll } from "phosphor-react"
import logoIgnite from '../../assets/ignite-logo.svg'
import { NavLink } from "react-router-dom"

export const Header = () => {
   return (
      <HeaderContainer> 
         <img src={logoIgnite} alt="Dois triângulos verdes da logo do Ignite." />
         <nav>
            <NavLink to="/" title="Timer">
               <Timer size={24} />
            </NavLink>

            <NavLink to="/history" title="Histórico">
               <Scroll size={24} />
            </NavLink>
         </nav>
      </HeaderContainer>
   )
}