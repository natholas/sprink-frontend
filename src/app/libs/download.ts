export const download = (filename: string, content: string) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(content);
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute('href', dataStr);
  dlAnchorElem.setAttribute('download', filename);
  dlAnchorElem.click()
}