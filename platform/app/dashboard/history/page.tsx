"use client"

import { useState } from "react"
import { Filter, Download } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { HistoryCard } from "@/components/ui/history-card"

const predictions: {
  id: string
  date: string
  diagnosis: string
  content: string
  codes: { code: string; label: string; confidence: number }[]
  userFeedback?: string
}[] = []

export default function HistoryPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterFeedback, setFilterFeedback] = useState<"all" | "helpful" | "partial" | "incorrect">("all")

  const filteredPredictions = filterFeedback === "all" 
    ? predictions 
    : predictions.filter(p => p.userFeedback === filterFeedback || (filterFeedback === "helpful" && !p.userFeedback))

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Prediction History</h1>
          <p className="text-foreground-muted mt-1">Review your past analyses and predictions</p>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/[0.06] text-foreground-muted w-fit">
          {predictions.length} predictions
        </span>
      </div>

      {/* Filter and actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-foreground-muted" />
          <div className="flex gap-2">
            {["all", "helpful", "partial", "incorrect"].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterFeedback(filter as any)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  filterFeedback === filter
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-white/[0.06] text-foreground hover:bg-white/[0.1] border border-white/[0.08]"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button className="ml-auto hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-white/[0.06] border border-white/[0.08] text-foreground hover:bg-white/[0.1] transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* History cards */}
      <div className="space-y-3">
        {filteredPredictions.map((prediction, index) => (
          <div key={prediction.id} className={`animate-fade-in stagger-${index + 1}`}>
            <HistoryCard
              {...prediction}
              onExpand={handleExpand}
              isExpanded={expandedId === prediction.id}
            />
          </div>
        ))}
      </div>

      {filteredPredictions.length === 0 && (
        <GlassCard className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.06] flex items-center justify-center">
            <Filter className="w-8 h-8 text-foreground-subtle" />
          </div>
          <h2 className="text-lg font-medium text-foreground mt-6">
            {predictions.length === 0 ? "No predictions yet" : "No predictions found"}
          </h2>
          <p className="text-foreground-muted text-sm mt-1 text-center max-w-sm">
            {predictions.length === 0
              ? "Head to the Workspace to analyze your first clinical note."
              : "Try adjusting your filters to see more results."}
          </p>
        </GlassCard>
      )}
    </div>
  )
}
