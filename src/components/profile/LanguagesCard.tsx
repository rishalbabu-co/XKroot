import { Languages, Edit2, Plus, Trash2, Check, X } from 'lucide-react';
import { useState } from 'react';
import type { Language } from '../../types';

interface LanguagesCardProps {
  languages: Language[];
  isEditing: boolean;
}

export default function LanguagesCard({ languages, isEditing }: LanguagesCardProps) {
  const [editingLang, setEditingLang] = useState<number | null>(null);
  const [newLang, setNewLang] = useState<Language | null>(null);
  const [tempLangs, setTempLangs] = useState<Language[]>(languages);

  const levels = ['Basic', 'Conversational', 'Fluent', 'Native'];

  const handleEdit = (index: number) => {
    setEditingLang(index);
  };

  const handleSave = (index: number) => {
    setEditingLang(null);
    // Here you would typically make an API call to update the languages
  };

  const handleCancel = () => {
    setEditingLang(null);
    setNewLang(null);
    setTempLangs(languages);
  };

  const handleAddNew = () => {
    setNewLang({ name: '', level: 'Basic' });
  };

  const handleDelete = (index: number) => {
    setTempLangs(languages.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Languages className="h-5 w-5 mr-2 text-indigo-600" />
          Languages
        </h3>
        {isEditing && (
          <button
            onClick={handleAddNew}
            className="text-indigo-600 hover:text-indigo-700 p-1 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/50"
          >
            <Plus className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="space-y-3">
        {tempLangs.map((lang, index) => (
          <div key={index} className="group relative">
            {editingLang === index ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={lang.name}
                  onChange={e => {
                    const newLangs = [...tempLangs];
                    newLangs[index] = { ...lang, name: e.target.value };
                    setTempLangs(newLangs);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
                />
                <select
                  value={lang.level}
                  onChange={e => {
                    const newLangs = [...tempLangs];
                    newLangs[index] = { ...lang, level: e.target.value };
                    setTempLangs(newLangs);
                  }}
                  className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <button onClick={() => handleSave(index)} className="p-2 text-green-600 hover:text-green-700">
                  <Check className="h-5 w-5" />
                </button>
                <button onClick={handleCancel} className="p-2 text-red-600 hover:text-red-700">
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{lang.level}</span>
                  {isEditing && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                      <button
                        onClick={() => handleEdit(index)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-1 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {newLang && (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newLang.name}
              onChange={e => setNewLang({ ...newLang, name: e.target.value })}
              placeholder="Language name"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
            />
            <select
              value={newLang.level}
              onChange={e => setNewLang({ ...newLang, level: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <button
              onClick={() => {
                setTempLangs([...tempLangs, newLang]);
                setNewLang(null);
              }}
              className="p-2 text-green-600 hover:text-green-700"
            >
              <Check className="h-5 w-5" />
            </button>
            <button
              onClick={() => setNewLang(null)}
              className="p-2 text-red-600 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}