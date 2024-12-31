import OpenAI from "openai"
import Anthropic from "@anthropic-ai/sdk"
import { GoogleGenerativeAI } from "@google/generative-ai"
import getConfig from "next/config"
import { AIResponse, AIError, AIModelType } from "@/types/ai"
import { MODEL_INFO, API_TIMEOUT, MAX_TOKENS, TEMPERATURE } from "@/config/models"

const { publicRuntimeConfig } = getConfig() || { publicRuntimeConfig: {} }

async function withTimeout<T>(promise: Promise<T>): Promise<T> {
  const timeoutPromise = new Promise<T>((_, reject) => 
    setTimeout(() => reject(new Error("Request timeout")), API_TIMEOUT)
  )
  return Promise.race([promise, timeoutPromise])
}

function handleError(error: unknown, model: string): AIResponse {
  console.error(`${model} Error:`, error)
  const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
  return {
    model,
    response: "",
    error: `Error: ${errorMessage}`
  }
}

export async function getGPT4Response(prompt: string): Promise<AIResponse> {
  try {
    const apiKey = publicRuntimeConfig.OPENAI_API_KEY
    if (!apiKey) throw new Error("OpenAI API key not found")

    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
    const completion = await withTimeout(openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: MODEL_INFO.GPT4.modelId,
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
    }))

    return {
      model: MODEL_INFO.GPT4.humanReadableName,
      response: completion.choices[0]?.message?.content || "No response generated",
    }
  } catch (error) {
    return handleError(error, MODEL_INFO.GPT4.humanReadableName)
  }
}

export async function getClaudeResponse(prompt: string): Promise<AIResponse> {
  try {
    const apiKey = publicRuntimeConfig.ANTHROPIC_API_KEY
    if (!apiKey) throw new Error("Anthropic API key not found")

    const anthropic = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
    const message = await withTimeout(anthropic.messages.create({
      model: MODEL_INFO.CLAUDE.modelId,
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
      messages: [{ role: "user", content: prompt }],
    }))

    const responseText = message.content
      .filter(block => block.type === "text")
      .map(block => (block as { text: string }).text)
      .join("")

    return {
      model: MODEL_INFO.CLAUDE.humanReadableName,
      response: responseText || "No response generated",
    }
  } catch (error) {
    return handleError(error, MODEL_INFO.CLAUDE.humanReadableName)
  }
}

export async function getGeminiResponse(prompt: string): Promise<AIResponse> {
  try {
    const apiKey = publicRuntimeConfig.GOOGLE_API_KEY
    if (!apiKey) throw new Error("Google API key not found")

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ 
      model: MODEL_INFO.GEMINI.modelId,
      generationConfig: {
        temperature: TEMPERATURE,
        maxOutputTokens: MAX_TOKENS,
      },
    })

    const result = await withTimeout(model.generateContent(prompt))
    const response = await result.response
    const text = response.text()

    return {
      model: MODEL_INFO.GEMINI.humanReadableName,
      response: text || "No response generated",
    }
  } catch (error) {
    return handleError(error, MODEL_INFO.GEMINI.humanReadableName)
  }
}