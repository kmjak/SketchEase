interface InputProps {
  label: string;
  type: string;
}

export default function Input ({label, type}: InputProps) {
  return (
    <>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={label}
        name={label}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </>
  )
}