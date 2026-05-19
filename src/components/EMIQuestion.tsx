'use client'

import { useState, useCallback, useMemo } from 'react'
import { getOptionLabel, getDomainDisplayName, getDomainColor } from '@/lib/utils'
import { scoreEmiItem } from '@/types'
import type { Question, QuestionItem, EmiItemAnswer, EmiScoringMode } from '@/types'

// ── Types ─────────────────────────────────────────────

interface EMIQuestionProps {
  question: Question
  isExamMode?: boolean
  onComplete: (answers: EmiItemAnswer[]) => void
}

// ── Option Legend ─────────────────────────────────────

function OptionLegend({
  options,
  optionLabels,
  selectedIndices,
  submittedItems,
  currentItem,
  onToggleOption,
  disabled,
}: {
  options: string[]
  optionLabels: string[] | null
  selectedIndices: number[]
  submittedItems: Set<string>
  currentItem: QuestionItem
  onToggleOption: (index: number) => void
  disabled: boolean
}) {
  const isSubmitted = submittedItems.has(currentItem.id)
  const correctSet = new Set(currentItem.correct_indices)
  const isMulti = currentItem.correct_indices.length > 1

  return (
    <div style={{
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: 'var(--surface-card)',
    }}>
      <div style={{
        padding: '10px 16px',
        background: 'var(--surface-input)',
        borderBottom: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--text-tertiary)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 7 12 15 20 7" />
        </svg>
        Option List
        {isMulti && (
          <span style={{ fontWeight: 400, color: 'var(--warning)', textTransform: 'none' }}>
            · Select all that apply
          </span>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {options.map((option, index) => {
          const isSelected = selectedIndices.includes(index)
          let bg = 'transparent'
          let borderColor = 'transparent'

          if (isSubmitted) {
            if (correctSet.has(index) && isSelected) {
              bg = 'rgba(34, 197, 94, 0.06)'
              borderColor = 'rgba(34, 197, 94, 0.3)'
            } else if (correctSet.has(index) && !isSelected) {
              bg = 'rgba(251, 191, 36, 0.06)'
              borderColor = 'rgba(251, 191, 36, 0.25)'
            } else if (isSelected && !correctSet.has(index)) {
              bg = 'rgba(248, 113, 113, 0.06)'
              borderColor = 'rgba(248, 113, 113, 0.25)'
            }
          } else if (isSelected) {
            bg = 'rgba(6, 182, 212, 0.08)'
            borderColor = 'rgba(6, 182, 212, 0.3)'
          }

          const label = getOptionLabel(index, optionLabels)

          return (
            <button
              key={index}
              onClick={() => onToggleOption(index)}
              disabled={disabled || isSubmitted}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                padding: '10px 14px',
                border: `1px solid ${borderColor}`,
                borderRadius: isSelected ? 'var(--radius-sm)' : 0,
                background: bg,
                cursor: (disabled || isSubmitted) ? 'default' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.12s',
                width: '100%',
              }}
              onMouseEnter={e => {
                if (!isSubmitted && !disabled) {
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.04)'
                }
              }}
              onMouseLeave={e => {
                if (!isSubmitted && !disabled) {
                  e.currentTarget.style.background = bg
                }
              }}
            >
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 22,
                height: 22,
                borderRadius: isMulti ? 4 : '50%',
                border: `2px solid ${
                  isSubmitted && correctSet.has(index)
                    ? 'var(--success)'
                    : isSubmitted && isSelected
                      ? 'var(--error)'
                      : isSelected
                        ? 'var(--accent-teal)'
                        : 'var(--border-default)'
                }`,
                background: isSubmitted && correctSet.has(index)
                  ? 'var(--success)'
                  : isSubmitted && isSelected
                    ? 'var(--error)'
                    : isSelected
                      ? 'var(--accent-teal)'
                      : 'transparent',
                color: isSubmitted && (correctSet.has(index) || isSelected)
                  ? '#fff'
                  : isSelected
                    ? '#fff'
                    : 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
                transition: 'all 0.12s',
              }}>
                {isSubmitted && correctSet.has(index) && !isSelected ? '○' : label}
              </span>
              <span style={{
                flex: 1,
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                lineHeight: 1.6,
                color: isSubmitted && !correctSet.has(index) && isSelected
                  ? 'var(--error)'
                  : isSubmitted && correctSet.has(index) && !isSelected
                    ? 'var(--warning)'
                    : 'var(--text-primary)',
              }}>
                {option.replace(/^ /, '')}
              </span>
              {isSubmitted && correctSet.has(index) && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {isSubmitted && isSelected && !correctSet.has(index) && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Item Stepper ──────────────────────────────────────

function ItemStepper({
  totalItems,
  currentIndex,
  submittedItems,
  answerStatus,
  onSelectItem,
  disabled,
}: {
  totalItems: number
  currentIndex: number
  submittedItems: Set<string>
  answerStatus: Map<string, boolean>  // item_id → correct
  onSelectItem: (index: number) => void
  disabled: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--text-tertiary)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginRight: 6,
      }}>
        Items
      </span>
      {Array.from({ length: totalItems }, (_, i) => {
        // We don't have the item IDs yet at this level; we need them from the items prop
        return null
      })}
    </div>
  )
}

// ── Feedback Card ─────────────────────────────────────

function EmiItemFeedback({
  item,
  selectedIndices,
  correct,
  marksAwarded,
  marksTotal,
}: {
  item: QuestionItem
  selectedIndices: number[]
  correct: boolean
  marksAwarded: number
  marksTotal: number
}) {
  return (
    <div className={`feedback-card ${correct ? 'correct' : 'wrong'}`} style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: correct ? 'var(--success)' : 'var(--error)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--surface-base)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {correct
              ? <polyline points="20 6 9 17 4 12" />
              : <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            }
          </svg>
        </div>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 500, color: correct ? 'var(--success)' : 'var(--error)' }}>
          {correct ? 'Correct' : 'Incorrect'}
        </span>
        <span style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-tertiary)',
          fontWeight: 600,
        }}>
          {marksAwarded}/{marksTotal} marks
        </span>
      </div>

      {!correct && selectedIndices.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div className="feedback-section-label">Your selection</div>
          <p className="feedback-text" style={{ color: 'var(--error)' }}>
            {selectedIndices.join(', ')}
          </p>
        </div>
      )}

      {item.item_rationale && (
        <div>
          <div className="feedback-section-label">Explanation</div>
          <p className="feedback-text" style={{ lineHeight: 1.8 }}>{item.item_rationale}</p>
        </div>
      )}

      {!correct && !item.item_rationale && (
        <p className="feedback-text" style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
          Review the correct answers highlighted above.
        </p>
      )}
    </div>
  )
}

