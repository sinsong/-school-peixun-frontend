import { AuthProvider } from "./auth-context"
import { BrowserRouter as Router } from "react-router-dom"

export const AppProviders = ({children}) => {
    return (
        <AuthProvider>
            <Router>
                {children}
            </Router>
        </AuthProvider>
    )
}
