import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const forwardRequest = async () => {
      try {
        setLoading(true)

        // Get the current URL path and search params
        const currentPath = window.location.pathname
        const currentSearch = window.location.search

        // Build the target URL
        const targetUrl = `http://localhost:8000${currentPath}${currentSearch}`

        console.log('Forwarding to:', targetUrl)

        // Forward the request
        const res = await fetch(targetUrl)
        const data = await res.text()

        setResponse(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        setResponse(null)
      } finally {
        setLoading(false)
      }
    }

    forwardRequest()
  }, [])

  if (loading) {
    return <div>Forwarding request to localhost:8000...</div>
  }

  if (error) {
    return (
      <div>
        <h2>Error connecting to localhost:8000</h2>
        <p>{error}</p>
        <p>Make sure the server is running and CORS is enabled.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Response from localhost:8000</h2>
      <pre>{response}</pre>
    </div>
  )
}

export default App
