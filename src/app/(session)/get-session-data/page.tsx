import { api_endpoint } from "@/CONSTANTS"

async function GetSessionData() {
  const sessionUser = fetch(`${api_endpoint}/api/get-session-data`, {
    cache: "no-store",
  }).then(r => r.json())

  return (
    <div>
      <pre>{JSON.stringify(sessionUser, null, 2)}</pre>
    </div>
  )
}

export default GetSessionData
