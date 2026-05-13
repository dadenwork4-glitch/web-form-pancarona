'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Spinner } from '@/components/ui/spinner'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Upload, X, Check } from 'lucide-react'

type ContentType = 'skincare' | 'makeup' | 'review' | 'tutorial' | 'lifestyle' | 'other'

interface FormData {
  fullName: string
  nickname: string
  whatsapp: string
  city: string
  instagramUsername: string
  instagramLink: string
  tiktokUsername: string
  tiktokLink: string
  primaryPlatform: 'instagram' | 'tiktok' | 'both'
  instagramFollowers: string
  tiktokFollowers: string
  threadsUsername: string
  contentTypes: ContentType[]
  otherContentType: string
  file: File | null
  commercialFile: File | null
}

export function CreatorForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    nickname: '',
    whatsapp: '',
    city: '',
    instagramUsername: '',
    instagramLink: '',
    tiktokUsername: '',
    tiktokLink: '',
    threadsUsername: '',
    primaryPlatform: 'instagram',
    instagramFollowers: '',
    tiktokFollowers: '',
    contentTypes: [],
    otherContentType: '',
    file: null,
    commercialFile: null,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [dragActive, setDragActive] = useState(false)
  const [commercialDragActive, setCommercialDragActive] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.nickname.trim()) newErrors.nickname = 'Nickname is required'
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.instagramUsername.trim()) newErrors.instagramUsername = 'Instagram username is required'
    if (!formData.instagramLink.trim()) newErrors.instagramLink = 'Instagram link is required'
    if (!formData.tiktokUsername.trim()) newErrors.tiktokUsername = 'TikTok username is required'
    if (!formData.tiktokLink.trim()) newErrors.tiktokLink = 'TikTok link is required'
    if (!formData.threadsUsername.trim()) newErrors.threadsUsername = 'Threads username is required'
    if (!formData.instagramFollowers && formData.primaryPlatform !== 'tiktok') {
      newErrors.instagramFollowers = 'Instagram followers is required'
    }
    if (!formData.tiktokFollowers && formData.primaryPlatform !== 'instagram') {
      newErrors.tiktokFollowers = 'TikTok followers is required'
    }
    if (formData.contentTypes.length === 0) newErrors.contentTypes = 'Select at least one content type'
    if (formData.contentTypes.includes('other') && !formData.otherContentType.trim()) {
      newErrors.otherContentType = 'Please specify your other niche'
    }
    if (!formData.file) newErrors.file = 'Please upload your rate card'
    if (!formData.commercialFile) newErrors.commercialFile = 'Please upload your commercial photo'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleContentTypeChange = (type: ContentType, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: checked
        ? [...prev.contentTypes, type]
        : prev.contentTypes.filter(t => t !== type)
    }))
    if (errors.contentTypes) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.contentTypes
        return newErrors
      })
    }
  }

  const handleDrag = (e: React.DragEvent, type: 'file' | 'commercialFile') => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      if (type === 'file') setDragActive(true)
      else setCommercialDragActive(true)
    } else if (e.type === 'dragleave') {
      if (type === 'file') setDragActive(false)
      else setCommercialDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent, name: 'file' | 'commercialFile') => {
    e.preventDefault()
    e.stopPropagation()
    if (name === 'file') setDragActive(false)
    else setCommercialDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        setFormData(prev => ({ ...prev, [name]: file }))
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, name: 'file' | 'commercialFile') => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, [name]: e.target.files![0] }))
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]
        resolve(base64String)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // 1. Convert files to Base64
      const rateCardBase64 = formData.file ? await fileToBase64(formData.file) : ''
      const commercialBase64 = formData.commercialFile ? await fileToBase64(formData.commercialFile) : ''

      // 2. Prepare payload
      const payload = {
        fullName: formData.fullName,
        nickname: formData.nickname,
        whatsapp: formData.whatsapp,
        city: formData.city,
        instagramUsername: formData.instagramUsername,
        instagramLink: formData.instagramLink,
        tiktokUsername: formData.tiktokUsername,
        tiktokLink: formData.tiktokLink,
        threadsUsername: formData.threadsUsername,
        primaryPlatform: formData.primaryPlatform,
        instagramFollowers: formData.instagramFollowers,
        tiktokFollowers: formData.tiktokFollowers,
        contentTypes: formData.contentTypes.join(', '),
        otherContentType: formData.otherContentType,
        file: rateCardBase64,
        fileName: formData.file?.name || 'rate_card.pdf',
        commercialFile: commercialBase64,
        commercialFileName: formData.commercialFile?.name || 'commercial_photo.jpg'
      }

      // 3. Send to our internal API Proxy
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      const result = await response.json()
      
      if (result.status === 'success' || response.ok) {
        console.log('Form submitted successfully')
        setShowSuccess(true)
        setFormData({
          fullName: '',
          nickname: '',
          whatsapp: '',
          city: '',
          instagramUsername: '',
          instagramLink: '',
          tiktokUsername: '',
          tiktokLink: '',
          threadsUsername: '',
          primaryPlatform: 'instagram',
          instagramFollowers: '',
          tiktokFollowers: '',
          contentTypes: [],
          otherContentType: '',
          file: null,
          commercialFile: null,
        })
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Terjadi kesalahan saat mengirim data. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  const contentTypeOptions: { label: string; value: ContentType }[] = [
    { label: 'Skincare', value: 'skincare' },
    { label: 'Makeup', value: 'makeup' },
    { label: 'Review Produk', value: 'review' },
    { label: 'Tutorial', value: 'tutorial' },
    { label: 'Daily / Lifestyle Beauty', value: 'lifestyle' },
    { label: 'Other', value: 'other' },
  ]

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between gap-2 mb-12">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</div>
            <span className="text-sm font-medium text-foreground">Personal Info</span>
          </div>
          <div className="h-1 flex-1 bg-primary/20 rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-foreground/60 text-sm font-bold">2</div>
            <span className="text-sm font-medium text-foreground/60">Social Media</span>
          </div>
          <div className="h-1 flex-1 bg-primary/20 rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-foreground/60 text-sm font-bold">3</div>
            <span className="text-sm font-medium text-foreground/60">Portfolio</span>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-6 p-6 rounded-2xl bg-card border border-border/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">Nama Lengkap *</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.fullName ? 'border-destructive' : ''}`}
              />
              {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-sm font-medium">Nama Panggilan *</Label>
              <Input
                id="nickname"
                name="nickname"
                placeholder="Your nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.nickname ? 'border-destructive' : ''}`}
              />
              {errors.nickname && <p className="text-xs text-destructive">{errors.nickname}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-sm font-medium">Nomor WhatsApp (Aktif) *</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                placeholder="08xx xxxx xxxx"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.whatsapp ? 'border-destructive' : ''}`}
              />
              {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">Domisili (Kota) *</Label>
              <Input
                id="city"
                name="city"
                placeholder="Your city"
                value={formData.city}
                onChange={handleInputChange}
                className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.city ? 'border-destructive' : ''}`}
              />
              {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
            </div>
          </div>
        </div>

        {/* Social Media Information */}
        <div className="space-y-6 p-6 rounded-2xl bg-card border border-border/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-foreground">Social Media Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="instagramUsername" className="text-sm font-medium">Username Instagram *</Label>
              <Input
                id="instagramUsername"
                name="instagramUsername"
                placeholder="@username"
                value={formData.instagramUsername}
                onChange={handleInputChange}
                className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.instagramUsername ? 'border-destructive' : ''}`}
              />
              {errors.instagramUsername && <p className="text-xs text-destructive">{errors.instagramUsername}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagramLink" className="text-sm font-medium">Link Instagram *</Label>
              <Input
                id="instagramLink"
                name="instagramLink"
                placeholder="https://instagram.com/username"
                value={formData.instagramLink}
                onChange={handleInputChange}
                className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.instagramLink ? 'border-destructive' : ''}`}
              />
              {errors.instagramLink && <p className="text-xs text-destructive">{errors.instagramLink}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tiktokUsername" className="text-sm font-medium">Username TikTok *</Label>
              <Input
                id="tiktokUsername"
                name="tiktokUsername"
                placeholder="@username"
                value={formData.tiktokUsername}
                onChange={handleInputChange}
                className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.tiktokUsername ? 'border-destructive' : ''}`}
              />
              {errors.tiktokUsername && <p className="text-xs text-destructive">{errors.tiktokUsername}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tiktokLink" className="text-sm font-medium">Link TikTok *</Label>
              <Input
                id="tiktokLink"
                name="tiktokLink"
                placeholder="https://tiktok.com/@username"
                value={formData.tiktokLink}
                onChange={handleInputChange}
                className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.tiktokLink ? 'border-destructive' : ''}`}
              />
              {errors.tiktokLink && <p className="text-xs text-destructive">{errors.tiktokLink}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="threadsUsername" className="text-sm font-medium">Username Threads *</Label>
              <Input
                id="threadsUsername"
                name="threadsUsername"
                placeholder="@username"
                value={formData.threadsUsername}
                onChange={handleInputChange}
                className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.threadsUsername ? 'border-destructive' : ''}`}
              />
              {errors.threadsUsername && <p className="text-xs text-destructive">{errors.threadsUsername}</p>}
            </div>
          </div>

          {/* Platform Selection */}
          <div className="space-y-4 pt-4 border-t border-border/30">
            <Label className="text-sm font-medium">Platform Utama Kamu *</Label>
            <RadioGroup value={formData.primaryPlatform} onValueChange={(value: any) => setFormData(prev => ({ ...prev, primaryPlatform: value }))}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instagram" id="instagram" />
                <Label htmlFor="instagram" className="font-normal cursor-pointer">Instagram</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tiktok" id="tiktok" />
                <Label htmlFor="tiktok" className="font-normal cursor-pointer">TikTok</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="font-normal cursor-pointer">Keduanya Aktif</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Followers Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="instagramFollowers" className="text-sm font-medium">Jumlah Followers Instagram {formData.primaryPlatform !== 'tiktok' && '*'}</Label>
              <Input
                id="instagramFollowers"
                name="instagramFollowers"
                placeholder="e.g., 10,000"
                value={formData.instagramFollowers}
                onChange={handleInputChange}
                className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.instagramFollowers ? 'border-destructive' : ''}`}
              />
              {errors.instagramFollowers && <p className="text-xs text-destructive">{errors.instagramFollowers}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tiktokFollowers" className="text-sm font-medium">Jumlah Followers TikTok {formData.primaryPlatform !== 'instagram' && '*'}</Label>
              <Input
                id="tiktokFollowers"
                name="tiktokFollowers"
                placeholder="e.g., 10,000"
                value={formData.tiktokFollowers}
                onChange={handleInputChange}
                className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.tiktokFollowers ? 'border-destructive' : ''}`}
              />
              {errors.tiktokFollowers && <p className="text-xs text-destructive">{errors.tiktokFollowers}</p>}
            </div>
          </div>
        </div>

        {/* Content Types and Upload */}
        <div className="space-y-6 p-6 rounded-2xl bg-card border border-border/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-foreground">Niche Content</h3>
          
          {/* Content Types */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Jenis Konten yang Biasa Kamu Buat *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contentTypeOptions.map(({ label, value }) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={value}
                    checked={formData.contentTypes.includes(value)}
                    onCheckedChange={(checked) => handleContentTypeChange(value, checked as boolean)}
                    className="rounded-md border-primary"
                  />
                  <Label htmlFor={value} className="font-normal cursor-pointer">{label}</Label>
                </div>
              ))}
            </div>
            {errors.contentTypes && <p className="text-xs text-destructive">{errors.contentTypes}</p>}
            
            {formData.contentTypes.includes('other') && (
              <div className="space-y-2 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="otherContentType" className="text-sm font-medium">Sebutkan Niche Lainnya *</Label>
                <Input
                  id="otherContentType"
                  name="otherContentType"
                  placeholder="E.g., Tech, Food, Finance, etc."
                  value={formData.otherContentType}
                  onChange={handleInputChange}
                  className={`rounded-lg border-border/50 focus:ring-primary focus:border-primary transition-colors ${errors.otherContentType ? 'border-destructive' : ''}`}
                />
                {errors.otherContentType && <p className="text-xs text-destructive">{errors.otherContentType}</p>}
              </div>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-4 pt-4 border-t border-border/30">
            <Label className="text-sm font-medium">Upload Rate Card Terbaru *</Label>
            <Label htmlFor="file-upload" className={`block w-full p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${dragActive ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50 hover:bg-primary/2.5'}`} onDragEnter={(e) => handleDrag(e, 'file')} onDragLeave={(e) => handleDrag(e, 'file')} onDragOver={(e) => handleDrag(e, 'file')} onDrop={(e) => handleDrop(e, 'file')}>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileSelect(e, 'file')}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                {formData.file ? (
                  <>
                    <Check className="h-8 w-8 text-primary" />
                    <p className="text-sm font-medium text-foreground">{formData.file.name}</p>
                    <p className="text-xs text-muted-foreground">Click to change file</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-primary" />
                    <p className="text-sm font-medium text-foreground">Drag & drop your rate card here</p>
                    <p className="text-xs text-muted-foreground">or click to select (PDF, JPG, PNG)</p>
                  </>
                )}
              </div>
            </Label>
            {errors.file && <p className="text-xs text-destructive">{errors.file}</p>}
          </div>

          {/* Commercial File Upload */}
          <div className="space-y-4 pt-4 border-t border-border/30">
            <Label className="text-sm font-medium">Upload Foto Komersial *</Label>
            <Label htmlFor="commercial-file-upload" className={`block w-full p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${commercialDragActive ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50 hover:bg-primary/2.5'}`} onDragEnter={(e) => handleDrag(e, 'commercialFile')} onDragLeave={(e) => handleDrag(e, 'commercialFile')} onDragOver={(e) => handleDrag(e, 'commercialFile')} onDrop={(e) => handleDrop(e, 'commercialFile')}>
              <input
                id="commercial-file-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileSelect(e, 'commercialFile')}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                {formData.commercialFile ? (
                  <>
                    <Check className="h-8 w-8 text-primary" />
                    <p className="text-sm font-medium text-foreground">{formData.commercialFile.name}</p>
                    <p className="text-xs text-muted-foreground">Click to change file</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-primary" />
                    <p className="text-sm font-medium text-foreground">Drag & drop your commercial photo here</p>
                    <p className="text-xs text-muted-foreground">or click to select (JPG, PNG)</p>
                  </>
                )}
              </div>
            </Label>
            {errors.commercialFile && <p className="text-xs text-destructive">{errors.commercialFile}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner className="h-4 w-4" />
              <span>Submitting...</span>
            </div>
          ) : (
            'Submit Application'
          )}
        </Button>
      </form>

      {/* Success Modal */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <span>Application Submitted!</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Thank you for joining our beauty creator community! We&apos;ve received your application and will review it shortly. You&apos;ll be notified via WhatsApp with the next steps.
          </AlertDialogDescription>
          <AlertDialogAction className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold">Done</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
