import { CreateFolderDialog } from "@/components/create-folder-dialog";
import { UploadFileDialog } from "@/components/upload-file-dialog";

export default function Files() {
    return (
        <main className="pr-4 py-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-xl">Files</h2>   
                <div className="flex items-center gap-2">
                    <CreateFolderDialog />
                    <UploadFileDialog />
                </div>         
            </div>
        </main>
    )
}