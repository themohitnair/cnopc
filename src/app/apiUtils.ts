import * as dotenv from 'dotenv';
import { Together, ClientOptions } from 'together-ai';
import axios from 'axios';

dotenv.config();

const systemPrompt = `
You are a README documentation generator. Your tasks include:
- Analyzing file paths and their content.
- Describing the functionality of the code.
- Understand the intent of the project, and accordingly choose the type of documentation to generate.
- Generating clear and concise documentation based on the analysis.
- Distinguishing between user documentation and general documentation.
- Use a line in the README to list the tech-stack you think is used.
- Ensuring the documentation is appropriately detailed—not too short or overly lengthy.
`;

const tgtKey = process.env.TOGETHER_API_KEY;
const token = process.env.GITHUB_ACCESS_TOKEN;
const clientOptions: ClientOptions = { apiKey: tgtKey };
const client = new Together(clientOptions);

const EXCLUDED_EXTENSIONS = new Set(['.png', '.jpeg', '.jpg', '.woff', '.woff2', '.svg', '.gif', '.sum']);
const EXCLUDED_FILENAMES = new Set(['LICENSE', '.gitignore', 'README.md', '.eslintrc.json']);
const EXCLUDED_DIRECTORIES = new Set(['node_modules', '.env', '.env.local', 'dist', 'build', '.venv']);

function shouldExclude(filePath: string): boolean {
    return (
        EXCLUDED_DIRECTORIES.has(filePath.split('/')[0]) ||
        EXCLUDED_FILENAMES.has(filePath.split('/').pop() || '') ||
        EXCLUDED_EXTENSIONS.has(filePath.split('.').pop() || '')
    );
}

async function getReadme(username: string, repo: string, branch: string = 'main'): Promise<string> {
    const headers = { Authorization: `token ${token}` };
    const treeUrl = `https://api.github.com/repos/${username}/${repo}/git/trees/${branch}?recursive=1`;

    try {
        const treeResponse = await axios.get(treeUrl, { headers });
        const files = treeResponse.data.tree || [];

        const fileContents: { [key: string]: string } = {};

        for (const file of files) {
            if (file.type === 'blob' && !shouldExclude(file.path)) {
                const fileUrl = `https://api.github.com/repos/${username}/${repo}/git/blobs/${file.sha}`;
                try {
                    const fileResponse = await axios.get(fileUrl, { headers });
                    const rawData = Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');
                    fileContents[file.path] = rawData;
                } catch (error) {
                    console.error(`Error retrieving content for ${file.path}:`, error);
                }
            }
        }

        if (Object.keys(fileContents).length === 0) {
            throw new Error("No valid repository content found.");
        }

        const prompt = Object.entries(fileContents)
            .map(([path, content]) => `Path: ${path}\nContent:\n${content}\n`)
            .join('\n');

        console.log(prompt);

        const response = await client.chat.completions.create({
            model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `${prompt}` }
            ],
        });

        const content = response.choices[0]?.message?.content ?? '';
        return content;
    } catch (error) {
        throw new Error(`Failed to retrieve repository content: ${error}`);
    }
}

export { getReadme };