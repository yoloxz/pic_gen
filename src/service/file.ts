// import  from "./service/uploadFile";
import service from "./service";
import SparkMD5 from 'spark-md5';


const defaultChunkSize = 512 * 512 * 10; // 5MB

interface FileChuck {
  no: number,
  chunk: Blob,
  size: number,
  name: string,
  hash: string,
}

const fileChuckList: FileChuck[] = [];

// 通知服务端文件的分块信息
async function notifyFileChunks(file: File, chunkSize = defaultChunkSize): Promise<void> {
  const md5 = await getFileChunks(file, chunkSize)
  console.log(fileChuckList)
  return service.postAction('/api/file/chunks', {
    name: file.name,
    size: file.size,
    chunks: Math.ceil(file.size / chunkSize),
    md5: md5
  })
}

// 获取文件分块
function getFileChunks(file: File, chunkSize = defaultChunkSize): Promise<void> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader
    const chunks = Math.ceil(file.size / chunkSize)
    const md5 = new SparkMD5.ArrayBuffer()
    let currentChunk = 0
    fileReader.onload = (e) => {
      const chunk = e.target?.result
      md5.append(chunk)
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        resolve(md5.end())
      }
    }
    fileReader.onerror = () => {
      console.log('error')
    }
    function loadNext() {
      let start = currentChunk * chunkSize
      let end = start + chunkSize >= file.size ? file.size : start + chunkSize
      let chuck = file.slice(start, end)
      fileReader.readAsArrayBuffer(chuck)
      fileChuckList.push({
        no: currentChunk,
        chunk: chuck,
        size: chuck.size,
        name: file.name,
        hash: md5.end()
      })
    }
    loadNext()
  })
}

function uploadFileChunks(): Promise<void[]> {
  const requests = fileChuckList.map((fileChuck) => {
    const formData = new FormData();
    formData.append('file', fileChuck.chunk);
    formData.append('no', fileChuck.no.toString());
    formData.append('size', fileChuck.size.toString());
    formData.append('name', fileChuck.name);
    formData.append('hash', fileChuck.hash);
    return service.uploadFile(formData)
  })
  return Promise.all(requests)
}

export {
  notifyFileChunks,
  uploadFileChunks
}