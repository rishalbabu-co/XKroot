import { Mail, Phone, MapPin, Edit2, Check, X } from 'lucide-react';
import type { Profile } from '../../types';

interface PersonalInfoProps {
  profile: Profile;
  isEditing: boolean;
  editingField: string | null;
  tempValues: Record<string, string>;
  onEdit: (field: string, value: string) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
}

export default function PersonalInfo({
  profile,
  isEditing,
  editingField,
  tempValues,
  onEdit,
  onSave,
  onCancel
}: PersonalInfoProps) {
  const EditableField = ({ field, value, label }: { field: string; value: string; label?: string }) => (
    <div className="group relative">
      {editingField === field ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={tempValues[field] || value}
            onChange={e => onEdit(field, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
            placeholder={label || field}
          />
          <button onClick={() => onSave(field)} className="p-2 text-green-600 hover:text-green-700">
            <Check className="h-5 w-5" />
          </button>
          <button onClick={onCancel} className="p-2 text-red-600 hover:text-red-700">
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className={field === 'name' ? 'text-2xl font-bold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}>
            {value}
          </span>
          {isEditing && (
            <button
              onClick={() => onEdit(field, value)}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
      <div className="space-y-4">
        <EditableField field="name" value={profile.name} />
        <EditableField field="title" value={profile.title} />
        
        <div className="pt-4 space-y-3">
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-3 text-gray-400" />
            <EditableField field="email" value={profile.email} />
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-3 text-gray-400" />
            <EditableField field="phone" value={profile.phone} />
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-gray-400" />
            <EditableField field="location" value={profile.location} />
          </div>
        </div>
      </div>
    </div>
  );
}