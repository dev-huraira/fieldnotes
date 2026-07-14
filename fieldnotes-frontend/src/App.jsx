import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import NoteEditor from './components/NoteEditor.jsx';
import AuthPage from './components/AuthPage.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import api from './utils/api.js';
import { Menu } from 'lucide-react';

const MainApp = () => {
  const { user, loading } = useAuth();
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle', 'saving', 'saved'
  
  // Deletion Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);

  const pendingUpdates = useRef({});
  const saveTimeoutRef = useRef(null);

  // Fetch all user notes on load
  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      setNotes([]);
      setActiveNoteId(null);
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data);
      if (response.data.length > 0 && !activeNoteId) {
        // Optionally select first note on load
        setActiveNoteId(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Create a new empty note
  const handleCreateNote = async () => {
    try {
      const response = await api.post('/notes', {
        title: '',
        content: '',
        tags: []
      });
      const newNote = response.data;
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setActiveNoteId(newNote._id);
      setSearchQuery(''); // Clear search to show the new note
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // Update note details with debounced autosave
  const handleUpdateNote = (id, updatedFields) => {
    // 1. Optimistic UI update locally
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === id 
          ? { ...note, ...updatedFields, updatedAt: new Date().toISOString() } 
          : note
      )
    );

    // 2. Queue fields for saving
    setSaveStatus('saving');
    pendingUpdates.current[id] = {
      ...(pendingUpdates.current[id] || {}),
      ...updatedFields,
    };

    // 3. Debounce API PUT request (1 second wait)
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const updates = pendingUpdates.current[id];
        if (updates) {
          await api.put(`/notes/${id}`, updates);
          delete pendingUpdates.current[id];
          setSaveStatus('saved');

          // Transition back to 'idle' indicator after 1.5 seconds
          setTimeout(() => {
            setSaveStatus((prev) => (prev === 'saved' ? 'idle' : prev));
          }, 1500);
        }
      } catch (err) {
        console.error('Autosave failed:', err);
      }
    }, 1000);
  };

  // Open confirmation modal for note deletion
  const handleDeleteNoteClick = (id) => {
    setNoteIdToDelete(id);
    setDeleteModalOpen(true);
  };

  // Confirm delete handler
  const handleDeleteConfirm = async () => {
    if (!noteIdToDelete) return;
    try {
      await api.delete(`/notes/${noteIdToDelete}`);
      
      // Update local state
      const nextNotes = notes.filter((n) => n._id !== noteIdToDelete);
      setNotes(nextNotes);

      // Select another note if deleted was active
      if (activeNoteId === noteIdToDelete) {
        setActiveNoteId(nextNotes.length > 0 ? nextNotes[0]._id : null);
      }
      setNoteIdToDelete(null);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Loading state overlay
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-notebook-bg">
        <div className="flex flex-col items-center gap-3">
          {/* Minimal aesthetic loader */}
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-notebook-accent animate-bounce [animation-delay:-0.3s]" />
            <span className="h-2 w-2 rounded-full bg-notebook-accent animate-bounce [animation-delay:-0.15s]" />
            <span className="h-2 w-2 rounded-full bg-notebook-accent animate-bounce" />
          </div>
          <span className="text-xs font-medium tracking-wider uppercase text-notebook-muted">
            Opening Fieldnotes
          </span>
        </div>
      </div>
    );
  }

  // Not authenticated state
  if (!user) {
    return <AuthPage />;
  }

  // Filter notes by search query (checks title and content)
  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const activeNote = notes.find((note) => note._id === activeNoteId);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-notebook-bg font-sans text-notebook-text">
      {/* Sidebar - Note Navigation Panel */}
      <Sidebar
        notes={filteredNotes}
        activeNoteId={activeNoteId}
        onSelectNote={setActiveNoteId}
        onCreateNote={handleCreateNote}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="flex h-16 items-center border-b border-notebook-border bg-[#FAF8F4] px-4 md:hidden shrink-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-notebook p-2 text-notebook-text hover:bg-notebook-cardHover"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <span className="ml-3 font-serif font-medium text-base">Fieldnotes</span>
        </header>

        {/* Paper Editor Page */}
        <NoteEditor
          note={activeNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNoteClick}
          saveStatus={saveStatus}
          onCreateNote={handleCreateNote}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setNoteIdToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete this note?"
        message="This action cannot be undone. The note will be permanently removed from your notebook."
        confirmText="Remove"
      />
    </div>
  );
};

// Root App Wrapper injecting Provider context
const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
