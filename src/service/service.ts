import instance from "../config/axiosConfig";


export interface FileData {
  size: number,
  name: string,
}

function postAction(url: string, data: any): Promise<any> {
  return instance({
    method: 'post',
    url: url,
    data: data
  })
}

function generateImage(data: any): Promise<any> {
  return instance({
    method: 'post',
    url: '/lcm',
    data: data,
    headers: { Authorization: 'Key ' + "" }
  })
}

//获取文件列表
function getFileList(dirname: string): Promise<string[]> {
  return instance({
    method: 'post',
    url: '/api/list',
    data: {
      dirname
    }
  })
}

//创建文件夹
function mkdirsSync(dirname: string): Promise<void> {
  return instance({
    method: 'post',
    url: '/api/mkdir',
    data: {
      dirname
    }
  })
}

// 上传文件
function uploadFile(data: FormData): Promise<void> {
  return instance({
    method: 'post',
    url: '/api/file/upload',
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}



// 下载文件
function downloadFile(filename: string): Promise<Blob> {
  return instance({
    method: 'post',
    url: '/api/download',
    data: {
      filename
    },
    responseType: 'blob'
  })
}

function mergeChunks(data: FileData): Promise<void> {
  return instance({
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 删除文件
function deleteFile(filename: string): Promise<void> {
  return instance({
    method: 'post',
    url: '/api/delete',
    data: {
      filename
    }
  })
}

// 重命名
function renameFile(oldname: string, newname: string): Promise<void> {
  return instance({
    method: 'post',
    url: '/api/rename',
    data: {
      oldname,
      newname
    }
  })
}

export default {
  getFileList: getFileList,
  mkdirsSync: mkdirsSync,
  uploadFile: uploadFile,
  downloadFile: downloadFile,
  deleteFile: deleteFile,
  renameFile: renameFile,
  mergeChunks: mergeChunks,
  postAction: postAction,
  generateImage: generateImage
}