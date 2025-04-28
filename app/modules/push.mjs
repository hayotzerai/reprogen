import axios from 'axios';
import { simpleGit } from 'simple-git';
import fs from 'fs';

let GITHUB_TOKEN ="";
let REPO_NAME = "";
const GITHUB_USERNAME = "hayotzercs";

export async function createAndPushRepo (req, res) {  

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

        // Step 2: Initialize a local Git repository
        const git = simpleGit();
        await git.init();
        console.log("Initialized a local git repository.");

        // Step 3: Add a README file
       // const fs = require('fs');
        const readmeContent = `# ${REPO_NAME}\n\nThis is a dynamically created repository.`;
        fs.writeFileSync("README.md", readmeContent);
        console.log("README.md file created.");

        // Step 4: Add, commit, and push to GitHub
        await git.add("./*");
        await git.commit("Initial commit");
        await git.addRemote("origin", repoUrl);
        await git.push("origin", "main");
        console.log("Files pushed to the repository successfully.");
        return res.status(200).json({"message": "Files pushed to the repository successfully." , "repro":REPO_NAME});
    } catch (error) {
        return res.status(500).json({"message": "Files fail to the repository successfully." , "repro":REPO_NAME,"Error":error.response ? error.response.data : error.message});
        
    }

    
    
};      
