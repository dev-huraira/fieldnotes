import React, { useState, useEffect } from 'react';
import { Trash2, Tag, X, FileText, Check } from 'lucide-react';

const NoteEditor = ({ 
  note, 
  onUpdateNote, 
  onDeleteNote, 
  saveStatus, // 'idle', 'saving', 'saved'
  onCreateNote 
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  // Sync state with note prop
  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setTags(note.tags || []);
    }
  }, [note]);

  if (!note) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-notebook-bg p-8 text-center animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-notebook-accent/5 text-notebook-accent/40 mb-5">
          <FileText size={28} strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-lg font-medium text-notebook-text">
          A clean sheet of paper
        </h3>
        <p className="mt-2 text-sm text-notebook-muted max-w-sm leading-relaxed">
          Create a new note or select an existing one to begin writing down your thoughts, logs, and notes.
        </p>
        <button
          onClick={onCreateNote}
          className="mt-6 rounded-notebook bg-notebook-accent px-4 py-2 text-sm font-medium text-white hover:bg-notebook-accentHover focus:outline-none"
        >
          Write your first note
        </button>
      </div>
    );
  }

  const handleTitleChange = (e) => {
    const nextTitle = e.target.value;
    setTitle(nextTitle);
    onUpdateNote(note._id, { title: nextTitle, content, tags });
  };

  const handleContentChange = (e) => {
    const nextContent = e.target.value;
    setContent(nextContent);
    onUpdateNote(note._id, { title, content: nextContent, tags });
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const cleanTag = tagInput.trim().toLowerCase().replace(/,/g, '');
      if (cleanTag && !tags.includes(cleanTag)) {
        const nextTags = [...tags, cleanTag];
        setTags(nextTags);
        setTagInput('');
        onUpdateNote(note._id, { title, content, tags: nextTags });
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const nextTags = tags.filter(tag => tag !== tagToRemove);
    setTags(nextTags);
    onUpdateNote(note._id, { title, content, tags: nextTags });
  };

  return (
    <div className="flex flex-1 flex-col bg-notebook-bg h-full animate-fade-in">
      {/* Editor Header / Save Status */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-notebook-border bg-[#FAF8F4] shrink-0">
        <div className="flex items-center gap-2">
          {/* Status Indicator */}
          {saveStatus === 'saving' && (
            <span className="text-xs font-medium text-notebook-muted flex items-center gap-1.5 animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-notebook-coral" />
              Saving...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-xs font-medium text-notebook-accent/80 flex items-center gap-1.5">
              <Check size={12} className="stroke-[3]" />
              Saved
            </span>
          )}
          {saveStatus === 'idle' && (
            <span className="text-xs font-medium text-notebook-muted">
              All changes saved
            </span>
          )}
        </div>

        <button
          onClick={() => onDeleteNote(note._id)}
          className="flex items-center gap-1.5 rounded-notebook px-2.5 py-1.5 text-xs font-medium text-notebook-muted hover:bg-notebook-coral/10 hover:text-notebook-coral"
          title="Delete note"
        >
          <Trash2 size={14} />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>

      {/* Editor Main Text Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10 max-w-4xl w-full mx-auto space-y-6">
        {/* Tags management bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-notebook-border pb-4">
          <Tag size={12} className="text-notebook-muted" />
          
          {/* Render active tags */}
          {tags.map((tag, idx) => (
            <span 
              key={idx}
              className="inline-flex items-center gap-1 rounded-full bg-notebook-coral/10 pl-2 pr-1.5 py-0.5 text-xs font-medium text-notebook-coral uppercase tracking-wider"
            >
              {tag}
              <button 
                type="button" 
                onClick={() => handleRemoveTag(tag)}
                className="rounded-full p-0.5 hover:bg-notebook-coral/25 focus:outline-none text-notebook-coral"
              >
                <X size={10} />
              </button>
            </span>
          ))}

          {/* Simple Inline tag input */}
          <input
            type="text"
            placeholder="Add tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="border-none bg-transparent py-0.5 text-xs font-medium text-notebook-muted placeholder-notebook-muted/40 focus:outline-none focus:ring-0 max-w-[80px]"
          />
        </div>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled note"
          className="w-full border-none bg-transparent p-0 font-serif text-2xl md:text-3xl font-semibold text-notebook-text placeholder-notebook-text/25 focus:outline-none focus:ring-0"
        />

        {/* Note Body Textarea */}
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Start writing..."
          className="w-full flex-1 border-none bg-transparent p-0 font-serif text-base md:text-lg text-notebook-text/95 placeholder-notebook-text/20 focus:outline-none focus:ring-0 resize-none min-h-[400px] leading-relaxed"
        />
      </div>
    </div>
  );
};

export default NoteEditor;
