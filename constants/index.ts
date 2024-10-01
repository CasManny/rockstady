export const POINT_TO_REFILL = 20


export const quests = [
    {
      title: "Earn 50 Gems",
      value: 50,
    }, 
    {
      title: "Earn 250 Gems",
      value: 250,
    },
    {
      title: "Earn 450 Gems",
      value: 450,
    },
    {
      title: "Earn 1500 Gems",
      value: 1500,
    },
    {
      title: "Earn 5000 Gems",
      value: 5000,
    },
  
]
  
export const generatebookCode = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length
  let code = ""
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    code += characters.charAt(randomIndex)
  }
  return code
}