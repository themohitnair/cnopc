import { NextRequest, NextResponse } from 'next/server';
import { getRepoCode, generateReadme } from '../../Utils';

export async function POST(req: NextRequest) {
  try {
    const { owner, repository } = await req.json();

    if (!owner || !repository) {
      return NextResponse.json({ error: 'Owner and repository are required.' }, { status: 400 });
    }

    const repoContents = await getRepoCode({ owner, reponame: repository });
    
    // Ensure repoContents is not empty
    if (Object.keys(repoContents).length === 0) {
      return NextResponse.json({ error: 'No valid repository content found.' }, { status: 404 });
    }

    // Generate README from repo contents
    const readmeContent = await generateReadme(repoContents);

    return NextResponse.json({ readme: readmeContent }, { status: 200 });
  } catch (error: any) {
    console.error('Error generating README:', error);
    
    // Check if error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}