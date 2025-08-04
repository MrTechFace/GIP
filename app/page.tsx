
'use client'
import { useState } from 'react'

interface UploadedFile {
  file: File
  url: string
}

export default function Home() {
  const [step, setStep] = useState(1)
  const [frontImage, setFrontImage] = useState<UploadedFile | null>(null)
  const [backImage, setBackImage] = useState<UploadedFile | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState('')

  const handleFileUpload = (file: File, type: 'front' | 'back') => {
    const url = URL.createObjectURL(file)
    const uploadedFile = { file, url }
    
    if (type === 'front') {
      setFrontImage(uploadedFile)
    } else {
      setBackImage(uploadedFile)
    }
  }

  const handleDrop = (e: React.DragEvent, type: 'front' | 'back') => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0], type)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0], type)
    }
  }

  const templates = [
    { id: 'tshirt', name: 'Classic T-Shirt', dimensions: '3000x4000px' },
    { id: 'hoodie', name: 'Pullover Hoodie', dimensions: '3000x4000px' },
    { id: 'sweatshirt', name: 'Sweatshirt', dimensions: '3000x4000px' },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            🎽 Garment Image Processor
          </h1>
          <p className="text-gray-400 mt-1">Professional print-on-demand image processing for Spreadshirt</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <span className="text-white font-semibold">1</span>
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <span className="text-white font-semibold">2</span>
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <span className="text-white font-semibold">3</span>
            </div>
          </div>
        </div>

        {/* Step 1: Upload Reference Images */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">📤 Upload Spreadshirt Reference Images</h2>
              <p className="text-gray-400 text-lg">Upload low-resolution reference images from Spreadshirt for print positioning</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Front Print Reference */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                  🔵 Front Print Reference
                </h3>
                <div
                  className="upload-area"
                  onDrop={(e) => handleDrop(e, 'front')}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById('front-file')?.click()}
                >
                  {frontImage ? (
                    <div className="space-y-4">
                      <img src={frontImage.url} alt="Front reference" className="max-w-full max-h-48 object-contain" />
                      <p className="text-green-400">✅ {frontImage.file.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">📤</div>
                      <div>
                        <p className="text-lg font-semibold">Upload front reference</p>
                        <p className="text-gray-400">Drag & drop or click to select</p>
                      </div>
                    </div>
                  )}
                  <input
                    id="front-file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileInput(e, 'front')}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Back Print Reference */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
                  🟣 Back Print Reference
                </h3>
                <div
                  className="upload-area"
                  onDrop={(e) => handleDrop(e, 'back')}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById('back-file')?.click()}
                >
                  {backImage ? (
                    <div className="space-y-4">
                      <img src={backImage.url} alt="Back reference" className="max-w-full max-h-48 object-contain" />
                      <p className="text-green-400">✅ {backImage.file.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">📤</div>
                      <div>
                        <p className="text-lg font-semibold">Upload back reference</p>
                        <p className="text-gray-400">Drag & drop or click to select</p>
                      </div>
                    </div>
                  )}
                  <input
                    id="back-file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileInput(e, 'back')}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">📚 About Reference Images</h3>
              <div className="text-gray-300 space-y-2">
                <p>• Reference images are low-quality previews from Spreadshirt that show print positioning</p>
                <p>• Upload front reference if you have a front print</p>
                <p>• Upload back reference if you have a back print</p>
                <p>• You can upload one or both depending on your design</p>
                <p>• Template selection in next step will determine final validation</p>
              </div>
            </div>

            {/* Next Button */}
            <div className="text-center">
              <button
                onClick={() => setStep(2)}
                disabled={!frontImage && !backImage}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Next: Choose Template 👉
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Template */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">👕 Choose Your Garment Template</h2>
              <p className="text-gray-400 text-lg">Select a template that matches your garment type</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">
                      {template.id === 'tshirt' ? '👕' : template.id === 'hoodie' ? '🧥' : '👔'}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                    <p className="text-gray-400">{template.dimensions}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-600 hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                👈 Previous
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedTemplate}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Next: Process Images 👉
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Process Images */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">⚡ Processing Complete!</h2>
              <p className="text-gray-400 text-lg">Your images have been processed successfully</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {frontImage && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">🔵 Front Print Result</h3>
                  <img src={frontImage.url} alt="Processed front" className="w-full max-h-64 object-contain bg-gray-700 rounded" />
                  <p className="text-green-400 mt-2">✅ Ready for production</p>
                </div>
              )}
              
              {backImage && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">🟣 Back Print Result</h3>
                  <img src={backImage.url} alt="Processed back" className="w-full max-h-64 object-contain bg-gray-700 rounded" />
                  <p className="text-green-400 mt-2">✅ Ready for production</p>
                </div>
              )}
            </div>

            <div className="text-center space-y-4">
              <button
                className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors mr-4"
              >
                📥 Download Results
              </button>
              <button
                onClick={() => {
                  setStep(1)
                  setFrontImage(null)
                  setBackImage(null)
                  setSelectedTemplate('')
                }}
                className="bg-gray-600 hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                🔄 Process New Images
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
