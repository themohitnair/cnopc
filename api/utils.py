import os
from dotenv import load_dotenv
import requests
import mimetypes
from together import Together

load_dotenv()
github_token = os.getenv("GITHUB_ACCESS_TOKEN")
together_api_key = os.getenv("TOGETHER_API_KEY")

def get_repo_code(owner: str, reponame: str, branch: str = "main") -> dict[str, str]:
    url = f"https://api.github.com/repos/{owner}/{reponame}/contents"
    repo_dict = {}
    headers = {
        "Authorization": f"token {github_token}"
    }
    files_to_skip = ["README.md", "LICENSE"]
    extensions_to_skip = [".png", ".jpg", ".gif", ".env", ".env.local"]
    directories_to_skip = ["node_modules", ".venv"]

    def fetch_files(url, branch):
        response = requests.get(url, params={"ref": branch}, headers=headers)
        if response.status_code == 200:
            items = response.json()
            for item in items:
                if item["type"] == "dir" and item["name"] in directories_to_skip:
                    continue
                if item["type"] == "file":
                    if item["name"] in files_to_skip:
                        continue
                    _, ext = os.path.splitext(item["name"])
                    if ext in extensions_to_skip:
                        continue
                    mime_type, _ = mimetypes.guess_type(item["path"])
                    if mime_type and mime_type.startswith("text"):
                        file_url = item["download_url"]
                        file_content = requests.get(file_url, headers=headers).text
                        repo_dict[item["path"]] = file_content
                elif item["type"] == "dir":
                    fetch_files(item["url"], branch)
        else:
            print(f"Error fetching {url}: {response.status_code} - {response.text}")

    fetch_files(url, branch)
    return repo_dict

def code_dict_to_string(code_dict: dict[str, str]) -> str:
    code_string = ""
    for file_path, content in code_dict.items():
        code_string += f"\n{file_path}:"
        code_string += content
    return code_string

def readme_generate(code_string: str) -> str:
    system_prompt = """
    You are a README documentation generator. Your tasks include:
    - Analyzing file paths and their content.
    - Describing the functionality of the code.
    - Understand the intent of the project, and accordingly choose the type of documentation to generate.
    - Generating clear and concise documentation based on the analysis.
    - Distinguishing between user documentation and general documentation.
    - Ensuring the documentation is appropriately detailed—not too short or overly lengthy.
    """
    client = Together(api_key=together_api_key)
    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Generate README documentation for the following code:\n\n{code_string}"}
        ],
    )
    return response.choices[0].message.content