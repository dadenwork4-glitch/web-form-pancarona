import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // URL Google Apps Script Anda
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxS8TvKK92W2uzOj2dggzR6jawnmLPIm4p6_PP1FHR7lNxD81w1oyhRoQouU08h4XmKYg/exec'

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    console.log('Google Script Status:', response.status)
    const responseText = await response.text()
    
    try {
      const result = JSON.parse(responseText)
      return NextResponse.json(result)
    } catch (e) {
      console.error('Google Response is not JSON. Received:', responseText.substring(0, 500))
      // If it's HTML, it's likely a login page or error page
      if (responseText.includes('goog-logo')) {
        return NextResponse.json({ status: 'error', message: 'Google Script needs "Anyone" access permission.' }, { status: 401 })
      }
      return NextResponse.json({ status: 'error', message: 'Invalid response from Google', details: responseText.substring(0, 100) }, { status: 500 })
    }
  } catch (error: any) {
    console.error('API Proxy Error:', error)
    return NextResponse.json({ 
      status: 'error', 
      message: error.message || 'Internal Server Error',
      details: error.toString()
    }, { status: 500 })
  }
}
