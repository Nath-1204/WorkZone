
import * as types from "../Actions/FileFoldersAction"

const initialState = {
    isLoading: true,
    currentFolder: "root",
    userFolders: [],
    userFiles: [],
    adminFolders: [],
    adminFiles: [],
}

const FileFolder = (state = initialState, action) => {
    switch(action.types) {
        case types.CREATE_FOLDER:
            return{
                ...state,
                userFolders: [ ...state.userFolders, action.payload],
            };
        case types.ADD_FOLDER: 
            return{
                ...state,
                userFolders: action.payload,
            };
        case types.SET_LOADING: 
            return{
                ...state,
                isLoading: action.payload,
            };
        case types.CHANGE_FOLDER:
            return{
                ...state,
                currentFolder: action.payload,
            }
        case types.ADD_FILES: 
            return{
                ...state,
                userFiles: action.payload,
            }
        case types.CREATE_FILE:
            return{
                ...state,
                userFiles: [...state.userFiles, action.payload],
            }
        case types.SET_FILE_DATA:
            const { fileId, data } = action.payload;
            const allFiles = state.userFiles;
            const currentFile = allFiles.find((file) => file.docId == fileId);
            currentFile.data.data = data;
            return{
                ...state,
                userFiles: state.userFiles.map((file) => file.docId == fileId ? currentFile : file),
            };        
        default: 
            return state;
    }
}

export default FileFolder;

