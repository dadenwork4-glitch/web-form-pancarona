import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // URL Google Apps Script Anda
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxS8TvKK92W2uzOj2dggzR6jawnmLPIm4p6_PP1FHR7lNxD81w1oyhRoQouU08h4XmKYg/exec'

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 })
  }
}
