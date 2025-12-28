import React from "react";
import {ChevronDown,UploadCloud,ChevronUp,Trash2,Plus,} from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion";

export default function Section({ title, name, children, expanded, toggleExpand }) {
  const isOpen = expanded === name;
  return (
    <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => toggleExpand(name)}
        className="w-full flex justify-between items-center bg-linear-to-r from-blue-50 to-indigo-50 px-5 py-3 text-left font-medium text-gray-700 hover:from-blue-100 hover:to-indigo-100 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 rounded bg-blue-400" />
          <span>{title}</span>
        </div>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="px-5 py-4 bg-white"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function Field({ label, value, onChange, editable = true, placeholder = "" }) {
  return (
    <div className="mb-3">
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      {editable ? (
        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
      ) : (
        <div className="p-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-800">
          {value}
        </div>
      )}
    </div>
  );
}

function FileInput({ label, filename, onFileChange, editable = true }) {
  return (
    <div className="mb-3">
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <div className="p-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
            {filename || "No file selected"}
          </div>
        </div>
        {editable && (
          <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
            <UploadCloud size={16} />
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFileChange(f);
              }}
            />
            Upload
          </label>
        )}
      </div>
    </div>
  );
}

function StringListEditor({ list, onChangeList }) {
  const add = () => onChangeList([...list, ""]);
  const update = (idx, v) => {
    const copy = [...list];
    copy[idx] = v;
    onChangeList(copy);
  };
  const remove = (idx) => onChangeList(list.filter((_, i) => i !== idx));
  return (
    <div>
      {list.map((it, idx) => (
        <div key={idx} className="flex gap-3 items-start mb-3">
          <input
            value={it}
            onChange={(e) => update(idx, e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2 text-sm outline-none"
          />
          <button
            onClick={() => remove(idx)}
            className="p-2 rounded text-red-600 cursor-pointer"
            title="Remove"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
      >
        <Plus size={14} /> Add
      </button>
    </div>
  );
}

export {StringListEditor,FileInput,Field,DeepCopy,Section}