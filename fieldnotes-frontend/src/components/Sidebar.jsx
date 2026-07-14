import React from 'react';
import { Search, Plus, LogOut, BookOpen, X, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Sidebar = ({ 
  notes, 
  activeNoteId, 
  onSelectNote, 
  onCreateNote, 
  searchQuery, 
  setSearchQuery, 
  isOpen, 
  onClose 
}) => {
  const { user, logout } = useAuth();

  // Format date helper to make dates look premium and quiet
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper to extract a short preview text from note content
  const getContentPreview = (content) => {
    if (!content) return 'Empty note...';
    // Remove markdown symbols or tags for preview
    const cleanText = content.replace(/[#*`_]/g, '').trim();
    if (cleanText.length > 55) {
      return cleanText.substring(0, 55) + '...';
    }
    return cleanText;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[#242423]/10 backdrop-blur-[1px] md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-notebook-border bg-[#FAF8F4] 
        transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:w-80 shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Branding header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-notebook-border">
          <div className="flex items-center gap-2 text-notebook-text font-serif text-lg font-medium">
            <BookOpen size={18} strokeWidth={1.5} className="text-notebook-accent" />
            <span>Fieldnotes</span>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="rounded-notebook p-1 text-notebook-muted hover:bg-notebook-cardHover md:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-notebook-muted">
              <Search size={15} />
            </span>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-notebook border border-notebook-border bg-[#FAF8F4] py-1.5 pl-9 pr-3 text-sm text-notebook-text placeholder-notebook-muted/50 focus:border-notebook-borderActive focus:outline-none font-sans"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1 select-none">
          {notes.length === 0 ? (
            <div className="px-3 py-6 text-center text-xs text-notebook-muted">
              No notes found.
            </div>
          ) : (
            notes.map((note) => {
              const isActive = note._id === activeNoteId;
              const hasTags = note.tags && note.tags.length > 0;
              // Subtle left border accent in tag color (dusty coral) or forest green (no tag)
              const borderAccentColor = hasTags ? 'border-l-[3px] border-notebook-coral' : 'border-l-[3px] border-notebook-accent';

              return (
                <div
                  key={note._id}
                  onClick={() => {
                    onSelectNote(note._id);
                    onClose(); // close side panel on mobile
                  }}
                  className={`
                    relative group flex flex-col p-4 rounded-notebook cursor-pointer outline-none transition-all duration-150
                    ${borderAccentColor}
                    ${isActive 
                      ? 'bg-notebook-cardActive shadow-notebook-hover text-notebook-text' 
                      : 'bg-transparent text-notebook-text hover:bg-notebook-cardHover hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(36,36,35,0.03)]'
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-medium text-sm truncate leading-tight flex-1">
                      {note.title.trim() || 'Untitled note'}
                    </h4>
                    <span className="text-[10px] font-sans font-semibold tracking-wider text-notebook-muted uppercase shrink-0 mt-0.5">
                      {formatDate(note.updatedAt)}
                    </span>
                  </div>
                  
                  <p className="mt-1 font-sans text-xs text-notebook-muted line-clamp-2 leading-relaxed">
                    {getContentPreview(note.content)}
                  </p>

                  {/* Render tiny tags row */}
                  {hasTags && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {note.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center gap-0.5 rounded-full bg-notebook-coral/10 px-1.5 py-0.5 text-[9px] font-medium text-notebook-coral uppercase tracking-wider"
                        >
                          <Tag size={7} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer controls: New Note & User profile */}
        <div className="border-t border-notebook-border bg-[#FAF8F4] px-5 py-4 space-y-3">
          <button
            onClick={onCreateNote}
            className="flex w-full items-center justify-center gap-2 rounded-notebook bg-notebook-accent py-2 text-sm font-medium text-white hover:bg-notebook-accentHover focus:outline-none"
          >
            <Plus size={16} />
            <span>New note</span>
          </button>
          
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-notebook-text leading-tight truncate max-w-[140px]">
                {user?.username}
              </span>
              <span className="text-[10px] text-notebook-muted truncate max-w-[140px]">
                {user?.email}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1 rounded-notebook px-2 py-1 text-xs font-medium text-notebook-muted hover:bg-notebook-cardHover hover:text-notebook-text"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
