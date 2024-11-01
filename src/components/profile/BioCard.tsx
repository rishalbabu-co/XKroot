import { Edit2, Check, X } from 'lucide-react';

interface BioCardProps {
  bio: string;
  isEditing: boolean;
  editingField: string | null;
  tempValues: Record<string, string>;
  onEdit: (field: string, value: string) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
}

export default function BioCard({
  bio,
  isEditing,
  editingField,
  tempValues,
  onEdit,
  onSave,
  onCancel
}: BioCardProps) {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Me</h3>
      {editingField === 'bio' ? (
        <div className="space-y-2">
          <textarea
            value={tempValues.bio || bio}
            onChange={e => onEdit('bio', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
            rows={4}
          />
          <div className="flex justify-end space-x-2">
            <button onClick={() => onSave('bio')} className="p-2 text-green-600 hover:text-green-700">
              <Check className="h-5 w-5" />
            </button>
            <button onClick={onCancel} className="p-2 text-red-600 hover:text-red-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="group relative">
          <p className="text-gray-600 dark:text-gray-300">{bio}</p>
          {isEditing && (
            <button
              onClick={() => onEdit('bio', bio)}
              className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}