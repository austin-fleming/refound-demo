import { useRouter } from "next/router"
import { type ReactNode, useEffect, useState } from "react"
import { useAuth } from "./use-auth"

const publicPaths = ['/post','/login','/u','/sign-up','/discover','/about','/contact']
const defaultRedirect = '/sign-up'

export const SignUpGuard = ({children}:{children: ReactNode}) => {
    const router = useRouter()
    const {isLoggedIn} = useAuth()
    const [authorized, setAuthorized] = useState(false)

    const authCheck = (url:string) => {
        console.log('IsLoggedIn: ', isLoggedIn)
        console.log('AuthCheck: ',url)
        if (isLoggedIn) {
            setAuthorized(true)
            return
        }

        const matchingPath = publicPaths.find(path => url.startsWith(path))

        if (matchingPath) {
            setAuthorized(true)
            return
        }

        setAuthorized(false)
        router.push(defaultRedirect)
    }

    useEffect(() => {
        authCheck(router.asPath)
        
        const hideContent = () => setAuthorized(false)

        router.events.on('routeChangeStart', hideContent)
        router.events.on('routeChangeComplete', authCheck)

        return () => {
            router.events.off('routeChangeStart', hideContent)
            router.events.off('routeChangeComplete', authCheck)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (authorized ? <>{children}</> : null )
}