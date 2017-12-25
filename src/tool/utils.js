export const urlReg = (name) =>{
  const protocols = '((https?|s?ftp|irc[6s]?|git|afp|telnet|smb):\\/\\/)?'
  const userInfo = '([a-z0-9]\\w*(\\:[\\S]+)?\\@)?'
  const domain = '([a-z0-9]([\\w]*[a-z0-9])*\\.)?[a-z0-9]\\w*\\.[a-z]{2,}(\\.[a-z]{2,})?'
  const port = '(:\\d{1,5})?'
  const ip = '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}'
  const address = '(\\/\\S*)?'
  const domainType = [protocols, userInfo, domain, port, address, name, address]
  const ipType = [protocols, userInfo, ip, port, address, name, address]
  return new RegExp('^' + domainType.join('') + '$', 'i') || new RegExp('^' + ipType.join('') + '$', 'i')
}

