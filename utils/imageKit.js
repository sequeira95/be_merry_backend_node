
import ImageKit from "imagekit";
const imagekit = new ImageKit({
  publicKey: process.env.IK_PUBLIC,
  privateKey: process.env.IK_PRIVATE,
  urlEndpoint: process.env.IK_URL,
});

export async function uploadImgPrincipal(fileData, fileName){
  return await imagekit.upload({
    folder:'imgPrincipal',
    file:fileData,
    fileName:fileName
  })
}
export async function deleteImgPrincipal(fileId){
  console.log(fileId, 'idfile')
  return await imagekit.deleteFile(fileId)
}
export async function uploadOtherImg(fileData, fileName){
  return await imagekit.upload({
    folder:'otherImg',
    file:fileData,
    fileName:fileName
  })
}
