import React from 'react';

interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'password' | 'textarea' | 'select'; // Tambahkan 'password' untuk keamanan
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  options?: string[];
  id?: string; // Tambahkan id sebagai prop opsional
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  options,
  id,
}) => {
  return (
    <div className='mb-4'>
      <label
        htmlFor={id || name}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id || name} // Gunakan id jika ada, jika tidak gunakan name
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        />
      ) : type === 'select' ? (
        <select
          id={id || name} // Gunakan id jika ada, jika tidak gunakan name
          name={name}
          value={value}
          onChange={onChange}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        >
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id || name} // Gunakan id jika ada, jika tidak gunakan name
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        />
      )}
    </div>
  );
};

export default Input;
