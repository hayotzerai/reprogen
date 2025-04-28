import axios from 'axios';
import { simpleGit } from 'simple-git';
import fs from 'fs';

let GITHUB_TOKEN ="";
let REPO_NAME = "";
const GITHUB_USERNAME = "hayotzercs";

export async function create (req, res) {  

    GITHUB_TOKEN = req.params.token;
    REPO_NAME = req.params.repro;

    const url = "https://api.github.com/user/repos";
    const headers = {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json"
    };
    const data = {
        name: REPO_NAME,
        private: false,
        description: `This repository ${REPO_NAME} is dynamically created and pushed`
    };

    try {
        // Step 1: Create a repository on GitHub
        const response = await axios.post(url, data, { headers });
        const repoUrl = response.data.clone_url;
        console.log("Repository created successfully:", repoUrl);

        return res.status(200).json({"message": "Repository created successfully." , "repro":repoUrl});
    } catch (error) {
        return res.status(500).json({"message": "Files fail to the repository successfully." , "repro":REPO_NAME,"Error":error.response ? error.response.data : error.message});
        
    }

    
    
};      
