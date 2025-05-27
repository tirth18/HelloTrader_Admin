'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Card,
  CardMedia,
  Alert
} from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface QRCodeUploadFormProps {
  onClose: () => void;
  onSave: (file: File, description?: string) => void;
  upiId: string;
}

export default function QRCodeUploadForm({ onClose, onSave, upiId }: QRCodeUploadFormProps) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = event.target.files?.[0];
    
    if (!selectedFile) {
      return;
    }
    
    // Validate file is an image
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File is too large. Maximum size is 5MB');
      return;
    }
    
    setFile(selectedFile);
    
    // Create preview URL
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    
    // Clean up preview URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a QR code image to upload');
      return;
    }
    
    setLoading(true);
    try {
      await onSave(file, description || undefined);
      onClose();
    } catch (error) {
      console.error('Error uploading QR code:', error);
      setError('Failed to upload QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <DialogTitle>Upload QR Code</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1" gutterBottom>
            Upload a QR code for UPI ID: <strong>{upiId}</strong>
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box 
            sx={{ 
              border: '2px dashed', 
              borderColor: 'divider', 
              borderRadius: 1, 
              p: 3, 
              textAlign: 'center',
              mb: 3,
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.hover'
              }
            }}
            onClick={handleBrowseClick}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
            
            {previewUrl ? (
              <Box sx={{ maxWidth: 200, mx: 'auto' }}>
                <Card elevation={0}>
                  <CardMedia
                    component="img"
                    image={previewUrl}
                    alt="QR Code Preview"
                    sx={{ 
                      height: 200, 
                      width: 200, 
                      objectFit: 'contain' 
                    }}
                  />
                </Card>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {file?.name} ({file ? Math.round(file.size / 1024) : 0} KB)
                </Typography>
                <Button 
                  size="small" 
                  onClick={handleBrowseClick}
                  sx={{ mt: 1 }}
                >
                  Change Image
                </Button>
              </Box>
            ) : (
              <>
                <QrCode2Icon sx={{ fontSize: 60, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body1" gutterBottom>
                  Drag & drop your QR code here
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  - or -
                </Typography>
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mt: 1 }}
                >
                  Browse Files
                </Button>
                <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                  Supported formats: JPG, PNG, GIF (Max: 5MB)
                </Typography>
              </>
            )}
          </Box>
          
          <TextField
            fullWidth
            label="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g., Payment QR for my shop"
            multiline
            rows={2}
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleUpload}
          disabled={loading || !file}
          startIcon={<CloudUploadIcon />}
        >
          {loading ? 'Uploading...' : 'Upload QR Code'}
        </Button>
      </DialogActions>
    </>
  );
} 