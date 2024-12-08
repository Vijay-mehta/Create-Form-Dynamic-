import React from 'react';
import TextInput from './FormInput/TextInput'; 

interface FormProps {
  column: any;
  data: any;
  handleChange: (data: any) => void;
  handleSubmit: () => void;
}

const Form: React.FC<FormProps> = ({ column, data, handleChange, handleSubmit }) => {
  const FormField = {
    text: TextInput,
  };

  const onChange = (field: string, value: string) => {
    handleChange({ ...data, [field]: value });
  };

  return (
    <div className=" fixed inset-0 bg-opacity-50 backdrop-blur-sm bg-black  mt-24 ">
      <div className='mt-10 bg-gray-100 relative w-[900px] m-auto p-16'>
      <div className='mx-auto max-w-6xl'>
      <form onSubmit={handleSubmit}>
        {column.map((col: any, index: number) => {
          const FieldComponent = FormField[col.type]; 
          return (
            <div key={index} className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                {col.title}
              </label>
              {FieldComponent && (
                <FieldComponent
                  value={data[col.column] || ''}
                  onChange={(value: string) => onChange(col.column, value)}
                  type={col.type}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          );
        })}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Submit
        </button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Form;
