import React, { useState, useCallback, useEffect, useRef } from 'react'
import { ChartNote } from '../types'
import { Trash2, Edit, X, TrendingUp, TrendingDown, Minus, RotateCcw } from 'lucide-react'

const ChartNotes: React.FC = () => {
  const [notes, setNotes] = useState<ChartNote[]>([])
  const [currentNote, setCurrentNote] = useState<ChartNote>({
    id: '',
    timeframe: '',
    note: '',
    sentiment: 'neutral',
    isStrongSentiment: false,
    support: '',
    resistance: '',
    image: '',
  })

  const pasteAreaRef = useRef<HTMLDivElement>(null)

  const timeframeOptions = ['Wk', 'D', '4h', '1h', '30m', '15m', '5m']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentNote(prev => ({ ...prev, [name]: value }))
  }

  const handleTimeframeChange = (timeframe: string) => {
    setCurrentNote(prev => ({ ...prev, timeframe }))
  }

  const handleSentimentChange = (sentiment: 'bullish' | 'bearish' | 'neutral') => {
    setCurrentNote(prev => ({ ...prev, sentiment }))
  }

  const handleStrongSentimentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNote(prev => ({ ...prev, isStrongSentiment: e.target.checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentNote.id) {
      setNotes(prev => prev.map(note => note.id === currentNote.id ? currentNote : note))
    } else {
      setNotes(prev => [...prev, { ...currentNote, id: Date.now().toString() }])
    }
    resetNote()
  }

  const handleEdit = (id: string) => {
    const noteToEdit = notes.find(note => note.id === id)
    if (noteToEdit) {
      setCurrentNote(noteToEdit)
    }
  }

  const handleDelete = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile()
          if (blob) {
            const reader = new FileReader()
            reader.onload = (event) => {
              setCurrentNote(prev => ({ ...prev, image: event.target?.result as string }))
            }
            reader.readAsDataURL(blob)
          }
        }
      }
    }
  }, [])

  useEffect(() => {
    const pasteArea = pasteAreaRef.current
    if (pasteArea) {
      pasteArea.addEventListener('paste', handlePaste)
    }
    return () => {
      if (pasteArea) {
        pasteArea.removeEventListener('paste', handlePaste)
      }
    }
  }, [handlePaste])

  const removeImage = () => {
    setCurrentNote(prev => ({ ...prev, image: '' }))
  }

  const resetNote = () => {
    setCurrentNote({
      id: '',
      timeframe: '',
      note: '',
      sentiment: 'neutral',
      isStrongSentiment: false,
      support: '',
      resistance: '',
      image: '',
    })
  }

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Chart Notes</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          {timeframeOptions.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => handleTimeframeChange(option)}
              className={`px-3 py-1 rounded ${
                currentNote.timeframe === option ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div>
          <label htmlFor="note" className="block mb-1">Note</label>
          <textarea
            id="note"
            name="note"
            value={currentNote.note}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows={3}
            ref={pasteAreaRef}
          ></textarea>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleSentimentChange('bullish')}
              className={`p-2 rounded ${currentNote.sentiment === 'bullish' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              <TrendingUp size={20} />
            </button>
            <button
              type="button"
              onClick={() => handleSentimentChange('bearish')}
              className={`p-2 rounded ${currentNote.sentiment === 'bearish' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            >
              <TrendingDown size={20} />
            </button>
            <button
              type="button"
              onClick={() => handleSentimentChange('neutral')}
              className={`p-2 rounded ${currentNote.sentiment === 'neutral' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
            >
              <Minus size={20} />
            </button>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={currentNote.isStrongSentiment}
                onChange={handleStrongSentimentChange}
                className="mr-2"
              />
              Strong
            </label>
          </div>
          <div className="flex-1">
            <input
              type="text"
              id="resistance"
              name="resistance"
              value={currentNote.resistance}
              onChange={handleInputChange}
              placeholder="Resistance"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              id="support"
              name="support"
              value={currentNote.support}
              onChange={handleInputChange}
              placeholder="Support"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          {currentNote.image && (
            <div className="relative inline-block mt-2">
              <img src={currentNote.image} alt="Pasted" className="max-w-full h-auto max-h-40" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {currentNote.id ? 'Update Note' : 'Add Note'}
          </button>
          <button
            type="button"
            onClick={resetNote}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            <RotateCcw size={16} className="inline mr-1" />
            Reset
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Saved Notes</h3>
        {notes.length === 0 ? (
          <p>No notes saved yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left w-16">Time</th>
                  <th className="p-2 text-left">Note</th>
                  <th className="p-2 text-left w-20">Sup</th>
                  <th className="p-2 text-left w-20">Res</th>
                  <th className="p-2 text-left w-20">Image</th>
                  <th className="w-16"></th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => (
                  <tr key={note.id} className={`border-b ${getRowStyle(note.sentiment, note.isStrongSentiment)}`}>
                    <td className="p-2 whitespace-nowrap">{note.timeframe}</td>
                    <td className="p-2">{note.note}</td>
                    <td className="p-2 whitespace-nowrap">{note.support}</td>
                    <td className="p-2 whitespace-nowrap">{note.resistance}</td>
                    <td className="p-2">
                      {note.image && (
                        <img src={note.image} alt="Chart" className="w-10 h-10 object-cover" />
                      )}
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col items-center space-y-2">
                        <button
                          onClick={() => handleEdit(note.id)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

const getRowStyle = (sentiment: string, isStrong: boolean) => {
  let baseColor = 'bg-gray-100'
  if (sentiment === 'bullish') {
    baseColor = isStrong ? 'bg-green-300' : 'bg-green-200'
  } else if (sentiment === 'bearish') {
    baseColor = isStrong ? 'bg-red-300' : 'bg-red-200'
  }
  return `${baseColor} ${isStrong ? 'font-bold' : ''}`
}

export default ChartNotes