# File Upload Setup for Oranu

This document explains how to set up file upload functionality with Supabase storage and database.

## Prerequisites

1. Supabase project with authentication enabled
2. Environment variables configured in your `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Database Setup

Run the SQL script `scripts/03-file-upload-setup.sql` in your Supabase SQL editor to:

1. **Create the `files` table** - Stores file metadata
2. **Set up Row Level Security (RLS)** - Ensures users can only access their own files
3. **Create the `uploads` storage bucket** - Stores actual files with 5MB limit
4. **Configure storage policies** - Controls who can upload, view, and delete files

## Features

### File Upload
- **Drag & Drop**: Users can drag files directly onto the upload area
- **Click to Browse**: Users can click to open the file browser
- **Multiple Files**: Supports uploading multiple files at once
- **File Size Limit**: 5MB maximum per file
- **Supported Types**: PDF, Word docs, text files, CSV, Excel, images (JPEG, PNG)

### Security
- **Authentication Required**: Only authenticated users can upload files
- **User Isolation**: Users can only see and manage their own files
- **File Validation**: Server-side file size and type validation

### User Experience
- **Upload Progress**: Shows loading spinner during upload
- **Error Handling**: Displays clear error messages for failed uploads
- **File List**: Shows recently uploaded files with file sizes
- **Responsive Design**: Works on both desktop and mobile

## File Structure

```
lib/
├── file-upload.ts          # File upload service functions
├── supabase.ts            # Supabase client configuration

scripts/
└── 03-file-upload-setup.sql  # Database and storage setup

app/
└── page.tsx               # Landing page with upload functionality
```

## Usage

### Uploading Files
1. Drag and drop files onto the upload area, or
2. Click "or click to browse files" to open file browser
3. Select one or more files (max 5MB each)
4. Files are automatically uploaded to Supabase storage
5. File metadata is stored in the database

### Managing Files
- Recently uploaded files are displayed below the upload area
- File sizes are shown in MB
- Files are automatically organized by user ID

## API Functions

### `uploadFile(file: File)`
Uploads a single file to Supabase storage and saves metadata to database.

### `getUserFiles()`
Retrieves all files uploaded by the current user.

### `deleteFile(fileId: string)`
Deletes a file from both storage and database.

## Error Handling

The system handles various error scenarios:
- **File too large**: Shows error if file exceeds 5MB limit
- **Upload failures**: Displays specific error messages
- **Authentication errors**: Handles unauthorized access
- **Network issues**: Graceful fallback for connection problems

## Storage Bucket Configuration

The `uploads` bucket is configured with:
- **Public access**: Files can be accessed via public URLs
- **5MB file limit**: Enforced at both client and server level
- **Allowed MIME types**: Restricted to common document and image formats
- **User isolation**: Files are stored in user-specific folders

## Security Considerations

1. **Row Level Security**: Database policies ensure data isolation
2. **File type validation**: Only allowed file types can be uploaded
3. **Size limits**: Prevents abuse and storage costs
4. **User authentication**: All operations require valid user session
5. **Path validation**: Files are stored in user-specific directories

## Troubleshooting

### Common Issues

1. **"User not authenticated" error**
   - Ensure user is signed in
   - Check authentication state in Supabase

2. **"Upload failed" error**
   - Verify file size is under 5MB
   - Check file type is supported
   - Ensure Supabase storage is properly configured

3. **Files not appearing**
   - Check database policies are correctly set
   - Verify storage bucket exists and is accessible
   - Check browser console for errors

### Debug Steps

1. Check browser console for error messages
2. Verify Supabase environment variables
3. Confirm database tables and policies exist
4. Test with smaller files first
5. Check Supabase dashboard for storage bucket status

## Future Enhancements

Potential improvements to consider:
- File preview functionality
- Progress bars for large uploads
- File organization and folders
- Search and filtering
- Bulk operations (delete, download)
- File sharing between users
- Integration with study materials
