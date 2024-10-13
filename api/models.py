from pydantic import BaseModel
from typing import Optional

class RepoInfo(BaseModel):
    owner: str
    reponame: str
    branch: Optional[str] = "main"