import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SubBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileUpload, faFileAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const SubBar = ( setIsCreateFolderModalOpen, setIsCreateFileModalOpen, setIsFileUploadModalOpen) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentFolder, currentFolderData, userFolders } = useSelector((state) => ({
        currentFolder: state.filefolders.currentFolder,
        currentFolderData: state.filefolders.userFolders.find(
            (folder) => folder.docId === state.filefolders.currentFolder
        ),
        userFolders: state.filefolders.userFolders,
    }), shallowEqual);

    return(
        <div className="">
            <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-white py-2">
                <nav className="ms-5" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/Dashboard">Root</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            New Folder
                        </li>
                    </ol>
                </nav>

                <ul className="navbar-nav ms-auto me-5" >
                    <li className="nav-item mx-2">
                        <button 
                            className="btn btn-outine-dark"
                            onClick={() => setIsFileUploadModalOpen(true)}
                        >
                            <FontAwesomeIcon icon={faFileUpload} />
                            &nbsp; Upload File
                        </button>
                    </li>
                    <li className="nav-item mx-2">
                        <button 
                            className="btn btn-outline-dark"
                            onClick={() => setIsCreateFileModalOpen(true)}
                        >
                            <FontAwesomeIcon icon={faFileAlt} />
                            &nbsp; Create File
                        </button>
                    </li>
                    <li className="nav-item ms-2">
                        <button 
                            className="btn btn-outline-dark" 
                            onClick={() => setIsCreateFolderModalOpen(true)}
                        >
                            <FontAwesomeIcon icon={faFolderPlus} />
                            &nbsp; Create Folder
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SubBar;
