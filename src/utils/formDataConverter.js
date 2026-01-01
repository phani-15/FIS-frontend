export const objectToFormData = (
  obj,
  formData = new FormData(),
  parentKey = ""
) => {
  if (obj === null || obj === undefined) return formData;

  if (obj instanceof File) {
    formData.append(parentKey, obj);
    return formData;
  }

  if (Array.isArray(obj)) {
    obj.forEach((value, index) => {
      objectToFormData(
        value,
        formData,
        `${parentKey}[${index}]`
      );
    });
    return formData;
  }

  if (typeof obj === "object") {
    Object.keys(obj).forEach(key => {
      objectToFormData(
        obj[key],
        formData,
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
    return formData;
  }

  formData.append(parentKey, obj);
  return formData;
};

export const credConverter=(obj)=>{
  const fd=new FormData()
  const data=Object.fromEntries(Object.entries(obj.formData).map(([key,value])=>[key.toLowerCase(),value]))
  fd.append("group",obj.group)
  fd.append("subcategory",obj.subcategory ?? "")
  fd.append("formdata",JSON.stringify(data))
  if (obj.files?.Document) {
    fd.append("Document", obj.files.Document);
  }

  return fd;
}
