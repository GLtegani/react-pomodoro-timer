import { Button } from './Button.tsx'
import { DefaultTheme } from './styles/themes/default.ts'
import { ThemeProvider } from 'styled-components'

export const App = () => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Button variant='primary'/>
      <Button variant='secondary'/>
      <Button variant='success'/>
      <Button variant='danger'/>
      <Button />
    </ThemeProvider>
  )
}

