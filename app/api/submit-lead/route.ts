import { NextResponse } from 'next/server';
import { submitLead } from '@/actions/contactAction';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await submitLead(body);

    if (result.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json(
      { success: false, error: result.error || 'Submission failed' },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Invalid request' },
      { status: 500 }
    );
  }
}
