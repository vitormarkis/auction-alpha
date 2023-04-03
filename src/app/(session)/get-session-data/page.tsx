async function GetSessionData() {
  const sessionUser = fetch("http://localhost:3000/api/get-session-data", {
    cache: "no-store",
  }).then(r => r.json())

  return (
    <div>
      <pre>{JSON.stringify(sessionUser, null, 2)}</pre>
    </div>
  )
}

export default GetSessionData
