import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createFile } from "../../../redux/ActionCreater/FileFoldersActionCreater";

const CreateFile = ({ setIsCreateFileModalOpen }) => {

    const [fileName, setFileName] = useState("");
    const [success, setSuccess] = useState(false);

    const {userFiles, userId, currentFolder, currentFolderData} = useSelector(
        (state) => ({
            userFiles: state.filefolders.userFiles,
            user: userId.auth.user,
            currentFolder: state.filefolders.currentFolder,
            currentFolderData: state.filefolders.userFolders.find(
                (folder) => folder.docId === state.filefolders.currentFolder
            ),
    }), shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        if(success){
            setFileName("");
            setSuccess("");
            setIsCreateFileModalOpen(false);
        }
    }, success)

    const checkFileAlreadyPresent = (name, ext) => {
        if(!ext){
            name = name + ".txt";
        }
        const filePresent = userFiles
            .filter((file) => file.data.parent === currentFolder )
            .find((folder) => folder.data.name === name );
        if(filePresent) {
            return true;
        } else {
            return false;
        }  
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(fileName ) {
            if(fileName.length > 3){
                // check file extension
                let extension = false;
                if( !fileName.split(".").length > 1){
                    extension = true;
                }
                if(!checkFileAlreadyPresent(fileName, extension)){

                    const data = {
                        createAt: new Date(),
                        name: extension ? fileName : `${fileName}.txt`,
                        userId: user.uid,
                        createBy: user.displayName,
                        path: 
                            currentFolder === "root" 
                            ? [] 
                            : [...currentFolderData?.data.path, currentFolder],
                        parent: currentFolder,
                        lastAccessed: null,
                        updateAt: new Date(),
                        extension: extension ? fileName.split(".")[1] : "txt",
                        data: "",
                        url: null,
                    };
                    dispatch(createFile(data, setSuccess));
                    console.log("data", data)
                }else{
                    toast.error("File already present");
                }
            }else{
                toast.error("File name must be at least 3 characters")
            }
        }else{
            toast.error("File name cannot be empty")
        }
    }

    return(
        <div 
            className="col-ad-12 position-fixed top-0 left-0 w-100 h-100"
            style={{ background: "rgba(0, 0, 0, 0.4)", zIndex: 9999 }}
        >
            <div className="row align-items-center justify-content-center">
                <div className="col-md-4 mt-5 bg-white rounded p-4">
                    <div className="d-flex justify-content-between">
                        <h4>Create File</h4>
                        <button 
                            className="btn text-black"
                            onClick={() => setIsCreateFileModalOpen(false)}
                        ></button>
                    </div>
                    <hr />
                    <div className="d-flex flex-column align-items-center">
                        <form  className="mt-3 w-100" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    id="folderName"
                                    placeholder="File Name"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-5 form-control">
                                Create File
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFile;
