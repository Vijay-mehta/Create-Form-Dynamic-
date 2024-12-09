import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface ListProps {
  columns: Array<{ title: string; column: string; type: string }>;
  data: Array<any>;
  handleEdit: (rowIndex: number) => void;
  handleDelete: (rowIndex: number) => void;
}

const List: React.FC<ListProps> = ({
  columns,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full table-auto border-collapse text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-200 text-left">
            {columns?.map((col) => (
              <th
                key={col.column} 
                className="px-4 py-3 font-semibold text-gray-600 uppercase tracking-wider"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id || index} 
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              {columns?.map((col) => (
                <td
                  key={col.column} 
                  className="px-4 py-3 text-gray-800 whitespace-nowrap"
                >
                  
                  {col.type === "actions" ? (
                    <div className="flex space-x-4">
                      
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-500 hover:text-blue-700 "
                      >
                        
                        <FaEdit className="inline-block h-6 w-6" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdDelete className="inline-block h-6 w-6" />
                      </button>
                    </div>
                  ) : (
                    <>
                      {col.type === "file" ? (
                        <>
                          <img className=" w-8 h-5" src={item[col.column]} />
                        </>
                      ) : (
                        <>{item[col.column] || "N/A"}</>
                        
                      )}
                      
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
