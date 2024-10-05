import { useState } from 'react'
import './App.css'

function App() {
  const [selectedVariable, setSelectedVariable] = useState('Topic')
  const [variableInput, setVariableInput] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedTone, setSelectedTone] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [generatedPost, setGeneratedPost] = useState('')

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [templates] = useState([
    { id: 1, text: "Just learned about {topic}. It's fascinating how {key_point}. What are your thoughts on this?" },
    { id: 2, text: "Excited to share my latest blog post on {topic}. Check it out and let me know what you think!" },
    // Add more templates as needed
  ])

  const openTemplateModal = () => setIsTemplateModalOpen(true)
  const closeTemplateModal = () => setIsTemplateModalOpen(false)

  const selectTemplate = (template) => {
    setSelectedTemplate(template.text)
    closeTemplateModal()
  }

  const placeholders = {
    Topic: "Enter topic here (8-10 words)",
    Blog: "Enter blog link here",
    Shorts: "Enter youtube shorts link < 1min",
    Paragraph: "Enter Paragraph Content Here",
    Youtube: "Enter Youtube Link (< 10 min video)"
  }

  return (
    <div className="app-container">
      <div className="columns-wrapper">
        <div className="input-section">
          <div className="header">
            <h1>Create LinkedIn Post</h1>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="English">English</option>
              {/* Add more language options here */}
            </select>
          </div>

          <div className="variable-input-group">
            <div className="input-field">
              <label htmlFor="variable-select">
                Create LinkedIn post from a {selectedVariable}
              </label>
              <select
                id="variable-select"
                value={selectedVariable}
                onChange={(e) => setSelectedVariable(e.target.value)}
              >
                <option value="Topic">Topic</option>
                <option value="Blog">Blog</option>
                <option value="Shorts">Shorts</option>
                <option value="Paragraph">Paragraph</option>
                <option value="Youtube">Youtube</option>
              </select>
            </div>
            {selectedVariable === 'Paragraph' ? (
              <textarea
                id="variable-input"
                value={variableInput}
                onChange={(e) => setVariableInput(e.target.value)}
                placeholder={placeholders[selectedVariable]}
                className="variable-input textarea"
              />
            ) : (
              <input
                type="text"
                id="variable-input"
                value={variableInput}
                onChange={(e) => setVariableInput(e.target.value)}
                placeholder={placeholders[selectedVariable]}
                className="variable-input"
              />
            )}
          </div>

          <div className="template-section">
            <div className="template-header">
              <label htmlFor="template-input">Select a format from templates</label>
              <button className="select-template-button" onClick={openTemplateModal}>
                Select Template
              </button>
            </div>
            <textarea
              id="template-input"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            />
          </div>

          <div className="tone-section">
            {['Humorous', 'Formal', 'Negative', 'Serious', 'Curious', 'Friendly', 'Emoji', 'Motivational'].map((tone) => (
              <button
                key={tone}
                className={`tone-pill ${selectedTone === tone ? 'selected' : ''}`}
                onClick={() => setSelectedTone(tone)}
              >
                {tone}
              </button>
            ))}
          </div>

          <button className="generate-button" onClick={() => {/* Generate post logic */}}>
            Generate a Post
          </button>
        </div>

        <div className="output-section">
          <div className="header">
            <h1>Generated Post</h1>
          </div>
          <textarea
            value={generatedPost}
            onChange={(e) => setGeneratedPost(e.target.value)}
            readOnly
          />
          <button className="post-button" onClick={() => {/* Post to LinkedIn logic */}}>
            Post on LinkedIn
          </button>
        </div>
      </div>

      {isTemplateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Select a Template</h2>
            <div className="template-list">
              {templates.map((template) => (
                <div key={template.id} className="template-card">
                  <p>{template.text}</p>
                  <button onClick={() => selectTemplate(template)}>Use Template</button>
                </div>
              ))}
            </div>
            <button className="close-modal" onClick={closeTemplateModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
