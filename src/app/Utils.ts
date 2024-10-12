import Together from "together-ai";
import axios from "axios";
import { encode } from "gpt-3-encoder"; 
import * as dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

const TogetherAPIKey: string = process.env.TOGETHER_API_KEY || '';
const GHToken: string = process.env.GITHUB_ACCESS_TOKEN || '';

if (!TogetherAPIKey) {
    throw new Error('TOGETHER_API_KEY is not defined in the environment');
}

if (!GHToken) {
    throw new Error('GITHUB_ACCESS_TOKEN is not defined in the environment');
}

const together = new Together({ apiKey: TogetherAPIKey });

const EXCLUDED_EXTENSIONS = ['.png', '.jpeg', '.jpg', '.woff', '.woff2', '.svg', '.gif', '.sum'];
const EXCLUDED_FILENAMES = ['LICENSE', '.gitignore', 'README.md', '.eslintrc.json'];
const EXCLUDED_DIRECTORIES = ['node_modules', '.env', '.env.local', 'dist', 'build', '.venv'];
const TOKEN_LIMIT = 15000;

const systemPrompt = `
You are a README documentation generator. Your tasks include:
- Analyzing file paths and their content.
- Describing the functionality of the code.
- Understanding the intent of the project, and accordingly choosing the type of documentation to generate.
- Generating clear and concise documentation based on the analysis.
- Distinguishing between user documentation and general documentation.
- Ensuring the documentation is appropriately detailed—not too short or overly lengthy.
`;

export async function shouldExclude(path: string): Promise<boolean> {
    return (
        EXCLUDED_DIRECTORIES.some(dir => path.startsWith(dir)) ||
        EXCLUDED_FILENAMES.includes(path.split('/').pop() || "") ||
        EXCLUDED_EXTENSIONS.some(ext => path.endsWith(ext))
    );
}

export async function getRepoCode({ owner, reponame, branch = "main" }: { owner: string; reponame: string; branch?: string }): Promise<Record<string, string>> {
    const treeUrl = `https://api.github.com/repos/${owner}/${reponame}/git/trees/${branch}?recursive=1`;
    const headers = { Authorization: `token ${GHToken}` };

    try {
        const treeResponse = await axios.get(treeUrl, { headers });
        const files = treeResponse.data.tree;

        const fileContents: Record<string, string> = {};
        let totalTokens = 0;

        for (const file of files) {
            if (file.type === 'blob' && !(await shouldExclude(file.path))) {
                const fileUrl = `https://api.github.com/repos/${owner}/${reponame}/git/blobs/${file.sha}`;
                try {
                    const fileResponse = await axios.get(fileUrl, { headers });
                    const content = Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');
                    const fileTokens = encode(content).length;

                    if (totalTokens + fileTokens > TOKEN_LIMIT) {
                        console.warn(`Token limit reached. Skipping remaining files.`);
                        break;
                    }

                    fileContents[file.path] = content;
                    totalTokens += fileTokens;
                } catch (error) {
                    console.error(`Error retrieving content for ${file.path}:`, error);
                }
            }
        }

        if (Object.keys(fileContents).length === 0) {
            throw new Error("No valid repository content found.");
        }

        console.log(`Total tokens processed: ${totalTokens}`);
        return fileContents;
    } catch (error) {
        throw new Error(`Failed to retrieve repository content: ${error}`);
    }
}

export async function generateReadme(fileContents: Record<string, string>): Promise<string> {
    const prompt = Object.entries(fileContents)
        .map(([path, content]) => `Path: ${path}\nContent:\n${content}\n`)
        .join('\n');

    const response = await together.chat.completions.create({
        model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Generate a succinct documentation README.md for the following repository content:\n${prompt}` }
        ],
    });

    if (!response.choices || response.choices.length === 0) {
        throw new Error("No choices returned from the API response.");
    }

    const messageContent = response.choices[0]?.message?.content;
    
    if (typeof messageContent !== 'string') {
        throw new Error("Received invalid content from the API response.");
    }

    return messageContent;
}