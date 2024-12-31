import { useState } from "react"
import Head from "next/head"
import { PromptInput } from "@/components/PromptInput"
import { ResponseCard } from "@/components/ResponseCard"
import { getGPT4Response, getClaudeResponse, getGeminiResponse } from "@/services/aiService"
import { historyService } from "@/services/historyService"
import { AIResponse } from "@/types/ai"
import { MODEL_INFO } from "@/config/models"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [responses, setResponses] = useState<AIResponse[]>([
    { model: MODEL_INFO.GPT4.humanReadableName, response: "" },
    { model: MODEL_INFO.CLAUDE.humanReadableName, response: "" },
    { model: MODEL_INFO.GEMINI.humanReadableName, response: "" }
  ])

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true)
    try {
      const [gpt4Response, claudeResponse, geminiResponse] = await Promise.all([
        getGPT4Response(prompt),
        getClaudeResponse(prompt),
        getGeminiResponse(prompt)
      ])
      
      const newResponses = [gpt4Response, claudeResponse, geminiResponse]
      setResponses(newResponses)
      
      historyService.addToHistory({
        prompt,
        timestamp: Date.now(),
        responses: newResponses
      })
    } catch (error) {
      console.error("Error fetching responses:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Dreamer MoA (Experimental) - AI Model Comparison</title>
        <meta name="description" content="Compare responses from multiple AI models with Dreamer MoA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Dreamer MoA</h1>
            <p className="text-xl font-semibold text-muted-foreground">(Experimental)</p>
            <p className="text-muted-foreground">
              Compare responses from multiple AI models
            </p>
          </div>

          <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />

          <div className="grid gap-6 md:grid-cols-3">
            {responses.map((response) => (
              <ResponseCard
                key={response.model}
                response={response}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}