import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { uploadFile } from "../../../redux/ActionCreater/FileFoldersActionCreater";

const UploadFile = () => {

    const [file, setFile] = useState(null);
    const [success, setSuccess ]= useState(false);
    const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false)

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
            setSuccess(false);
            setIsFileUploadModalOpen(false);
        }
    }, success)

    const checkFileAlreadyPresent = (name) => {
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
        if(file ) {
          if(!checkFileAlreadyPresent(file.name, extension)){
            const data = {
                createAt: new Date(),
                name: file.name,
                userId: user.uid,
                createBy: user.displayName,
                path: 
                    currentFolder === "root" 
                    ? [] 
                    : [...currentFolderData?.data.path, currentFolder],
                parent: currentFolder,
                lastAccessed: null,
                updateAt: new Date(),
                extension: file.name.split(".")[1],
                data: null,
                url: "",
            };
            dispatch(uploadFile(data, setSuccess));
          }else{
            toast.error("File already present");
          }
        }else{
          toast.error("File name cannot be empty")
        }
    };

    return(
        <div 
            className="col-ad-12 position-fixed top-0 left-0 w-100 h-100"
            style={{ background: "rgba(0, 0, 0, 0.4)", zIndex: 9999 }}
        >
            <div className="row align-items-center justify-content-center">
                <div className="col-md-4 mt-5 bg-white rounded p-4">
                    <div className="d-flex justify-content-between">
                        <h4>Upload File</h4>
                        <button 
                            className="btn text-black"
                            onClick={() => setIsFileUploadModalOpen(false)}
                        ></button>
                    </div>
                    <hr />
                    <div className="d-flex flex-column align-items-center">
                        <form  className="mt-3 w-100" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                    type="file" 
                                    className="form-control"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-5">
                              <FontAwesomeIcon icon={faFileUpload}/>
                                &nbsp; Upload File
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadFile;
