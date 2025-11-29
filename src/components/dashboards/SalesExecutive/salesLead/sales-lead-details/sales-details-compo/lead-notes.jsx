import React, { useState } from "react";
import SalesAddNoteModal from "../../sales-lead-compo/add-notes";

export default function SalesLeadNotes({ lead, initialNotes = [] }) {
    const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
    const [notes, setNotes] = useState(initialNotes.length > 0 ? initialNotes : [
        {
            id: 1,
            author: 'Karthik',
            time: '2 hours ago',
            content: 'Customer is interested in the premium package. Will send payment link today.',
        },
        {
            id: 2,
            author: 'Karthik',
            time: '3 days ago',
            content: 'First contact made. Customer requested more information about pricing.',
        },
    ]);

    // Handle adding note from modal
    const handleAddNote = (newNote) => {
        const noteWithId = {
            ...newNote,
            id: Date.now(), // Simple ID generation
            time: 'Just now', // You can format this properly
            author: 'Current User' // You can get this from user context
        };
        
        setNotes(prev => [noteWithId, ...prev]);
        setIsAddNoteModalOpen(false);
    };

    // Handle deleting a note
    const handleDeleteNote = (noteId) => {
        setNotes(prev => prev.filter(note => note.id !== noteId));
    };

    return (
        <>
            <div className="space-y-4">
                {notes.map((note) => (
                    <div key={note.id} className="p-4 bg-gray-50 rounded-lg group relative">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">{note.author}</span>
                            <span className="text-xs text-gray-500">{note.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{note.content}</p>
                        <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete note"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                ))}
                
                {notes.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <p>No notes yet. Add your first note!</p>
                    </div>
                )}
                
                <div className="pt-4 border-t">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setIsAddNoteModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                        >
                            Add New Note
                        </button>
                    </div>
                </div>
            </div>
            
            <AddNoteModal
                isOpen={isAddNoteModalOpen}
                onClose={() => setIsAddNoteModalOpen(false)}
                lead={lead}
                onNoteAdded={handleAddNote}
            />
        </>
    );
}