const subcategory = [
  {
    title: "S.No",
    column: "id",  // Assuming each product has an 'id' field
    type: "number",
  },
  {
    title: "title Name",
    column: "title", 
    type: "text",
  },
  {
    title: "Category Name",
    column: "category",  
    type: "text",
  },
  {
    title: "Image",
    column: "image",  
    type: "file",
  },
  {
    title: "Actions",
    column: "actions", 
    type: "actions",
  }
];

export default subcategory;
