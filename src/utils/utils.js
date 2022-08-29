export function permalink(string) {
  return string.replace(" ", "-").replace("_", "-")
}

export const navigateWithNotify = (navigate, path) => {
  navigate(path, {
    state: {
      toast: true
    }
  });
}


export const getExtension = (fileName) => {
  let reversedString = fileName.split('').reverse().join('')
  let extension = []

  for (let index = 0; index < reversedString.length; index++) {
    if (reversedString[index] !== ".") extension.unshift(reversedString[index]);
    else break;
  }
  return extension.join("");
}

export const exportFile = (blob, fileName) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

export const fileFormatXextension = {
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
  xls: "application/vnd.ms-excel", // xls
  csv: ["text/csv", "application/vnd.ms-excel"], // csv
  txt: "text/plain", // txt
  pdf: "application/pdf", // pdf
  doc: "application/msword", // doc
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  eml: "message/rfc822", // eml
  ppt: "application/vnd.ms-powerpoint", // ppt
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation" // pptx
}

export function checkIsQuickSave(isQuickSave, targetName) {
  if (targetName === "quickSave") {
    isQuickSave = true;
  } else {
    isQuickSave = false;
  }
  return isQuickSave;
}

export function getResponse(apiCall) {
  return apiCall ?? { response: null }
}

export function getNameByUsername(username) {
  let name = ""
  for (let index = 0; index < username.length; index++) {

    if (username[index] === "." || username[index] === "@") break;

    name += index === 0 ? username[index].toUpperCase() : username[index]
  }
  return name;
}

export function controlStatus204(response, navigate, path, msgToSend) {
  if (response === "") return navigate(path, {
    state: {
      msg: msgToSend
    }
  });
}
