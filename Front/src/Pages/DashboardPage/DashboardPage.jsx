import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Navbar from "../../Component/DashboardComponent/Navbar/navbar";
import SubBar from "../../Component/DashboardComponent/SubBar/SubBar";
import HomeComponent from "../../Component/DashboardComponent/HomeComponent/HomeComponent"
import CreateFolder from "../../Component/DashboardComponent/CreateFolder/CreateFolder";
import CreateFile from "../../Component/DashboardComponent/CreateFile/CreateFile";
import UploadFile from "../../Component/DashboardComponent/UploadFile/UploadFile";
import { getFolders, getFiles } from "../../redux/ActionCreater/FileFoldersActionCreater";
import FolderComponent from "../../Component/DashboardComponent/FolderCOmponent/FolderComponent";
import FileComponent from "../../Component/DashboardComponent/FileComponent/FileComponent";

const DashboardPage = () => {

    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
    const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);

    const [showSubBar, setShowSubBar] = useState(true);
    const {pathname} = useLocation();

    const {isLoggedIn, isLoading, userId} = useSelector(
        (state) => ({ 
            isLoggedIn: state.auth.isAuthenticated,
            isLoading: state.filefolders.isLoading,
            userId: state.auth.user.uid,
        }), 
        shallowEqual
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!isLoggedIn) {     
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if(!isLoading && userId){
            dispatch(getFolders(userId));
            dispatch(getFiles(userId));
        }
    }, [isLoading, userId, dispatch]);

    useEffect(() => {
        if(pathname.includes("/file/")){
            setShowSubBar(false);
        }
    }, [pathname])

    return(
        <div>
            {isCreateFolderModalOpen && (
                <CreateFolder  setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
            )}
            {isCreateFileModalOpen && (
                <CreateFile setIsCreateFileModalOpen={setIsCreateFileModalOpen} />
            )}
            {isFileUploadModalOpen && (
                <UploadFile setIsFileUploadModalOpen={setIsFileUploadModalOpen} />
            )}
            <Navbar />
            {showSubBar && (
                <SubBar 
                    setIsCreateFolderModalOpen= {setIsCreateFolderModalOpen}
                    setIsCreateFileModalOpen= {setIsCreateFileModalOpen}
                    setIsFileUploadModalOpen= {setIsFileUploadModalOpen}
                />
            )}
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="folder/:folderId" element={<FolderComponent />} />
                <Route path="folder/:folderId" element={<FileComponent />} />
            </Routes>
        </div>
    )
}

export default DashboardPage;
