import { createUploadthing, type FileRouter } from "uploadthing/next";
import {auth} from "@clerk/nextjs"
import { error } from "console";
const f = createUploadthing();
 
const handleAuth = () =>{
    const {userId} = auth();
    if(!userId) throw new Error("UnAuthorized");
    return { userId: userId};
}

 
export const ourFileRouter = {
  ServerImage : f({ image : { maxFileSize: "4MB", maxFileCount:1}})
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),
  messageFile: f(["image","pdf"])
  .middleware(() => handleAuth())
  .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;