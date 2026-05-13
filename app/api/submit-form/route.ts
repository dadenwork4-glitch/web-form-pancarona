import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // SheetDB API URL
    const SHEETDB_API_URL = process.env.SHEETDB_API_URL || 'https://sheetdb.io/api/v1/YOUR_API_ID'

    console.log('Sending data to SheetDB:', data)

    const response = await fetch(SHEETDB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify([data]), // Mengirim sebagai array [ {...} ]
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('SheetDB Error:', errorText)
      return NextResponse.json({ 
        status: 'error', 
        message: 'Failed to save to SheetDB',
        details: errorText
      }, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json({ status: 'success', result })

  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      status: 'error', 
      message: error.message || 'Internal Server Error',
    }, { status: 500 })
  }
}

