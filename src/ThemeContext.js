import { createContext } from 'react'

// The function here is just a placeholder. We just need to create a hook with a state and updater.
// This doesn't have to be a hook though. It can be an object.
const ThemeContext = createContext(['green', () => {}])

export default ThemeContext
