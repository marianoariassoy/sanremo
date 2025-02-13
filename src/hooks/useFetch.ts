import { useState, useEffect } from 'react'
const apiUrl = 'http://localhost/sites/sanremo-backend'
// const apiUrl = process.env.REACT_APP_API_URL

function useFetch(url: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const urlOk = apiUrl + url
        const response = await fetch(urlOk)
        const json = await response.json()
        setData(json)
      } catch (error: string | any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, loading, setLoading, error }
}

export default useFetch
