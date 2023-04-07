import { api_url } from "@/CONSTANTS"

async function GetSessionData() {
  const sessionUser = fetch(`${api_url}/api/get-session-data`, {
    cache: "no-store",
  }).then(r => r.json())

  return (
    <div>
      <pre>{JSON.stringify(sessionUser, null, 2)}</pre>
    </div>
  )
}

export default GetSessionData
