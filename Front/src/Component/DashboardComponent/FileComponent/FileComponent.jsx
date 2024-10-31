import { shallowEqual, useSelector } from "react-redux";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FileComponent = () => {

    const {fileId} = useParams();
    const {fileData, setFileData} = useState(null);
    const {prevFileData, setPrevFileData} = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(currentFile){
            setFileData(currentFile?.data?.data);
            setPrevFileData(currentFile?.data?.data)
        }
    }, [currentFile, currentFile?.data?.data]);

    const {currentFile, isAuthentificated} = useSelector((state) => ({
        currentFile: state.filefolders.userFiles.find(
            (file) => file.docId === fileId
        ),
        isAuthentificated: state.auth.isAuthentificated,
    }), shallowEqual);

    useEffect(() => {
        if(!isAuthentificated){
            navigate("/")
        }
    })

    const downloadFile = () => {
        const element = document.createElement("a");
        element.setAttribute("href", currentFile?.data?.url );
        element.setAttribute("download", currentFile?.data?.name);
        element.setAttribute("target", "_blank");
        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    return(
        <div>
            {isAuthentificated && fileData !== null ? (
                <>
                    <Header 
                        fileName={currentFile?.data?.name} 
                        fileData={fileData} 
                        prevFileData={prevFileData} 
                        fileId={fileId}
                    />
                </>
            ) : (
                <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
                    { /* sub menu bar */}
                    <div className="d-flex py-4 mt-4 px-5 justify-content-between align-items-center">
                        <p title={currentFile?.data?.name}>
                            {currentFile?.data?.name.lenght > 40 
                                ? currentFile?.data?.name.slice(0,40) + "... ." +
                                currentFile?.data?.extension 
                                : currentFile?.data?.name
                            }
                        </p>
                        <div className="d-flex align-items-center me-5">
                            <button 
                                className="btn btn-sm btn-outline-light me-2"
                                onClick={()=> navigate(-1)}
                            >
                                Go back
                            </button>
                            <button className="btn btn-sm btn-primary" onClick={() => downloadFile()}>
                                Download
                            </button>
                        </div>
                    </div>
                    <div className="w-100 mt-4" style={{ height: "650px"}}>
                        {
                            currentFile.data.extension.includes("png") ||
                            currentFile.data.extension.includes("jpg") ||
                            currentFile.data.extension.includes("jpeg") ||
                            currentFile.data.extension.includes("gif") ?  (
                                <img 
                                    src={currentFile.data.url} 
                                    alt={currentFile.data.name}
                                    className="w-100 h-100 img-fluid" 
                                />
                            ) : (
                                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                    <p className="text-center">
                                        File type not supported. Please download the file to view it.
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default FileComponent;
