import { Award, Edit2, Plus, Trash2, Check, X } from 'lucide-react';
import { useState } from 'react';
import type { Skill } from '../../types';

interface SkillsCardProps {
  skills: Skill[];
  isEditing: boolean;
}

export default function SkillsCard({ skills, isEditing }: SkillsCardProps) {
  const [editingSkill, setEditingSkill] = useState<number | null>(null);
  const [newSkill, setNewSkill] = useState<Skill | null>(null);
  const [tempSkills, setTempSkills] = useState<Skill[]>(skills);

  const handleEdit = (index: number) => {
    setEditingSkill(index);
  };

  const handleSave = (index: number) => {
    setEditingSkill(null);
    // Here you would typically make an API call to update the skills
  };

  const handleCancel = () => {
    setEditingSkill(null);
    setNewSkill(null);
    setTempSkills(skills);
  };

  const handleAddNew = () => {
    setNewSkill({ name: '', level: 0 });
  };

  const handleDelete = (index: number) => {
    setTempSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Award className="h-5 w-5 mr-2 text-indigo-600" />
          Skills
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
      <div className="space-y-4">
        {tempSkills.map((skill, index) => (
          <div key={index} className="space-y-2">
            {editingSkill === index ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={skill.name}
                  onChange={e => {
                    const newSkills = [...tempSkills];
                    newSkills[index] = { ...skill, name: e.target.value };
                    setTempSkills(newSkills);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={e => {
                    const newSkills = [...tempSkills];
                    newSkills[index] = { ...skill, level: parseInt(e.target.value) || 0 };
                    setTempSkills(newSkills);
                  }}
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
                />
                <button onClick={() => handleSave(index)} className="p-2 text-green-600 hover:text-green-700">
                  <Check className="h-5 w-5" />
                </button>
                <button onClick={handleCancel} className="p-2 text-red-600 hover:text-red-700">
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="group relative">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
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
                <div className="h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
        {newSkill && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newSkill.name}
                onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="Skill name"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={newSkill.level}
                onChange={e => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 0 })}
                placeholder="Level"
                className="w-20 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700"
              />
              <button
                onClick={() => {
                  setTempSkills([...tempSkills, newSkill]);
                  setNewSkill(null);
                }}
                className="p-2 text-green-600 hover:text-green-700"
              >
                <Check className="h-5 w-5" />
              </button>
              <button
                onClick={() => setNewSkill(null)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}