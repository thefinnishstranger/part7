import { useState } from "react"

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

export const useCountry = ({ name }) => {
    const [country, setCountry] = useState('')

    useEffect(() => {
        const fetchedCountry = async () => {
            try {
                const response = await fetch(`${baseUrl}/${name}`)
                const data = await response.json()
                setCountry(data[0])
            } catch (error) {
                console.error(error)
            }
        }

        if (name) {
            fetchedCountry()
        }
    }, [name])
    return country
}