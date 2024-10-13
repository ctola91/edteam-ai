import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NUXT_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash'})

const prompt = "Genera una pregunta de cultura general sobre bolivia"

export default defineEventHandler(async event => {
  const result  = await model.generateContent(prompt)

  return {
    msg: result.response.text()
  }
})

// export default defineEventHandler(() => {
//   return {
//     msg: 'Hello From Server'
//   }
// })