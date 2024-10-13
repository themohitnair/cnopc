from fastapi import FastAPI
from models import RepoInfo
from utils import get_repo_code

app = FastAPI()

@app.post("/readme")
async def generate_readme(repo_info: RepoInfo):
    code_dict = get_repo_code(repo_info.owner, repo_info.repo, repo_info.branch)
    
    for file_path in code_dict:
        readme_content += f"- {file_path}\n"
    
    return {"README": readme_content}
