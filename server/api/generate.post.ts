import { GoogleGenerativeAI } from '@google/generative-ai'
import { category, format, PROMPT, topic } from '../utils/constants'

const genAI = new GoogleGenerativeAI(process.env.NUXT_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash'})

let prompt = `${PROMPT} ${topic} de ${category} ${format}`

export default defineEventHandler(async event => {
  const body = await readBody(event)
  prompt = `${PROMPT} ${body.topic} de ${body.category} ${format}`
  const result  = await model.generateContent(prompt)

  return {
    data: result.response.text()
  }
})

// export default defineEventHandler(() => {
//   return {
//     msg: 'Hello From Server'
//   }
// })