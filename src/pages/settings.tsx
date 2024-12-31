import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Head from "next/head"

export default function SettingsPage() {
  return (
    <>
      <Head>
        <title>Settings - Dreamer MoA</title>
        <meta name="description" content="Configure your AI model comparison settings" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Configure your AI model comparison preferences</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Manage your API keys and model settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Settings configuration coming soon. This will allow you to customize model parameters,
                  manage API keys, and set your preferences for the AI comparison tool.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}