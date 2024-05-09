const loadedScripts = []
export const loadScript = async (url: string) => {
  if (loadedScripts.includes(url)) return
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.onload = resolve
    script.onerror = reject
    script.src = url
    document.head.appendChild(script)
    loadedScripts.push(url)
  })
}