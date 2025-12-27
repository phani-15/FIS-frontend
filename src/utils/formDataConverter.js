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
