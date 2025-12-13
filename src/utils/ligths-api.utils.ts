export async function toggleLights():Promise<void>{
    const url = getURL()
    await fetch(url, {method: 'PUT'})
}
 
function getURL():string{
  return 'https://home-api.ralb.dev/lamps/living-room/toggle'
}