// ── Main EMI Component ────────────────────────────────

export default function EMIQuestion({ question, isExamMode = false, onComplete }: EMIQuestionProps) {
  const items = question.items || []
  const totalItems = items.length

  // ── State ──
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [selectedIndices, setSelectedIndices] = useState<Record<string, number[]>>({})
  const [submittedItems, setSubmittedItems] = useState<Set<string>>(new Set())
  const [itemResults, setItemResults] = useState<Map<string, { correct: boolean; marks: number }>>(new Map())
  const [allDone, setAllDone] = useState(false)

  const currentItem = items[currentItemIndex]

  // Derived state
  const allSubmitted = items.length > 0 && items.every(item => submittedItems.has(item.id))
  const totalMarks = items.reduce((sum, it) => sum + (it.marks || 1), 0)

  // Get per-item answer status for stepper display
  const answerStatus = useMemo(() => {
    const map = new Map<string, boolean>()
    for (const item of items) {
      const result = itemResults.get(item.id)
      if (result !== undefined) map.set(item.id, result.correct)
    }
    return map
  }, [items, itemResults])

  // ── Handlers ──
  const handleToggleOption = useCallback((optionIndex: number) => {
    if (!currentItem) return
    const key = currentItem.id
    const current = selectedIndices[key] || []
    const isMulti = currentItem.correct_indices.length > 1

    let updated: number[]
    if (isMulti) {
      // Multi-select toggle
      if (current.includes(optionIndex)) {
        updated = current.filter(i => i !== optionIndex)
      } else {
        updated = [...current, optionIndex]
      }
    } else {
      // Single-select (replace)
      if (current.includes(optionIndex)) {
        updated = []
      } else {
        updated = [optionIndex]
      }
    }

    setSelectedIndices(prev => ({ ...prev, [key]: updated }))
  }, [currentItem, selectedIndices])

  const handleSubmitItem = useCallback(() => {
    if (!currentItem || submittedItems.has(currentItem.id)) return

    const selected = selectedIndices[currentItem.id] || []
    const result = scoreEmiItem(selected, currentItem.correct_indices)

    setSubmittedItems(prev => {
      const next = new Set(prev)
      next.add(currentItem.id)
      return next
    })
    setItemResults(prev => {
      const next = new Map(prev)
      next.set(currentItem.id, { correct: result.correct, marks: result.marks })
      return next
    })
  }, [currentItem, submittedItems, selectedIndices])

  const handleNextItem = useCallback(() => {
    if (currentItemIndex < totalItems - 1) {
      setCurrentItemIndex(prev => prev + 1)
    } else {
      // All items done — compile final answers and fire onComplete
      const answers: EmiItemAnswer[] = items.map(item => {
        const selected = selectedIndices[item.id] || []
        const result = itemResults.get(item.id) || scoreEmiItem(selected, item.correct_indices)
        return {
          question_item_id: item.id,
          selected_indices: selected,
          correct: result.correct,
          marks_awarded: result.marks,
          marks_total: item.marks || 1,
        }
      })
      setAllDone(true)
      onComplete(answers)
    }
  }, [currentItemIndex, totalItems, items, selectedIndices, itemResults, onComplete])

  const handlePrevItem = useCallback(() => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(prev => prev - 1)
    }
  }, [currentItemIndex])

  // ── Empty state ──
  if (totalItems === 0) {
    return (
      <div className="card" style={{ padding: 28, textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-tertiary)' }}>
          This EMI question has no items defined.
        </p>
      </div>
    )
  }

  // ── Completion state ──
  if (allDone) {
    const correctCount = items.filter(item => {
      const result = itemResults.get(item.id)
      return result?.correct
    }).length
    const earnedMarks = items.reduce((sum, item) => {
      const result = itemResults.get(item.id)
      return sum + (result?.marks || 0)
    }, 0)

    return (
      <div className="card animate-fade-in" style={{ padding: 28 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 16,
            background: earnedMarks >= totalMarks ? 'var(--success-subtle)' : 'var(--warning-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke={earnedMarks >= totalMarks ? 'var(--success)' : 'var(--warning)'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <path d="M12 2a10 10 0 1 0 10 10h-5" />
            </svg>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, marginBottom: 4 }}>
            EMI Complete
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-tertiary)' }}>
            {correctCount}/{totalItems} correct · {earnedMarks}/{totalMarks} marks
          </p>
        </div>
        {items.map((item) => {
          const result = itemResults.get(item.id)
          const isItemCorrect = result?.correct
          return (
            <div key={item.id} style={{
              padding: '10px 14px',
              marginBottom: 8,
              borderRadius: 'var(--radius-sm)',
              background: isItemCorrect ? 'rgba(34, 197, 94, 0.04)' : 'rgba(248, 113, 113, 0.04)',
              border: `1px solid ${isItemCorrect ? 'rgba(34, 197, 94, 0.15)' : 'rgba(248, 113, 113, 0.1)'}`,
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: isItemCorrect ? 'var(--success)' : 'var(--error)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 1,
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  {isItemCorrect
                    ? <polyline points="20 6 9 17 4 12" />
                    : <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  }
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.6,
                  color: 'var(--text-primary)', marginBottom: 4,
                }}>
                  {item.item_text}
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-tertiary)' }}>
                  Correct answer{item.correct_indices.length > 1 ? 's' : ''}: {
                    item.correct_indices.map(i => getOptionLabel(i, question.option_labels)).join(', ')
                  }
                  {` · ${result?.marks || 0}/${item.marks || 1} marks`}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // ── Main Render ──
  return (
    <div className="animate-fade-in">
      {/* Item Progress Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          flexShrink: 0,
        }}>
          Items
        </span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {items.map((item, idx) => {
            const isSubmitted = submittedItems.has(item.id)
            const result = itemResults.get(item.id)
            let dotBg = 'var(--border-default)'
            if (isSubmitted && result?.correct) dotBg = 'var(--success)'
            else if (isSubmitted && !result?.correct) dotBg = 'var(--error)'
            else if (idx === currentItemIndex) dotBg = 'var(--accent-teal)'

            return (
              <button
                key={item.id}
                onClick={() => !isExamMode && setCurrentItemIndex(idx)}
                disabled={isExamMode}
                title={`Item ${idx + 1}: ${item.item_text.slice(0, 60)}...`}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background: dotBg,
                  border: 'none',
                  cursor: isExamMode ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: idx === currentItemIndex ? 1 : 0.6,
                }}
              />
            )
          })}
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-tertiary)',
          fontWeight: 600,
          flexShrink: 0,
          minWidth: 48,
          textAlign: 'right',
        }}>
          {currentItemIndex + 1}/{totalItems}
        </span>
      </div>

      {/* Item Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 14,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--accent-teal)',
          background: 'rgba(6, 182, 212, 0.08)',
          padding: '3px 8px',
          borderRadius: 'var(--radius-sm)',
          flexShrink: 0,
          marginTop: 2,
        }}>
          Item {currentItemIndex + 1}
        </span>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 15,
          lineHeight: 1.7,
          color: 'var(--text-primary)',
          fontWeight: 400,
        }}>
          {currentItem?.item_text}
        </p>
      </div>

      {/* Option Grid */}
      <OptionLegend
        options={question.options}
        optionLabels={question.option_labels}
        selectedIndices={selectedIndices[currentItem?.id || ''] || []}
        submittedItems={submittedItems}
        currentItem={currentItem}
        onToggleOption={handleToggleOption}
        disabled={allSubmitted}
      />

      {/* Per-item feedback card */}
      {submittedItems.has(currentItem.id) && (
        <EmiItemFeedback
          item={currentItem}
          selectedIndices={selectedIndices[currentItem.id] || []}
          correct={itemResults.get(currentItem.id)?.correct || false}
          marksAwarded={itemResults.get(currentItem.id)?.marks || 0}
          marksTotal={currentItem.marks || 1}
        />
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 10, marginTop: 20, alignItems: 'center' }}>
        {/* Prev (only if not on first) */}
        {currentItemIndex > 0 && (
          <button
            onClick={handlePrevItem}
            className="btn btn-secondary"
            style={{ flexShrink: 0 }}
          >
            ← Previous
          </button>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Submit current item */}
        {!submittedItems.has(currentItem.id) && (
          <button
            onClick={handleSubmitItem}
            disabled={!selectedIndices[currentItem.id]?.length}
            className="btn btn-primary"
          >
            {isExamMode ? 'Confirm Answer' : 'Check Answer'}
          </button>
        )}

        {/* Next / Finish */}
        {submittedItems.has(currentItem.id) && (
          <button
            onClick={handleNextItem}
            className="btn btn-primary"
          >
            {currentItemIndex < totalItems - 1 ? 'Next Item →' : 'Finish EMI'}
          </button>
        )}
      </div>
    </div>
  )
}
